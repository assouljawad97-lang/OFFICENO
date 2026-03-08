const translations = {
  en: {
    appTitle: 'Officeno Admin Manager', language: 'Language', addClient: 'Add Client', clientList: 'Client List', documentManager: 'Document Manager', scannerSetup: 'Scanner Setup',
    fullName: 'Full Name', idPassport: 'National ID or Passport Number', phone: 'Phone Number', category: 'Service Category', moroccanConsulate: 'Moroccan Consulate', otherServices: 'Other Administrative Services',
    applicationId: 'Application ID', status: 'Status', serviceDescription: 'Service Description', notes: 'Notes', createClient: 'Save Client', exportCsv: 'Export CSV', actions: 'Actions', clientDetails: 'Client Details',
    importScans: 'Import Scanned Documents', refreshScanFolder: 'Refresh Scan Folder', scanFolder: 'Scan Folder Path', defaultDocType: 'Default Document Type', activeClient: 'Active Client for Auto-Scan', autoImport: 'Auto import scans',
    saveSettings: 'Save Scanner Settings', scanNow: 'Scan Now', scanLogs: 'Scan Logs', waiting: 'Waiting Documents', working: 'Working On Application', booked: 'Application Booked', completed: 'Completed', problem: 'Problem / Missing Document',
    openFolder: 'Open Folder', details: 'Details', deleteClient: 'Delete Client', createdAt: 'Created', bigSave: 'Save All Changes', scan: 'Scan',
    addSuccess: 'Client added successfully.', saveSuccess: 'All client changes saved.', deleteSuccess: 'Client deleted successfully.',
    deleteDocConfirm: 'Delete this document?', deleteClientConfirm: 'Are you sure you want to delete this client?', deleteFolderConfirm: 'Also delete client folder and files?',
    scanStarted: 'Scan session started for this client.', scanFinished: 'Scan session finished. Client is no longer active for scanning.', scannerSaved: 'Scanner settings saved.',
    callState: 'Call State', notCalled: 'Not Called', answered: 'Answered', noAnswer: 'No Answer'
  },
  es: {
    appTitle: 'Gestor Administrativo Officeno', language: 'Idioma', addClient: 'Añadir Cliente', clientList: 'Lista de Clientes', documentManager: 'Gestor de Documentos', scannerSetup: 'Configurar Escáner',
    fullName: 'Nombre Completo', idPassport: 'DNI o Pasaporte', phone: 'Teléfono', category: 'Categoría', moroccanConsulate: 'Consulado Marroquí', otherServices: 'Otros Servicios',
    applicationId: 'ID de Solicitud', status: 'Estado', serviceDescription: 'Descripción', notes: 'Notas', createClient: 'Guardar Cliente', exportCsv: 'Exportar CSV', actions: 'Acciones', clientDetails: 'Detalles del Cliente',
    importScans: 'Importar escaneados', refreshScanFolder: 'Actualizar carpeta', scanFolder: 'Ruta carpeta escáner', defaultDocType: 'Tipo por defecto', activeClient: 'Cliente activo para auto-escaneo', autoImport: 'Importación automática',
    saveSettings: 'Guardar configuración', scanNow: 'Escanear ahora', scanLogs: 'Logs de escaneo', waiting: 'Esperando documentos', working: 'En trámite', booked: 'Solicitud registrada', completed: 'Completado', problem: 'Problema / documento faltante',
    openFolder: 'Abrir carpeta', details: 'Detalles', deleteClient: 'Eliminar cliente', createdAt: 'Creado', bigSave: 'Guardar todo', scan: 'Escanear',
    addSuccess: 'Cliente añadido correctamente.', saveSuccess: 'Cambios guardados correctamente.', deleteSuccess: 'Cliente eliminado correctamente.',
    deleteDocConfirm: '¿Eliminar este documento?', deleteClientConfirm: '¿Seguro que deseas eliminar este cliente?', deleteFolderConfirm: '¿También eliminar carpeta y archivos?',
    scanStarted: 'Sesión de escaneo iniciada para este cliente.', scanFinished: 'Sesión finalizada. El cliente ya no está activo para escaneo.', scannerSaved: 'Configuración guardada.',
    callState: 'Estado de llamada', notCalled: 'Sin llamada', answered: 'Contestó', noAnswer: 'No contestó'
  },
  ar: {
    appTitle: 'مدير أوفيسينو', language: 'اللغة', addClient: 'إضافة عميل', clientList: 'قائمة العملاء', documentManager: 'إدارة المستندات', scannerSetup: 'إعداد الماسح',
    fullName: 'الاسم الكامل', idPassport: 'رقم الهوية/الجواز', phone: 'الهاتف', category: 'الفئة', moroccanConsulate: 'القنصلية المغربية', otherServices: 'خدمات أخرى',
    applicationId: 'رقم الطلب', status: 'الحالة', serviceDescription: 'وصف الخدمة', notes: 'ملاحظات', createClient: 'حفظ العميل', exportCsv: 'تصدير CSV', actions: 'إجراءات', clientDetails: 'تفاصيل العميل',
    importScans: 'استيراد ملفات المسح', refreshScanFolder: 'تحديث مجلد المسح', scanFolder: 'مسار مجلد المسح', defaultDocType: 'نوع المستند الافتراضي', activeClient: 'العميل النشط للمسح', autoImport: 'استيراد تلقائي',
    saveSettings: 'حفظ الإعدادات', scanNow: 'نفّذ المسح', scanLogs: 'سجل المسح', waiting: 'بانتظار المستندات', working: 'قيد المعالجة', booked: 'تم تسجيل الطلب', completed: 'مكتمل', problem: 'مشكلة / نقص مستند',
    openFolder: 'فتح المجلد', details: 'تفاصيل', deleteClient: 'حذف العميل', createdAt: 'تاريخ الإنشاء', bigSave: 'حفظ كل التغييرات', scan: 'مسح',
    addSuccess: 'تمت إضافة العميل بنجاح.', saveSuccess: 'تم حفظ التغييرات بنجاح.', deleteSuccess: 'تم حذف العميل بنجاح.',
    deleteDocConfirm: 'هل تريد حذف هذا المستند؟', deleteClientConfirm: 'هل أنت متأكد من حذف هذا العميل؟', deleteFolderConfirm: 'هل تريد حذف المجلد والملفات أيضًا؟',
    scanStarted: 'بدأت جلسة المسح لهذا العميل.', scanFinished: 'انتهت جلسة المسح ولم يعد العميل نشطًا.', scannerSaved: 'تم حفظ إعدادات الماسح.',
    callState: 'حالة الاتصال', notCalled: 'لم يتم الاتصال', answered: 'تم الرد', noAnswer: 'لم يتم الرد'
  }
};

