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
let scanWatcher = null;
let lastSeenFiles = new Set();
const scanLogs = [];

const STATUS = ['WAITING_DOCUMENTS', 'WORKING_ON_APPLICATION', 'APPOINTMENT_BOOKED', 'COMPLETED', 'PROBLEM_OR_MISSING_DOCUMENT'];

const defaultSettings = {
  language: 'en',
  scanFolderPath: '',
  autoImportEnabled: false,
  activeClientId: null,
  defaultDocumentType: 'Scan'
};

let settings = { ...defaultSettings };

function getAppPaths() {
  const userData = app.getPath('userData');
  const documents = app.getPath('documents');
  const storageRoot = path.join(documents, 'OfficenoData');
  const clientsRoot = path.join(storageRoot, 'Clients');
  const defaultScanFolder = process.platform === 'win32' ? 'C:/Scans' : path.join(storageRoot, 'Scans');
  return {
    userData,
    dbPath: path.join(userData, 'officeno.sqlite3'),
    settingsPath: path.join(userData, 'settings.json'),
    storageRoot,
    clientsRoot,
    defaultScanFolder
  };
}

function addScanLog(message) {
  scanLogs.unshift({ message, at: new Date().toISOString() });
  if (scanLogs.length > 100) scanLogs.length = 100;
}

function loadSettings() {
  const { settingsPath, defaultScanFolder } = getAppPaths();
  if (fs.existsSync(settingsPath)) {
    settings = { ...defaultSettings, ...JSON.parse(fs.readFileSync(settingsPath, 'utf8')) };
  }
  if (!settings.scanFolderPath) settings.scanFolderPath = defaultScanFolder;
}

function saveSettings() {
  fs.writeFileSync(getAppPaths().settingsPath, JSON.stringify(settings, null, 2), 'utf8');
}

function getClientById(clientId) {
  return getDb().prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
}

function autoImportNewScans() {
  if (!settings.autoImportEnabled || !settings.activeClientId) return;

  const client = getClientById(settings.activeClientId);
  if (!client) {
    addScanLog('Active client not found.');
    return;
  }

  const files = listScannedFiles(settings.scanFolderPath);
  files.forEach(file => {
    if (lastSeenFiles.has(file.path)) return;
    try {
      importScannedFile({
        sourcePath: file.path,
        clientFolder: client.folderPath,
        documentType: settings.defaultDocumentType || 'Scan'
      });
      addScanLog(`Imported ${file.name} to ${client.fullName}`);
    } catch (error) {
      addScanLog(`Import failed for ${file.name}: ${error.message}`);
    }
  });

  lastSeenFiles = new Set(listScannedFiles(settings.scanFolderPath).map(f => f.path));
}

