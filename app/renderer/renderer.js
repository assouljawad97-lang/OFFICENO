const translations = {
  en: {
    appTitle: 'Officeno Admin Manager', language: 'Language', dashboard: 'Dashboard', addClient: 'Add Client', clientList: 'Client List', documentManager: 'Document Manager', scannerSetup: 'Scanner Setup',
    fullName: 'Full Name', idPassport: 'National ID or Passport Number', phone: 'Phone Number', category: 'Service Category', moroccanConsulate: 'Moroccan Consulate', otherServices: 'Other Administrative Services',
    applicationId: 'Application ID', status: 'Status', serviceDescription: 'Service Description', notes: 'Notes', createClient: 'Save Client', exportCsv: 'Export CSV', actions: 'Actions', clientDetails: 'Client Details',
    importScans: 'Import Scanned Documents', refreshScanFolder: 'Refresh Scan Folder', scanFolder: 'Scan Folder Path', defaultDocType: 'Default Document Type', activeClient: 'Active Client for Auto-Scan', autoImport: 'Auto import scans',
    saveSettings: 'Save Scanner Settings', scanNow: 'Scan Now', scanLogs: 'Scan Logs', waiting: 'Waiting Documents', booked: 'Application Booked', completed: 'Completed', problem: 'Problem / Missing Document',
    openFolder: 'Open Folder', details: 'Details', deleteClient: 'Delete Client', createdAt: 'Created', bigSave: 'Save All Changes', scan: 'Scan',
    addSuccess: 'Client added successfully.', saveSuccess: 'All client changes saved.', deleteSuccess: 'Client deleted successfully.',
    deleteDocConfirm: 'Delete this document?', deleteClientConfirm: 'Are you sure you want to delete this client?', deleteFolderConfirm: 'Also delete client folder and files?',
    scanStarted: 'Scan session started for this client.', scanFinished: 'Scan session finished. Client is no longer active for scanning.', scannerSaved: 'Scanner settings saved.'
  },
  es: {
    appTitle: 'Gestor Administrativo Officeno', language: 'Idioma', dashboard: 'Panel', addClient: 'Añadir Cliente', clientList: 'Lista de Clientes', documentManager: 'Gestor de Documentos', scannerSetup: 'Configurar Escáner',
    fullName: 'Nombre Completo', idPassport: 'DNI o Pasaporte', phone: 'Teléfono', category: 'Categoría', moroccanConsulate: 'Consulado Marroquí', otherServices: 'Otros Servicios',
    applicationId: 'ID de Solicitud', status: 'Estado', serviceDescription: 'Descripción', notes: 'Notas', createClient: 'Guardar Cliente', exportCsv: 'Exportar CSV', actions: 'Acciones', clientDetails: 'Detalles del Cliente',
    importScans: 'Importar escaneados', refreshScanFolder: 'Actualizar carpeta', scanFolder: 'Ruta carpeta escáner', defaultDocType: 'Tipo por defecto', activeClient: 'Cliente activo para auto-escaneo', autoImport: 'Importación automática',
    saveSettings: 'Guardar configuración', scanNow: 'Escanear ahora', scanLogs: 'Logs de escaneo', waiting: 'Esperando documentos', booked: 'Solicitud registrada', completed: 'Completado', problem: 'Problema / documento faltante',
    openFolder: 'Abrir carpeta', details: 'Detalles', deleteClient: 'Eliminar cliente', createdAt: 'Creado', bigSave: 'Guardar todo', scan: 'Escanear',
    addSuccess: 'Cliente añadido correctamente.', saveSuccess: 'Cambios guardados correctamente.', deleteSuccess: 'Cliente eliminado correctamente.',
    deleteDocConfirm: '¿Eliminar este documento?', deleteClientConfirm: '¿Seguro que deseas eliminar este cliente?', deleteFolderConfirm: '¿También eliminar carpeta y archivos?',
    scanStarted: 'Sesión de escaneo iniciada para este cliente.', scanFinished: 'Sesión finalizada. El cliente ya no está activo para escaneo.', scannerSaved: 'Configuración guardada.'
  },
  ar: {
    appTitle: 'مدير أوفيسينو', language: 'اللغة', dashboard: 'لوحة التحكم', addClient: 'إضافة عميل', clientList: 'قائمة العملاء', documentManager: 'إدارة المستندات', scannerSetup: 'إعداد الماسح',
    fullName: 'الاسم الكامل', idPassport: 'رقم الهوية/الجواز', phone: 'الهاتف', category: 'الفئة', moroccanConsulate: 'القنصلية المغربية', otherServices: 'خدمات أخرى',
    applicationId: 'رقم الطلب', status: 'الحالة', serviceDescription: 'وصف الخدمة', notes: 'ملاحظات', createClient: 'حفظ العميل', exportCsv: 'تصدير CSV', actions: 'إجراءات', clientDetails: 'تفاصيل العميل',
    importScans: 'استيراد ملفات المسح', refreshScanFolder: 'تحديث مجلد المسح', scanFolder: 'مسار مجلد المسح', defaultDocType: 'نوع المستند الافتراضي', activeClient: 'العميل النشط للمسح', autoImport: 'استيراد تلقائي',
    saveSettings: 'حفظ الإعدادات', scanNow: 'نفّذ المسح', scanLogs: 'سجل المسح', waiting: 'بانتظار المستندات', booked: 'تم تسجيل الطلب', completed: 'مكتمل', problem: 'مشكلة / نقص مستند',
    openFolder: 'فتح المجلد', details: 'تفاصيل', deleteClient: 'حذف العميل', createdAt: 'تاريخ الإنشاء', bigSave: 'حفظ كل التغييرات', scan: 'مسح',
    addSuccess: 'تمت إضافة العميل بنجاح.', saveSuccess: 'تم حفظ التغييرات بنجاح.', deleteSuccess: 'تم حذف العميل بنجاح.',
    deleteDocConfirm: 'هل تريد حذف هذا المستند؟', deleteClientConfirm: 'هل أنت متأكد من حذف هذا العميل؟', deleteFolderConfirm: 'هل تريد حذف المجلد والملفات أيضًا؟',
    scanStarted: 'بدأت جلسة المسح لهذا العميل.', scanFinished: 'انتهت جلسة المسح ولم يعد العميل نشطًا.', scannerSaved: 'تم حفظ إعدادات الماسح.'
  }
};