let currentLang = 'en';
let selectedClientId = null;
let pendingAddApplicationClientId = null;

function t(key) { return translations[currentLang]?.[key] || translations.en[key] || key; }
const statusMap = () => ({ WAITING_DOCUMENTS: t('waiting'), WORKING_ON_APPLICATION: t('working'), APPOINTMENT_BOOKED: t('booked'), COMPLETED: t('completed'), PROBLEM_OR_MISSING_DOCUMENT: t('problem') });
const callStatusMap = () => ({ NOT_CALLED: t('notCalled'), ANSWERED: t('answered'), NO_ANSWER: t('noAnswer') });

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => el.classList.add('visible'), 20);
  setTimeout(() => { el.classList.remove('visible'); setTimeout(() => el.remove(), 220); }, 2400);
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
}

function formatDate(v) { return v ? new Date(v).toLocaleString() : '-'; }

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(viewId).classList.remove('hidden');
  if (viewId === 'client-list') loadClients();
  if (viewId === 'document-manager') loadScans();
  if (viewId === 'scanner-setup') loadScannerSettings();
}

function refreshFilterLabels() {
  document.getElementById('filter-category').innerHTML = `<option value="">All</option><option value="MOROCCAN_CONSULATE">${t('moroccanConsulate')}</option><option value="OTHER_SERVICES">${t('otherServices')}</option>`;
  document.getElementById('filter-status').innerHTML = `<option value="">All</option>${Object.entries(statusMap()).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}`;
  document.getElementById('new-app-status').innerHTML = Object.entries(statusMap()).map(([k,v]) => `<option value="${k}">${v}</option>`).join('');
  document.getElementById('new-app-call-status').innerHTML = Object.entries(callStatusMap()).map(([k,v]) => `<option value="${k}">${v}</option>`).join('');
}

function badge(status) { return `<span class="badge status-${status}">${statusMap()[status] || status}</span>`; }

async function loadClients() {
  const clients = await window.api.listClients({
    search: document.getElementById('search-input').value.trim(),
    category: document.getElementById('filter-category').value,
    status: document.getElementById('filter-status').value
  });

  document.getElementById('clients-table-body').innerHTML = clients.map(c => `
    <tr>
      <td>${c.fullName}</td><td>${c.nationalId}</td><td>${c.phone || ''}</td><td>${c.applicationId || '-'}</td>
      <td>${c.category === 'MOROCCAN_CONSULATE' ? t('moroccanConsulate') : t('otherServices')}</td>
      <td>${badge(c.status)}</td><td>${formatDate(c.createdAt)}</td>
      <td>
        <button onclick="openDetails(${c.id})">${t('details')}</button>
        <button onclick="openFolder('${c.folderPath.replace(/\\/g, '\\\\')}')">📁</button>
        <button class="danger-btn" onclick="deleteClient(${c.id})">🗑️</button>
      </td>
    </tr>`).join('');
}

async function deleteClient(id = selectedClientId) {
  if (!confirm(t('deleteClientConfirm'))) return;
  const removeFolder = confirm(t('deleteFolderConfirm'));
  await window.api.deleteClient({ id, removeFolder });
  showToast(t('deleteSuccess'), 'warn');
  selectedClientId = null;
  showView('client-list');
}
window.deleteClient = deleteClient;

