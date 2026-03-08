const translations = {
  en: {
    appTitle: 'Officeno Admin Manager', language: 'Language', dashboard: 'Dashboard', addClient: 'Add Client', clientList: 'Client List',
    calendar: 'Calendar', documentManager: 'Document Manager', scannerSetup: 'Scanner Setup', fullName: 'Full Name',
    idPassport: 'National ID or Passport Number', phone: 'Phone Number', category: 'Service Category', moroccanConsulate: 'Moroccan Consulate',
    otherServices: 'Other Administrative Services', appointment: 'Appointment Date (optional)', status: 'Status', serviceDescription: 'Service Description',
    notes: 'Notes', createClient: 'Create Client', exportCsv: 'Export CSV', actions: 'Actions', clientDetails: 'Client Details',
    importScans: 'Import Scanned Documents', refreshScanFolder: 'Refresh Scan Folder', scanFolder: 'Scan Folder Path', defaultDocType: 'Default Document Type',
    activeClient: 'Active Client for Auto-Scan', autoImport: 'Auto import scans', saveSettings: 'Save Scanner Settings', scanNow: 'Scan Now', scanLogs: 'Scan Logs',
    waiting: 'Waiting Documents', booked: 'Appointment Booked', completed: 'Completed', problem: 'Problem / Missing Document', openFolder: 'Open Folder',
    details: 'Details', setActive: 'Set Active Scan Client', deleteClient: 'Delete Client', confirmDelete: 'Are you sure you want to delete this client?', deletedOk: 'Client deleted successfully.', addSuccess: 'Client added successfully. Folder was created automatically.', updateSuccess: 'Client details updated successfully.', statusSuccess: 'Client status updated.', scannerSaved: 'Scanner settings saved successfully.', activeClientSet: 'Active scan client updated.'
  },
  es: {
    appTitle: 'Gestor Administrativo Officeno', language: 'Idioma', dashboard: 'Panel', addClient: 'Añadir Cliente', clientList: 'Lista de Clientes',
    calendar: 'Calendario', documentManager: 'Gestor de Documentos', scannerSetup: 'Configurar Escáner', fullName: 'Nombre Completo',
    idPassport: 'DNI o Pasaporte', phone: 'Teléfono', category: 'Categoría de Servicio', moroccanConsulate: 'Consulado Marroquí',
    otherServices: 'Otros Servicios Administrativos', appointment: 'Fecha de cita (opcional)', status: 'Estado', serviceDescription: 'Descripción del servicio',
    notes: 'Notas', createClient: 'Crear Cliente', exportCsv: 'Exportar CSV', actions: 'Acciones', clientDetails: 'Detalles del Cliente',
    importScans: 'Importar documentos escaneados', refreshScanFolder: 'Actualizar carpeta de escaneo', scanFolder: 'Ruta de carpeta de escaneo', defaultDocType: 'Tipo por defecto',
    activeClient: 'Cliente activo para auto-escaneo', autoImport: 'Importar escaneos automáticamente', saveSettings: 'Guardar configuración', scanNow: 'Escanear ahora', scanLogs: 'Registro de escaneo',
    waiting: 'Esperando documentos', booked: 'Cita reservada', completed: 'Completado', problem: 'Problema / documento faltante', openFolder: 'Abrir carpeta',
    details: 'Detalles', setActive: 'Establecer cliente activo', deleteClient: 'Eliminar cliente', confirmDelete: '¿Seguro que deseas eliminar este cliente?', deletedOk: 'Cliente eliminado correctamente.', addSuccess: 'Cliente creado correctamente. La carpeta fue creada automáticamente.', updateSuccess: 'Datos del cliente actualizados.', statusSuccess: 'Estado del cliente actualizado.', scannerSaved: 'Configuración del escáner guardada.', activeClientSet: 'Cliente activo actualizado.'
  },
  ar: {
    appTitle: 'مدير أوفيسينو الإداري', language: 'اللغة', dashboard: 'لوحة التحكم', addClient: 'إضافة عميل', clientList: 'قائمة العملاء',
    calendar: 'التقويم', documentManager: 'إدارة المستندات', scannerSetup: 'إعداد الماسح', fullName: 'الاسم الكامل',
    idPassport: 'رقم الهوية أو جواز السفر', phone: 'رقم الهاتف', category: 'فئة الخدمة', moroccanConsulate: 'القنصلية المغربية',
    otherServices: 'خدمات إدارية أخرى', appointment: 'تاريخ الموعد (اختياري)', status: 'الحالة', serviceDescription: 'وصف الخدمة',
    notes: 'ملاحظات', createClient: 'إنشاء عميل', exportCsv: 'تصدير CSV', actions: 'الإجراءات', clientDetails: 'تفاصيل العميل',
    importScans: 'استيراد المستندات الممسوحة', refreshScanFolder: 'تحديث مجلد المسح', scanFolder: 'مسار مجلد المسح', defaultDocType: 'نوع المستند الافتراضي',
    activeClient: 'العميل النشط للمسح التلقائي', autoImport: 'استيراد تلقائي', saveSettings: 'حفظ الإعدادات', scanNow: 'تنفيذ المسح الآن', scanLogs: 'سجل المسح',
    waiting: 'بانتظار المستندات', booked: 'تم حجز الموعد', completed: 'مكتمل', problem: 'مشكلة / مستند ناقص', openFolder: 'فتح المجلد',
    details: 'تفاصيل', setActive: 'تعيين عميل المسح', deleteClient: 'حذف العميل', confirmDelete: 'هل أنت متأكد من حذف هذا العميل؟', deletedOk: 'تم حذف العميل بنجاح.', addSuccess: 'تمت إضافة العميل بنجاح وتم إنشاء المجلد تلقائيًا.', updateSuccess: 'تم تحديث بيانات العميل.', statusSuccess: 'تم تحديث حالة العميل.', scannerSaved: 'تم حفظ إعدادات الماسح.', activeClientSet: 'تم تعيين العميل النشط للمسح.'
  }
};