let currentLang = 'en';
let selectedClientId = null;

function t(key) { return translations[currentLang]?.[key] || translations.en[key] || key; }
const statusMap = () => ({
  WAITING_DOCUMENTS: t('waiting'),
  APPOINTMENT_BOOKED: t('booked'),
  COMPLETED: t('completed'),
  PROBLEM_OR_MISSING_DOCUMENT: t('problem')
});

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.classList.add('visible'), 20);
  setTimeout(() => {
    el.classList.remove('visible');
    setTimeout(() => el.remove(), 200);
  }, 2500);
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString();
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(viewId).classList.remove('hidden');
  if (viewId === 'dashboard') loadDashboard();
  if (viewId === 'client-list') loadClients();
  if (viewId === 'document-manager') loadScans();
  if (viewId === 'scanner-setup') loadScannerSettings();
}

function refreshFilterLabels() {
  document.getElementById('filter-category').innerHTML = `
    <option value="">All</option>
    <option value="MOROCCAN_CONSULATE">${t('moroccanConsulate')}</option>
    <option value="OTHER_SERVICES">${t('otherServices')}</option>`;

  document.getElementById('filter-status').innerHTML = `<option value="">All</option>${Object.entries(statusMap()).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}`;
  document.getElementById('status-select-add').innerHTML = Object.entries(statusMap()).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
}

function badge(status) {
  return `<span class="badge status-${status}">${statusMap()[status] || status}</span>`;
}

async function loadDashboard() {
  const stats = await window.api.getDashboardStats();
  document.getElementById('dashboard').innerHTML = `
    <h2>${t('dashboard')}</h2>
    <div class="card-grid">
      <div class="card"><strong>Total Clients</strong><div>${stats.totalClients}</div></div>
      <div class="card"><strong>Total Applications</strong><div>${stats.totalApplications}</div></div>
      <div class="card"><strong>${t('moroccanConsulate')}</strong><div>${stats.moroccan}</div></div>
      <div class="card"><strong>${t('otherServices')}</strong><div>${stats.other}</div></div>
    </div>
  `;
}

async function loadClients() {
  const filters = {
    search: document.getElementById('search-input').value.trim(),
    category: document.getElementById('filter-category').value,
    status: document.getElementById('filter-status').value
  };
  const clients = await window.api.listClients(filters);

  document.getElementById('clients-table-body').innerHTML = clients.map(client => `
    <tr>
      <td>${client.fullName}</td>
      <td>${client.nationalId}</td>
      <td>${client.phone || ''}</td>
      <td>${client.applicationId || '-'}</td>
      <td>${client.category === 'MOROCCAN_CONSULATE' ? t('moroccanConsulate') : t('otherServices')}</td>
      <td>${badge(client.status)}</td>
      <td>${formatDate(client.createdAt)}</td>
      <td>
        <button onclick="openDetails(${client.id})">${t('details')}</button>
        <button onclick="openFolder('${client.folderPath.replace(/\\/g, '\\\\')}')">📁</button>
        <button class="danger-btn" onclick="deleteClient(${client.id})">🗑️</button>
      </td>
    </tr>
  `).join('');
}