async function openFolder(p) { await window.api.openClientFolder(p); }
window.openFolder = openFolder;

function openAddApplicationModal(clientId) {
  pendingAddApplicationClientId = clientId;
  document.getElementById('new-app-id').value = '';
  document.getElementById('new-app-service').value = '';
  document.getElementById('new-app-notes').value = '';
  document.getElementById('new-app-status').value = 'WAITING_DOCUMENTS';
  document.getElementById('new-app-call-status').value = 'NOT_CALLED';
  document.getElementById('add-application-modal').classList.remove('hidden');
}
window.openAddApplicationModal = openAddApplicationModal;

async function updateApplicationCallStatus(applicationId, callStatus) {
  await window.api.updateApplicationCallStatus({ id: Number(applicationId), callStatus });
  showToast('Call state updated.');
}
window.updateApplicationCallStatus = updateApplicationCallStatus;

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

    <h3>Applications History</h3>
    <button onclick="openAddApplicationModal(${client.id})">➕ Add Application</button>
    <table class="history-table">
      <thead>
        <tr><th>${t('applicationId')}</th><th>${t('serviceDescription')}</th><th>${t('status')}</th><th>${t('callState')}</th><th>${t('createdAt')}</th></tr>
      </thead>
      <tbody>
        ${applications.map(a => `
          <tr>
            <td>${a.applicationId || '-'}</td>
            <td>${a.serviceDescription || '-'}</td>
            <td>${badge(a.status)}</td>
            <td>
              <select onchange="updateApplicationCallStatus(${a.id}, this.value)">
                ${Object.entries(callStatusMap()).map(([k,v]) => `<option value="${k}" ${a.callStatus===k?'selected':''}>${v}</option>`).join('')}
              </select>
            </td>
            <td>${formatDate(a.createdAt)}</td>
          </tr>
        `).join('') || '<tr><td colspan="5">No applications yet.</td></tr>'}
      </tbody>
    </table>

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
}
window.saveClientDetails = saveClientDetails;

async function saveNewApplication() {
  if (!pendingAddApplicationClientId) return;
  await window.api.addApplication({
    clientId: pendingAddApplicationClientId,
    applicationId: document.getElementById('new-app-id').value,
    serviceDescription: document.getElementById('new-app-service').value,
    notes: document.getElementById('new-app-notes').value,
    status: document.getElementById('new-app-status').value,
    callStatus: document.getElementById('new-app-call-status').value
  });
  document.getElementById('add-application-modal').classList.add('hidden');
  showToast('Application added.');
  await openDetails(pendingAddApplicationClientId);
  await loadClients();
}

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

async function uploadDocs() { await window.api.uploadDocuments({ clientId: selectedClientId }); await openDetails(selectedClientId); }
window.uploadDocs = uploadDocs;
async function openDoc(filePath) { await window.api.openDocument(filePath); }
window.openDoc = openDoc;
async function deleteDoc(filePath) { if (!confirm(t('deleteDocConfirm'))) return; await window.api.deleteDocument(filePath); await openDetails(selectedClientId); }
window.deleteDoc = deleteDoc;

async function loadScans() {
  const scans = await window.api.listScans();
  const clients = await window.api.listClients({});
  document.getElementById('scan-files').innerHTML = scans.map(file => `
    <div class="scan-row"><span>${file.name}</span>
      <select id="scan-client-${btoa(file.path)}"><option value="">Select client</option>${clients.map(c => `<option value="${c.id}">${c.fullName}</option>`).join('')}</select>
      <select id="scan-type-${btoa(file.path)}"><option value="">No Type</option><option value="Passport">Passport</option><option value="ID_Card">ID Card</option><option value="Form">Form</option><option value="Other">Other</option></select>
      <button onclick="importScan('${file.path.replace(/\\/g, '\\\\')}')">Import</button>
    </div>
  `).join('') || '<p>No scanned files.</p>';
}

async function importScan(sourcePath) {
  const key = btoa(sourcePath);
  const clientId = document.getElementById(`scan-client-${key}`).value;
  if (!clientId) return;
  await window.api.importScan({ clientId: Number(clientId), sourcePath, documentType: document.getElementById(`scan-type-${key}`).value });
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
    showView('client-list');
  });

  document.getElementById('client-form').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target).entries());
    payload.status = 'WAITING_DOCUMENTS';
    await window.api.createClient(payload);
    e.target.reset();
    document.getElementById('add-client-message').textContent = t('addSuccess');
    showToast(t('addSuccess'));
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
  document.getElementById('save-new-application').addEventListener('click', saveNewApplication);
  document.getElementById('cancel-new-application').addEventListener('click', () => {
    document.getElementById('add-application-modal').classList.add('hidden');
  });
}

(async function init() {
  const config = await window.api.getConfig();
  currentLang = config.settings?.language || 'en';
  document.getElementById('language-select').value = currentLang;
  applyTranslations();
  refreshFilterLabels();
  wireEvents();
  showView('client-list');
})();
