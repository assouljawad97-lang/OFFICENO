const fs = require('fs');
const path = require('path');

const CATEGORY_FOLDER = {
  MOROCCAN_CONSULATE: 'Moroccan_Consulate',
  OTHER_SERVICES: 'Other_Services'
};

function sanitizeName(value) {
  return (value || '')
    .trim()
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_');
}

function ensureFolder(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
}

function getClientFolderPath(baseClientsDir, category, fullName, nationalId) {
  const categoryFolder = CATEGORY_FOLDER[category] || CATEGORY_FOLDER.OTHER_SERVICES;
  const clientFolderName = `${sanitizeName(fullName)}_${sanitizeName(nationalId)}`;
  return path.join(baseClientsDir, categoryFolder, clientFolderName);
}

function createClientFolder(baseClientsDir, category, fullName, nationalId) {
  const folderPath = getClientFolderPath(baseClientsDir, category, fullName, nationalId);
  ensureFolder(folderPath);
  return folderPath;
}

function listDocuments(folderPath) {
  ensureFolder(folderPath);
  return fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => {
      const fullPath = path.join(folderPath, entry.name);
      const stat = fs.statSync(fullPath);
      return {
        name: entry.name,
        path: fullPath,
        size: stat.size,
        modifiedAt: stat.mtime.toISOString()
      };
    })
    .sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
}

function copyFilesToClientFolder(clientFolder, sourcePaths) {
  ensureFolder(clientFolder);
  const copied = [];

  sourcePaths.forEach(src => {
    if (!fs.existsSync(src)) return;
    const fileName = path.basename(src);
    const dest = path.join(clientFolder, fileName);
    fs.copyFileSync(src, dest);
    copied.push(dest);
  });

  return copied;
}

function deleteDocument(documentPath) {
  if (fs.existsSync(documentPath)) {
    fs.unlinkSync(documentPath);
    return true;
  }
  return false;
}

function listScannedFiles(scanFolder) {
  ensureFolder(scanFolder);
  return fs.readdirSync(scanFolder, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => {
      const fullPath = path.join(scanFolder, entry.name);
      const stat = fs.statSync(fullPath);
      return {
        name: entry.name,
        path: fullPath,
        size: stat.size,
        modifiedAt: stat.mtime.toISOString()
      };
    })
    .sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
}

function importScannedFile({ sourcePath, clientFolder, documentType }) {
  ensureFolder(clientFolder);
  if (!fs.existsSync(sourcePath)) {
    throw new Error('Scanned file does not exist');
  }

  const ext = path.extname(sourcePath);
  const baseName = path.basename(sourcePath, ext);
  const typePrefix = documentType ? `${sanitizeName(documentType)}_` : '';
  const targetName = `${typePrefix}${baseName}${ext}`;
  const targetPath = path.join(clientFolder, targetName);

  fs.renameSync(sourcePath, targetPath);
  return targetPath;
}

module.exports = {
  createClientFolder,
  getClientFolderPath,
  listDocuments,
  copyFilesToClientFolder,
  deleteDocument,
  listScannedFiles,
  importScannedFile,
  ensureFolder
};