async function deleteClient(id = selectedClientId) {
  if (!confirm(t('deleteClientConfirm'))) return;
  const removeFolder = confirm(t('deleteFolderConfirm'));
  await window.api.deleteClient({ id, removeFolder });
  showToast(t('deleteSuccess'), 'warn');
  selectedClientId = null;
  showView('client-list');
  await loadDashboard();
}
window.deleteClient = deleteClient;

async function openFolder(folderPath) {
  await window.api.openClientFolder(folderPath);
}
window.openFolder = openFolder;

async function openDetails(id) {
  selectedClientId = id;
  const client = await window.api.getClient(id);
  const docs = await window.api.listDocuments({ clientId: id });
  const applications = await window.api.listApplications(id);

  document.getElementById('client-details-content').innerHTML = `
    <div class="grid">
      <label>${t('fullName')}<input disabled value="${client.fullName}"/></label>
      <label>ID<input disabled value="${client.nationalId}"/></label>
      <label>${t('phone')}<input id="detail-phone" value="${client.phone || ''}"/></label>
      <label>${t('applicationId')}<input id="detail-application-id" value="${client.applicationId || ''}"/></label>
      <label>${t('status')}<select id="detail-status">${Object.entries(statusMap()).map(([k,v]) => `<option value="${k}" ${client.status===k?'selected':''}>${v}</option>`).join('')}</select></label>
    </div>

    <label>${t('serviceDescription')}<textarea id="detail-service">${client.serviceDescription || ''}</textarea></label>
    <label>${t('notes')}<textarea id="detail-notes">${client.notes || ''}</textarea></label>

    <div class="actions-row">
      <button class="big-save" onclick="saveClientDetails()">💾 ${t('bigSave')}</button>
      <button onclick="startScanSession(${client.id})">📠 ${t('scan')}</button>
      <button onclick="openFolder('${client.folderPath.replace(/\\/g, '\\\\')}')">📁 ${t('openFolder')}</button>
      <button class="danger-btn" onclick="deleteClient(${client.id})">🗑️ ${t('deleteClient')}</button>
    </div>

    <h3>Application History</h3>
    <div class="history-block">
      <ul>
        ${applications.map(a => `<li><strong>${a.applicationId || '-'} </strong> - ${a.serviceDescription || '-'} - ${statusMap()[a.status] || a.status} <em>(${formatDate(a.createdAt)})</em></li>`).join('') || '<li>No history yet.</li>'}
      </ul>

      <div class="add-app-card">
        <h4>Add Another Application</h4>
        <label>${t('applicationId')}<input id="new-app-id"/></label>
        <label>${t('serviceDescription')}<textarea id="new-app-service"></textarea></label>
        <label>${t('notes')}<textarea id="new-app-notes"></textarea></label>
        <label>${t('status')}<select id="new-app-status">${Object.entries(statusMap()).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
        <button onclick="addApplication(${client.id})">➕ Add Application</button>
      </div>
    </div>

    <h3>Documents</h3>
    <ul>
      ${docs.map(d => `<li>${d.name} <button onclick="openDoc('${d.path.replace(/\\/g, '\\\\')}')">Open</button> <button class="danger-btn" onclick="deleteDoc('${d.path.replace(/\\/g, '\\\\')}')">Delete</button></li>`).join('') || '<li>No documents.</li>'}
    </ul>
    <button onclick="uploadDocs()">📂 Upload</button>
  `;

  showView('client-details');
}
window.openDetails = openDetails;

async function saveClientDetails() {
  await window.api.updateClient({
    id: selectedClientId,
    phone: document.getElementById('detail-phone').value,
    applicationId: document.getElementById('detail-application-id').value,
    serviceDescription: document.getElementById('detail-service').value,
    notes: document.getElementById('detail-notes').value,
    status: document.getElementById('detail-status').value
  });
  showToast(t('saveSuccess'));
  await openDetails(selectedClientId);
  await loadClients();
  await loadDashboard();
}
window.saveClientDetails = saveClientDetails;

async function addApplication(clientId) {
  await window.api.addApplication({
    clientId,
    applicationId: document.getElementById('new-app-id').value,
    serviceDescription: document.getElementById('new-app-service').value,
    notes: document.getElementById('new-app-notes').value,
    status: document.getElementById('new-app-status').value
  });
  showToast('New application added.');
  await openDetails(clientId);
  await loadClients();
  await loadDashboard();
}
window.addApplication = addApplication;

async function startScanSession(clientId) {
  await window.api.setActiveScannerClient(clientId);
  await window.api.updateSettings({ autoImportEnabled: true });
  document.getElementById('scan-modal').classList.remove('hidden');
  showToast(t('scanStarted'));
}
window.startScanSession = startScanSession;