function restartScanWatcher() {
  if (scanWatcher) {
    scanWatcher.close();
    scanWatcher = null;
  }

  ensureFolder(settings.scanFolderPath);
  lastSeenFiles = new Set(listScannedFiles(settings.scanFolderPath).map(f => f.path));

  scanWatcher = fs.watch(settings.scanFolderPath, { persistent: false }, () => {
    setTimeout(autoImportNewScans, 500);
  });
  addScanLog(`Watching ${settings.scanFolderPath}`);
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
  if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function registerIpcHandlers() {
  ipcMain.handle('app:get-config', async () => {
    const paths = getAppPaths();
    ensureFolder(paths.storageRoot);
    ensureFolder(paths.clientsRoot);
    ensureFolder(path.join(paths.clientsRoot, 'Moroccan_Consulate'));
    ensureFolder(path.join(paths.clientsRoot, 'Other_Services'));
    ensureFolder(settings.scanFolderPath || paths.defaultScanFolder);
    return { ...paths, settings };
  });

  ipcMain.handle('settings:get', async () => ({ ...settings, scanLogs, watching: Boolean(scanWatcher) }));
  ipcMain.handle('settings:update', async (_event, payload) => {
    settings = { ...settings, ...payload };
    saveSettings();
    restartScanWatcher();
    return { ...settings, scanLogs, watching: Boolean(scanWatcher) };
  });

  ipcMain.handle('scanner:set-active-client', async (_event, clientId) => {
    settings.activeClientId = clientId;
    saveSettings();
    return settings;
  });

  ipcMain.handle('scanner:clear-active-client', async () => {
    settings.activeClientId = null;
    saveSettings();
    return settings;
  });

  ipcMain.handle('scanner:scan-now', async () => {
    autoImportNewScans();
    return { ok: true, scanLogs };
  });

  ipcMain.handle('clients:create', async (_event, payload) => {
    const db = getDb();
    const paths = getAppPaths();
    const folderPath = createClientFolder(paths.clientsRoot, payload.category, payload.fullName, payload.nationalId);

    const insert = db.prepare(`
      INSERT INTO clients (fullName, nationalId, phone, category, serviceDescription, notes, applicationId, status, folderPath)
      VALUES (@fullName, @nationalId, @phone, @category, @serviceDescription, @notes, @applicationId, @status, @folderPath)
    `);

    const info = insert.run({ ...payload, status: payload.status || 'WAITING_DOCUMENTS', folderPath });
    const clientId = info.lastInsertRowid;

    db.prepare(`
      INSERT INTO applications (clientId, applicationId, serviceDescription, notes, status, callStatus)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(clientId, payload.applicationId || '', payload.serviceDescription || '', payload.notes || '', payload.status || 'WAITING_DOCUMENTS', 'NOT_CALLED');

    return db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId);
  });

  ipcMain.handle('clients:list', async (_event, filters = {}) => {
    const db = getDb();
    let query = 'SELECT * FROM clients WHERE 1=1';
    const params = [];

    if (filters.search) {
      query += ' AND (fullName LIKE ? OR nationalId LIKE ? OR phone LIKE ? OR serviceDescription LIKE ? OR applicationId LIKE ?)';
      const q = `%${filters.search}%`;
      params.push(q, q, q, q, q);
    }
    if (filters.category) { query += ' AND category = ?'; params.push(filters.category); }
    if (filters.status) { query += ' AND status = ?'; params.push(filters.status); }

    query += ' ORDER BY datetime(createdAt) DESC';
    return db.prepare(query).all(...params);
  });

  ipcMain.handle('clients:get', async (_event, id) => getDb().prepare('SELECT * FROM clients WHERE id = ?').get(id));

  ipcMain.handle('clients:delete', async (_event, { id, removeFolder = false }) => {
    const db = getDb();
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
    if (!client) throw new Error('Client not found');

    db.prepare('DELETE FROM applications WHERE clientId = ?').run(id);
    db.prepare('DELETE FROM clients WHERE id = ?').run(id);

    if (removeFolder && client.folderPath && fs.existsSync(client.folderPath)) {
      fs.rmSync(client.folderPath, { recursive: true, force: true });
    }

    if (Number(settings.activeClientId) === Number(id)) {
      settings.activeClientId = null;
      saveSettings();
    }

    return { success: true };
  });

  ipcMain.handle('clients:update', async (_event, payload) => {
    const db = getDb();
    db.prepare(`
      UPDATE clients
      SET phone=@phone, serviceDescription=@serviceDescription, notes=@notes, applicationId=@applicationId, status=@status
      WHERE id=@id
    `).run(payload);

    return db.prepare('SELECT * FROM clients WHERE id = ?').get(payload.id);
  });

  ipcMain.handle('dashboard:stats', async () => {
    const db = getDb();
    const totalClients = db.prepare('SELECT COUNT(*) count FROM clients').get().count;
    const totalApplications = db.prepare('SELECT COUNT(*) count FROM applications').get().count;
    const moroccan = db.prepare("SELECT COUNT(*) count FROM clients WHERE category='MOROCCAN_CONSULATE'").get().count;
    const other = db.prepare("SELECT COUNT(*) count FROM clients WHERE category='OTHER_SERVICES'").get().count;
    const statusCounters = Object.fromEntries(STATUS.map(status => [status, db.prepare('SELECT COUNT(*) count FROM clients WHERE status = ?').get(status).count]));
    return { totalClients, totalApplications, moroccan, other, statusCounters };
  });

  ipcMain.handle('applications:list', async (_event, clientId) => {
    return getDb().prepare('SELECT * FROM applications WHERE clientId = ? ORDER BY datetime(createdAt) DESC').all(clientId);
  });

  ipcMain.handle('applications:add', async (_event, payload) => {
    const db = getDb();
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(payload.clientId);
    if (!client) throw new Error('Client not found');

    db.prepare(`
      INSERT INTO applications (clientId, applicationId, serviceDescription, notes, status, callStatus)
      VALUES (@clientId, @applicationId, @serviceDescription, @notes, @status, @callStatus)
    `).run({
      clientId: payload.clientId,
      applicationId: payload.applicationId || '',
      serviceDescription: payload.serviceDescription || '',
      notes: payload.notes || '',
      status: payload.status || 'WAITING_DOCUMENTS',
      callStatus: payload.callStatus || 'NOT_CALLED'
    });

    db.prepare(`
      UPDATE clients
      SET applicationId = @applicationId,
          serviceDescription = @serviceDescription,
          notes = @notes,
          status = @status
      WHERE id = @clientId
    `).run({
      clientId: payload.clientId,
      applicationId: payload.applicationId || '',
      serviceDescription: payload.serviceDescription || '',
      notes: payload.notes || '',
      status: payload.status || 'WAITING_DOCUMENTS',
      callStatus: payload.callStatus || 'NOT_CALLED'
    });

    return { success: true };
  });


  ipcMain.handle('applications:update-call-status', async (_event, { id, callStatus }) => {
    const allowed = ['NOT_CALLED', 'ANSWERED', 'NO_ANSWER'];
    if (!allowed.includes(callStatus)) throw new Error('Invalid call status');
    getDb().prepare('UPDATE applications SET callStatus = ? WHERE id = ?').run(callStatus, id);
    return { success: true };
  });

  ipcMain.handle('documents:upload', async (_event, { clientId }) => {
    const client = getClientById(clientId);
    if (!client) throw new Error('Client not found');
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
    if (canceled || !filePaths.length) return [];
    return copyFilesToClientFolder(client.folderPath, filePaths);
  });

  ipcMain.handle('documents:list', async (_event, { clientId }) => {
    const client = getClientById(clientId);
    if (!client) throw new Error('Client not found');
    return listDocuments(client.folderPath);
  });

  ipcMain.handle('documents:open', async (_event, filePath) => shell.openPath(filePath));
  ipcMain.handle('documents:delete', async (_event, filePath) => deleteDocument(filePath));

  ipcMain.handle('clients:open-folder', async (_event, folderPath) => {
    ensureFolder(folderPath);
    return shell.openPath(folderPath);
  });

  ipcMain.handle('scans:list', async () => listScannedFiles(settings.scanFolderPath));
  ipcMain.handle('scans:import', async (_event, { clientId, sourcePath, documentType }) => {
    const client = getClientById(clientId);
    if (!client) throw new Error('Client not found');
    return importScannedFile({ sourcePath, clientFolder: client.folderPath, documentType });
  });

  ipcMain.handle('clients:export-csv', async () => {
    const rows = getDb().prepare('SELECT * FROM clients ORDER BY datetime(createdAt) DESC').all();
    const headers = ['id', 'fullName', 'nationalId', 'phone', 'category', 'applicationId', 'serviceDescription', 'notes', 'status', 'folderPath', 'createdAt'];
    const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => csvEscape(r[h])).join(','))).join('\n');

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
  loadSettings();
  restartScanWatcher();
  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