let currentLang = 'en';
let selectedClientId = null;
let currentSettings = null;

const statusLabels = () => ({
  WAITING_DOCUMENTS: t('waiting'),
  APPOINTMENT_BOOKED: t('booked'),
  COMPLETED: t('completed'),
  PROBLEM_OR_MISSING_DOCUMENT: t('problem')
});

function t(key) { return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key; }

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 30);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(viewId).classList.remove('hidden');
  if (viewId === 'dashboard') loadDashboard();
  if (viewId === 'client-list') loadClients();
  if (viewId === 'calendar') loadCalendar();
  if (viewId === 'document-manager') loadScans();
  if (viewId === 'scanner-setup') loadScannerSettings();
}

function badge(status) { return `<span class="badge status-${status}">${statusLabels()[status] || status}</span>`; }

function refreshFilterLabels() {
  const c = document.getElementById('filter-category');
  c.innerHTML = `<option value="">All</option><option value="MOROCCAN_CONSULATE">${t('moroccanConsulate')}</option><option value="OTHER_SERVICES">${t('otherServices')}</option>`;
  const s = document.getElementById('filter-status');
  s.innerHTML = `<option value="">All</option>${Object.entries(statusLabels()).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}`;
  document.getElementById('status-select-add').innerHTML = Object.entries(statusLabels()).map(([k,v]) => `<option value="${k}">${v}</option>`).join('');
}

async function loadDashboard() {
  const stats = await window.api.getDashboardStats();
  document.getElementById('dashboard').innerHTML = `
    <h2>${t('dashboard')}</h2>
    <div class="card-grid">
      <div class="card"><strong>Total Clients</strong><div>${stats.totalClients}</div></div>
      <div class="card"><strong>${t('appointment')}</strong><div>${stats.upcomingAppointments}</div></div>
      <div class="card"><strong>${t('moroccanConsulate')}</strong><div>${stats.moroccan}</div></div>
      <div class="card"><strong>${t('otherServices')}</strong><div>${stats.other}</div></div>
    </div>`;
}