async function finishScanSession() {
  await window.api.clearActiveScannerClient();
  document.getElementById('scan-modal').classList.add('hidden');
  showToast(t('scanFinished'), 'warn');
}

async function uploadDocs() {
  await window.api.uploadDocuments({ clientId: selectedClientId });
  await openDetails(selectedClientId);
}
window.uploadDocs = uploadDocs;

async function openDoc(filePath) {
  await window.api.openDocument(filePath);
}
window.openDoc = openDoc;

async function deleteDoc(filePath) {
  if (!confirm(t('deleteDocConfirm'))) return;
  await window.api.deleteDocument(filePath);
  await openDetails(selectedClientId);
}
window.deleteDoc = deleteDoc;

async function loadScans() {
  const scans = await window.api.listScans();
  const clients = await window.api.listClients({});
  const container = document.getElementById('scan-files');

  container.innerHTML = scans.map(file => `
    <div class="scan-row">
      <span>${file.name}</span>
      <select id="scan-client-${btoa(file.path)}">
        <option value="">Select client</option>
        ${clients.map(c => `<option value="${c.id}">${c.fullName}</option>`).join('')}
      </select>
      <select id="scan-type-${btoa(file.path)}">
        <option value="">No Type</option>
        <option value="Passport">Passport</option>
        <option value="ID_Card">ID Card</option>
        <option value="Form">Form</option>
        <option value="Other">Other</option>
      </select>
      <button onclick="importScan('${file.path.replace(/\\/g, '\\\\')}')">Import</button>
    </div>
  `).join('') || '<p>No scanned files.</p>';
}

async function importScan(sourcePath) {
  const key = btoa(sourcePath);
  const clientId = document.getElementById(`scan-client-${key}`).value;
  if (!clientId) return;
  await window.api.importScan({
    clientId: Number(clientId),
    sourcePath,
    documentType: document.getElementById(`scan-type-${key}`).value
  });
  await loadScans();
}
window.importScan = importScan;

async function loadScannerSettings() {
  const settings = await window.api.getSettings();
  const clients = await window.api.listClients({});

  document.getElementById('scan-folder-input').value = settings.scanFolderPath || '';
  document.getElementById('default-doc-type').value = settings.defaultDocumentType || 'Scan';
  document.getElementById('auto-import-toggle').checked = Boolean(settings.autoImportEnabled);
  document.getElementById('active-client-select').innerHTML = `<option value="">None</option>${clients.map(c => `<option value="${c.id}" ${Number(settings.activeClientId) === c.id ? 'selected' : ''}>${c.fullName}</option>`).join('')}`;
  document.getElementById('scan-logs').innerHTML = (settings.scanLogs || []).map(log => `<li>${log.at} - ${log.message}</li>`).join('') || '<li>No logs yet.</li>';
}

function wireEvents() {
  document.querySelectorAll('nav button').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

  document.getElementById('language-select').addEventListener('change', async e => {
    currentLang = e.target.value;
    await window.api.updateSettings({ language: currentLang });
    applyTranslations();
    refreshFilterLabels();
    showView('dashboard');
  });

  document.getElementById('client-form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target).entries());
    await window.api.createClient(payload);
    e.target.reset();
    document.getElementById('add-client-message').textContent = t('addSuccess');
    showToast(t('addSuccess'));
    await loadDashboard();
    await loadClients();
  });

  ['search-input', 'filter-category', 'filter-status'].forEach(id => {
    document.getElementById(id).addEventListener('input', loadClients);
    document.getElementById(id).addEventListener('change', loadClients);
  });

  document.getElementById('refresh-scans').addEventListener('click', loadScans);
  document.getElementById('export-csv').addEventListener('click', async () => {
    const filePath = await window.api.exportClientsCsv();
    if (filePath) showToast(`CSV exported: ${filePath}`);
  });

  document.getElementById('save-scanner-settings').addEventListener('click', async () => {
    await window.api.updateSettings({
      scanFolderPath: document.getElementById('scan-folder-input').value,
      defaultDocumentType: document.getElementById('default-doc-type').value,
      activeClientId: Number(document.getElementById('active-client-select').value) || null,
      autoImportEnabled: document.getElementById('auto-import-toggle').checked,
      language: currentLang
    });
    showToast(t('scannerSaved'));
    await loadScannerSettings();
  });

  document.getElementById('run-scan-now').addEventListener('click', async () => {
    await window.api.runScannerNow();
    await loadScannerSettings();
    await loadScans();
  });

  document.getElementById('finish-scan-session').addEventListener('click', finishScanSession);
}

(async function init() {
  const config = await window.api.getConfig();
  currentLang = config.settings?.language || 'en';
  document.getElementById('language-select').value = currentLang;
  applyTranslations();
  refreshFilterLabels();
  wireEvents();
  showView('dashboard');
})();
