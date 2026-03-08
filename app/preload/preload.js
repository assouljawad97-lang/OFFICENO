const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getConfig: () => ipcRenderer.invoke('app:get-config'),
  getSettings: () => ipcRenderer.invoke('settings:get'),
  updateSettings: payload => ipcRenderer.invoke('settings:update', payload),
  setActiveScannerClient: clientId => ipcRenderer.invoke('scanner:set-active-client', clientId),
  runScannerNow: () => ipcRenderer.invoke('scanner:scan-now'),
  createClient: payload => ipcRenderer.invoke('clients:create', payload),
  listClients: filters => ipcRenderer.invoke('clients:list', filters),
  getClient: id => ipcRenderer.invoke('clients:get', id),
  updateClientStatus: payload => ipcRenderer.invoke('clients:update-status', payload),
  updateClient: payload => ipcRenderer.invoke('clients:update', payload),
  getDashboardStats: () => ipcRenderer.invoke('dashboard:stats'),
  listAppointments: () => ipcRenderer.invoke('appointments:list'),
  uploadDocuments: payload => ipcRenderer.invoke('documents:upload', payload),
  listDocuments: payload => ipcRenderer.invoke('documents:list', payload),
  openDocument: filePath => ipcRenderer.invoke('documents:open', filePath),
  deleteDocument: filePath => ipcRenderer.invoke('documents:delete', filePath),
  openClientFolder: folderPath => ipcRenderer.invoke('clients:open-folder', folderPath),
  listScans: () => ipcRenderer.invoke('scans:list'),
  importScan: payload => ipcRenderer.invoke('scans:import', payload),
  exportClientsCsv: () => ipcRenderer.invoke('clients:export-csv')
});