async function loadClients() {
  const search = document.getElementById('search-input').value.trim();
  const category = document.getElementById('filter-category').value;
  const status = document.getElementById('filter-status').value;
  const clients = await window.api.listClients({ search, category, status });
  document.getElementById('clients-table-body').innerHTML = clients.map(client => `
    <tr>
      <td>${client.fullName}</td><td>${client.nationalId}</td><td>${client.phone || ''}</td>
      <td>${client.category === 'MOROCCAN_CONSULATE' ? t('moroccanConsulate') : t('otherServices')}</td>
      <td>${client.serviceDescription || ''}</td><td>${badge(client.status)}</td><td>${client.appointmentDate || '-'}</td>
      <td>
        <button onclick="openDetails(${client.id})">${t('details')}</button>
        <button onclick="openFolder('${client.folderPath.replace(/\\/g, '\\\\')}')">📁 ${t('openFolder')}</button>
        <button onclick="setActiveClient(${client.id})">🎯 ${t('setActive')}</button>
        <button class="danger-btn" onclick="deleteClient(${client.id})">🗑️ ${t('deleteClient')}</button>
      </td>
    </tr>`).join('');
}

async function setActiveClient(id) {
  await window.api.setActiveScannerClient(id);
  showToast(t('activeClientSet'));
}
window.setActiveClient = setActiveClient;

async function deleteClient(id = selectedClientId) {
  if (!confirm(t('confirmDelete'))) return;
  const removeFolder = confirm('Also delete this client folder and files?');
  await window.api.deleteClient({ id, removeFolder });
  showToast(t('deletedOk'), 'warn');
  if (selectedClientId === id) {
    selectedClientId = null;
    showView('client-list');
  }
  await loadClients();
  await loadDashboard();
  await loadScannerSettings();
}
window.deleteClient = deleteClient;

async function openFolder(folderPath) { await window.api.openClientFolder(folderPath); }
window.openFolder = openFolder;

async function openDetails(id) {
  selectedClientId = id;
  const client = await window.api.getClient(id);
  const documents = await window.api.listDocuments({ clientId: id });
  document.getElementById('client-details-content').innerHTML = `
    <div class="grid">
      <label>${t('fullName')}<input disabled value="${client.fullName}" /></label>
      <label>ID<input disabled value="${client.nationalId}" /></label>
      <label>${t('phone')}<input id="detail-phone" value="${client.phone || ''}" /></label>
      <label>${t('appointment')}<input id="detail-appointment" type="date" value="${client.appointmentDate || ''}" /></label>
      <label>${t('status')}<select id="detail-status">${Object.entries(statusLabels()).map(([v,l]) => `<option value="${v}" ${client.status===v?'selected':''}>${l}</option>`).join('')}</select></label>
    </div>
    <label>${t('serviceDescription')}<textarea id="detail-service">${client.serviceDescription || ''}</textarea></label>
    <label>${t('notes')}<textarea id="detail-notes">${client.notes || ''}</textarea></label>
    <button onclick="saveClientDetails()">Save</button>
    <button onclick="changeStatus()">${t('status')}</button>
    <button onclick="setActiveClient(${client.id})">🎯 ${t('setActive')}</button>
        <button class="danger-btn" onclick="deleteClient(${client.id})">🗑️ ${t('deleteClient')}</button>
    <button onclick="openFolder('${client.folderPath.replace(/\\/g, '\\\\')}')">📁 ${t('openFolder')}</button>
    <button onclick="uploadDocs()">📂 Upload</button>
    <h3>Documents</h3>
    <ul>${documents.map(d => `<li>${d.name} <button onclick="openDoc('${d.path.replace(/\\/g, '\\\\')}')">Open</button><button onclick="deleteDoc('${d.path.replace(/\\/g, '\\\\')}')">Delete</button></li>`).join('') || '<li>No documents.</li>'}</ul>
  `;
  showView('client-details');
}
window.openDetails = openDetails;

async function saveClientDetails() {
  await window.api.updateClient({
    id: selectedClientId,
    phone: document.getElementById('detail-phone').value,
    appointmentDate: document.getElementById('detail-appointment').value,
    serviceDescription: document.getElementById('detail-service').value,
    notes: document.getElementById('detail-notes').value
  });
  await openDetails(selectedClientId);
  showToast(t('updateSuccess'));
}
window.saveClientDetails = saveClientDetails;
async function changeStatus() { await window.api.updateClientStatus({ id: selectedClientId, status: document.getElementById('detail-status').value }); await openDetails(selectedClientId); showToast(t('statusSuccess')); }
window.changeStatus = changeStatus;
async function uploadDocs() { await window.api.uploadDocuments({ clientId: selectedClientId }); await openDetails(selectedClientId); }
window.uploadDocs = uploadDocs;
async function openDoc(path) { await window.api.openDocument(path); }
window.openDoc = openDoc;
async function deleteDoc(path) { await window.api.deleteDocument(path); await openDetails(selectedClientId); }
window.deleteDoc = deleteDoc;

