const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { initDatabase, getDb } = require('../database/db');
const {
  createClientFolder,
  listDocuments,
  copyFilesToClientFolder,
  deleteDocument,
  listScannedFiles,
  importScannedFile,
  ensureFolder
} = require('../storage/fileManager');

let mainWindow;

const STATUS = [
  'WAITING_DOCUMENTS',
  'APPOINTMENT_BOOKED',
  'COMPLETED',
  'PROBLEM_OR_MISSING_DOCUMENT'
];

function getAppPaths() {
  const userData = app.getPath('userData');
  const documents = app.getPath('documents');
  const storageRoot = path.join(documents, 'OfficenoData');
  const clientsRoot = path.join(storageRoot, 'Clients');
  const defaultScanFolder = process.platform === 'win32' ? 'C:/Scans' : path.join(storageRoot, 'Scans');
  return {
    userData,
    dbPath: path.join(userData, 'officeno.sqlite3'),
    storageRoot,
    clientsRoot,
    defaultScanFolder
  };
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

function csvEscape(value) {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function registerIpcHandlers() {
  ipcMain.handle('app:get-config', async () => {
    const paths = getAppPaths();
    ensureFolder(paths.storageRoot);
    ensureFolder(paths.clientsRoot);
    ensureFolder(path.join(paths.clientsRoot, 'Moroccan_Consulate'));
    ensureFolder(path.join(paths.clientsRoot, 'Other_Services'));
    ensureFolder(paths.defaultScanFolder);
    return paths;
  });

  ipcMain.handle('clients:create', async (_event, payload) => {
    const db = getDb();
    const paths = getAppPaths();

    const folderPath = createClientFolder(paths.clientsRoot, payload.category, payload.fullName, payload.nationalId);

    const stmt = db.prepare(`
      INSERT INTO clients (fullName, nationalId, phone, category, serviceDescription, appointmentDate, notes, status, folderPath)
      VALUES (@fullName, @nationalId, @phone, @category, @serviceDescription, @appointmentDate, @notes, @status, @folderPath)
    `);

    const info = stmt.run({
      ...payload,
      status: payload.status || 'WAITING_DOCUMENTS',
      folderPath
    });

    return db.prepare('SELECT * FROM clients WHERE id = ?').get(info.lastInsertRowid);
  });

  ipcMain.handle('clients:list', async (_event, filters = {}) => {
    const db = getDb();
    let query = 'SELECT * FROM clients WHERE 1=1';
    const params = [];

    if (filters.search) {
      query += ' AND (fullName LIKE ? OR nationalId LIKE ? OR phone LIKE ? OR serviceDescription LIKE ?)';
      const searchParam = `%${filters.search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }
    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY datetime(createdAt) DESC';

    return db.prepare(query).all(...params);
  });

  ipcMain.handle('clients:get', async (_event, id) => {
    const db = getDb();
    return db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
  });

  ipcMain.handle('clients:update-status', async (_event, { id, status }) => {
    if (!STATUS.includes(status)) throw new Error('Invalid status');
    const db = getDb();
    db.prepare('UPDATE clients SET status = ? WHERE id = ?').run(status, id);
    return db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
  });

  ipcMain.handle('clients:update', async (_event, payload) => {
    const db = getDb();
    db.prepare(`
      UPDATE clients
      SET appointmentDate = @appointmentDate,
          serviceDescription = @serviceDescription,
          notes = @notes,
          phone = @phone
      WHERE id = @id
    `).run(payload);
    return db.prepare('SELECT * FROM clients WHERE id = ?').get(payload.id);
  });

  ipcMain.handle('dashboard:stats', async () => {
    const db = getDb();
    const totalClients = db.prepare('SELECT COUNT(*) count FROM clients').get().count;
    const moroccan = db.prepare("SELECT COUNT(*) count FROM clients WHERE category='MOROCCAN_CONSULATE'").get().count;
    const other = db.prepare("SELECT COUNT(*) count FROM clients WHERE category='OTHER_SERVICES'").get().count;
    const upcomingAppointments = db.prepare("SELECT COUNT(*) count FROM clients WHERE appointmentDate IS NOT NULL AND appointmentDate != '' AND date(appointmentDate) >= date('now')").get().count;
    const statusCounters = Object.fromEntries(
      STATUS.map(status => [status, db.prepare('SELECT COUNT(*) count FROM clients WHERE status = ?').get(status).count])
    );
    return { totalClients, moroccan, other, upcomingAppointments, statusCounters };
  });

  ipcMain.handle('appointments:list', async () => {
    const db = getDb();
    return db.prepare(`
      SELECT id, fullName, nationalId, appointmentDate, category, status
      FROM clients
      WHERE appointmentDate IS NOT NULL AND appointmentDate != ''
      ORDER BY date(appointmentDate) ASC
    `).all();
  });

  ipcMain.handle('documents:upload', async (_event, { clientId }) => {
    const db = getDb();
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
    if (!client) throw new Error('Client not found');

    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    });

    if (canceled || !filePaths.length) return [];
    return copyFilesToClientFolder(client.folderPath, filePaths);
  });

  ipcMain.handle('documents:list', async (_event, { clientId }) => {
    const db = getDb();
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
    if (!client) throw new Error('Client not found');
    return listDocuments(client.folderPath);
  });

  ipcMain.handle('documents:open', async (_event, filePath) => shell.openPath(filePath));

  ipcMain.handle('documents:delete', async (_event, filePath) => deleteDocument(filePath));

  ipcMain.handle('clients:open-folder', async (_event, folderPath) => {
    ensureFolder(folderPath);
    return shell.openPath(folderPath);
  });

  ipcMain.handle('scans:list', async () => {
    const { defaultScanFolder } = getAppPaths();
    return listScannedFiles(defaultScanFolder);
  });

  ipcMain.handle('scans:import', async (_event, { clientId, sourcePath, documentType }) => {
    const db = getDb();
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
    if (!client) throw new Error('Client not found');

    return importScannedFile({ sourcePath, clientFolder: client.folderPath, documentType });
  });

  ipcMain.handle('clients:export-csv', async () => {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM clients ORDER BY datetime(createdAt) DESC').all();
    const headers = ['id','fullName','nationalId','phone','category','serviceDescription','appointmentDate','notes','status','folderPath','createdAt'];
    const csv = [headers.join(',')]
      .concat(rows.map(r => headers.map(h => csvEscape(r[h])).join(',')))
      .join('\n');

    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: `clients-export-${Date.now()}.csv`,
      filters: [{ name: 'CSV Files', extensions: ['csv'] }]
    });
    if (canceled || !filePath) return null;

    fs.writeFileSync(filePath, csv, 'utf8');
    return filePath;
  });
}

app.whenReady().then(() => {
  const paths = getAppPaths();
  initDatabase(paths.dbPath);
  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