async function loadCalendar() {
  const appointments = await window.api.listAppointments();
  const grouped = appointments.reduce((acc, row) => { (acc[row.appointmentDate] ||= []).push(row); return acc; }, {});
  document.getElementById('calendar-list').innerHTML = Object.keys(grouped).sort().map(date => `<h3>${date}</h3><ul>${grouped[date].map(a => `<li>${a.fullName} - ${statusLabels()[a.status]}</li>`).join('')}</ul>`).join('') || '<p>No appointments found.</p>';
}

async function loadScans() {
  const scans = await window.api.listScans();
  const clients = await window.api.listClients({});
  document.getElementById('scan-files').innerHTML = scans.map(file => `
    <div class="scan-row"><span>${file.name}</span>
      <select id="scan-client-${btoa(file.path)}"><option value="">Select client</option>${clients.map(c => `<option value="${c.id}">${c.fullName}</option>`).join('')}</select>
      <select id="scan-type-${btoa(file.path)}"><option value="">No Type</option><option>Passport</option><option>ID_Card</option><option>Form</option><option>Other</option></select>
      <button onclick="importScan('${file.path.replace(/\\/g, '\\\\')}')">Import</button></div>
  `).join('') || '<p>No scanned files found.</p>';
}

async function importScan(sourcePath) {
  const key = btoa(sourcePath);
  const clientId = document.getElementById(`scan-client-${key}`).value;
  if (!clientId) return alert('Select client first');
  await window.api.importScan({ clientId: Number(clientId), sourcePath, documentType: document.getElementById(`scan-type-${key}`).value });
  await loadScans();
}
window.importScan = importScan;

async function loadScannerSettings() {
  currentSettings = await window.api.getSettings();
  const clients = await window.api.listClients({});
  document.getElementById('scan-folder-input').value = currentSettings.scanFolderPath || '';
  document.getElementById('default-doc-type').value = currentSettings.defaultDocumentType || 'Scan';
  document.getElementById('auto-import-toggle').checked = Boolean(currentSettings.autoImportEnabled);
  document.getElementById('active-client-select').innerHTML = `<option value="">None</option>${clients.map(c => `<option value="${c.id}" ${Number(currentSettings.activeClientId)===c.id?'selected':''}>${c.fullName} (${c.nationalId})</option>`).join('')}`;
  document.getElementById('scan-logs').innerHTML = (currentSettings.scanLogs || []).map(l => `<li>${l.at} - ${l.message}</li>`).join('') || '<li>No logs yet.</li>';
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
    document.getElementById('add-client-message').textContent = t('addSuccess');
    showToast(t('addSuccess'));
    e.target.reset();
    await loadClients();
  });

  ['search-input','filter-category','filter-status'].forEach(id => {
    document.getElementById(id).addEventListener('input', loadClients);
    document.getElementById(id).addEventListener('change', loadClients);
  });

  document.getElementById('refresh-scans').addEventListener('click', loadScans);
  document.getElementById('export-csv').addEventListener('click', async () => { const filePath = await window.api.exportClientsCsv(); if (filePath) showToast(`CSV exported: ${filePath}`); });

  document.getElementById('save-scanner-settings').addEventListener('click', async () => {
    await window.api.updateSettings({
      scanFolderPath: document.getElementById('scan-folder-input').value,
      defaultDocumentType: document.getElementById('default-doc-type').value,
      activeClientId: Number(document.getElementById('active-client-select').value) || null,
      autoImportEnabled: document.getElementById('auto-import-toggle').checked,
      language: currentLang
    });
    await loadScannerSettings();
    showToast(t('scannerSaved'));
  });

  document.getElementById('run-scan-now').addEventListener('click', async () => {
    await window.api.runScannerNow();
    await loadScannerSettings();
    await loadScans();
  });
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
