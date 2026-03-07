const statusLabels = {
  WAITING_DOCUMENTS: 'Waiting Documents',
  APPOINTMENT_BOOKED: 'Appointment Booked',
  COMPLETED: 'Completed',
  PROBLEM_OR_MISSING_DOCUMENT: 'Problem / Missing Document'
};

let selectedClientId = null;
let clientsCache = [];

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(viewId).classList.remove('hidden');

  if (viewId === 'dashboard') loadDashboard();
  if (viewId === 'client-list') loadClients();
  if (viewId === 'calendar') loadCalendar();
  if (viewId === 'document-manager') loadScans();
}

function badge(status) {
  return `<span class="badge status-${status}">${statusLabels[status] || status}</span>`;
}

async function loadDashboard() {
  const stats = await window.api.getDashboardStats();
  document.getElementById('dashboard').innerHTML = `
    <h2>Dashboard</h2>
    <div class="card-grid">
      <div class="card"><strong>Total Clients</strong><div>${stats.totalClients}</div></div>
      <div class="card"><strong>Upcoming Appointments</strong><div>${stats.upcomingAppointments}</div></div>
      <div class="card"><strong>Moroccan Consulate</strong><div>${stats.moroccan}</div></div>
      <div class="card"><strong>Other Services</strong><div>${stats.other}</div></div>
      <div class="card"><strong>Waiting Documents</strong><div>${stats.statusCounters.WAITING_DOCUMENTS}</div></div>
      <div class="card"><strong>Appointment Booked</strong><div>${stats.statusCounters.APPOINTMENT_BOOKED}</div></div>
      <div class="card"><strong>Completed</strong><div>${stats.statusCounters.COMPLETED}</div></div>
      <div class="card"><strong>Problem / Missing</strong><div>${stats.statusCounters.PROBLEM_OR_MISSING_DOCUMENT}</div></div>
    </div>
  `;
}

async function loadClients() {
  const search = document.getElementById('search-input').value.trim();
  const category = document.getElementById('filter-category').value;
  const status = document.getElementById('filter-status').value;

  clientsCache = await window.api.listClients({ search, category, status });
  const tbody = document.getElementById('clients-table-body');
  tbody.innerHTML = clientsCache.map(client => `
    <tr>
      <td>${client.fullName}</td>
      <td>${client.nationalId}</td>
      <td>${client.phone || ''}</td>
      <td>${client.category === 'MOROCCAN_CONSULATE' ? 'Moroccan Consulate' : 'Other Services'}</td>
      <td>${client.serviceDescription || ''}</td>
      <td>${badge(client.status)}</td>
      <td>${client.appointmentDate || '-'}</td>
      <td>
        <button class="action-btn" onclick="openDetails(${client.id})">Details</button>
        <button class="action-btn" onclick="openFolder('${client.folderPath.replace(/\\/g, '\\\\')}')">📁 Open Folder</button>
      </td>
    </tr>
  `).join('');
}

async function openFolder(folderPath) {
  await window.api.openClientFolder(folderPath);
}
window.openFolder = openFolder;

async function openDetails(id) {
  selectedClientId = id;
  const client = await window.api.getClient(id);
  const documents = await window.api.listDocuments({ clientId: id });

  document.getElementById('client-details-content').innerHTML = `
    <div class="grid">
      <label>Full Name<input disabled value="${client.fullName}" /></label>
      <label>ID<input disabled value="${client.nationalId}" /></label>
      <label>Phone<input id="detail-phone" value="${client.phone || ''}" /></label>
      <label>Appointment Date<input id="detail-appointment" type="date" value="${client.appointmentDate || ''}" /></label>
      <label>Status
        <select id="detail-status">
          ${Object.entries(statusLabels).map(([v,l]) => `<option value="${v}" ${client.status===v?'selected':''}>${l}</option>`).join('')}
        </select>
      </label>
    </div>
    <label>Service Description<textarea id="detail-service">${client.serviceDescription || ''}</textarea></label>
    <label>Notes<textarea id="detail-notes">${client.notes || ''}</textarea></label>

    <button onclick="saveClientDetails()">Save Details</button>
    <button onclick="changeStatus()">Update Status</button>
    <button onclick="openFolder('${client.folderPath.replace(/\\/g, '\\\\')}')">📁 Open Client Folder</button>
    <button onclick="uploadDocs()">📂 Upload Document</button>
    <button onclick="loadScans();showView('document-manager');">📥 Import Scan</button>

    <h3>Documents</h3>
    <ul>
      ${documents.map(d => `<li>${d.name}
        <button onclick="openDoc('${d.path.replace(/\\/g, '\\\\')}')">Open</button>
        <button onclick="deleteDoc('${d.path.replace(/\\/g, '\\\\')}')">Delete</button>
      </li>`).join('') || '<li>No documents yet.</li>'}
    </ul>
  `;
  showView('client-details');
}
window.openDetails = openDetails;

async function saveClientDetails() {
  const payload = {
    id: selectedClientId,
    phone: document.getElementById('detail-phone').value,
    appointmentDate: document.getElementById('detail-appointment').value,
    serviceDescription: document.getElementById('detail-service').value,
    notes: document.getElementById('detail-notes').value
  };
  await window.api.updateClient(payload);
  await openDetails(selectedClientId);
}
window.saveClientDetails = saveClientDetails;

async function changeStatus() {
  const status = document.getElementById('detail-status').value;
  await window.api.updateClientStatus({ id: selectedClientId, status });
  await openDetails(selectedClientId);
  await loadDashboard();
}
window.changeStatus = changeStatus;

async function uploadDocs() {
  await window.api.uploadDocuments({ clientId: selectedClientId });
  await openDetails(selectedClientId);
}
window.uploadDocs = uploadDocs;

async function openDoc(path) {
  await window.api.openDocument(path);
}
window.openDoc = openDoc;

async function deleteDoc(path) {
  await window.api.deleteDocument(path);
  await openDetails(selectedClientId);
}
window.deleteDoc = deleteDoc;

async function loadCalendar() {
  const appointments = await window.api.listAppointments();
  const grouped = appointments.reduce((acc, row) => {
    acc[row.appointmentDate] = acc[row.appointmentDate] || [];
    acc[row.appointmentDate].push(row);
    return acc;
  }, {});

  const html = Object.keys(grouped).sort().map(date => `
    <h3>${date}</h3>
    <ul>${grouped[date].map(a => `<li>${a.fullName} (${a.nationalId}) - ${a.category === 'MOROCCAN_CONSULATE' ? 'Moroccan Consulate' : 'Other Services'} - ${statusLabels[a.status]}</li>`).join('')}</ul>
  `).join('') || '<p>No appointments found.</p>';

  document.getElementById('calendar-list').innerHTML = html;
}

async function loadScans() {
  const scans = await window.api.listScans();
  const clients = await window.api.listClients({});
  const container = document.getElementById('scan-files');

  container.innerHTML = scans.map(file => `
    <div class="scan-row">
      <span>${file.name}</span>
      <select id="scan-client-${btoa(file.path)}">
        <option value="">Select client</option>
        ${clients.map(c => `<option value="${c.id}">${c.fullName} (${c.nationalId})</option>`).join('')}
      </select>
      <select id="scan-type-${btoa(file.path)}">
        <option value="">No Type</option>
        <option value="Passport">Passport</option>
        <option value="ID_Card">ID Card</option>
        <option value="Form">Form</option>
        <option value="Other">Other</option>
      </select>
      <button onclick="importScan('${file.path.replace(/\\/g, '\\\\')}')">Import Scanned Document</button>
    </div>
  `).join('') || '<p>No scanned files found in scan folder.</p>';
}

async function importScan(sourcePath) {
  const key = btoa(sourcePath);
  const clientId = document.getElementById(`scan-client-${key}`).value;
  const documentType = document.getElementById(`scan-type-${key}`).value;
  if (!clientId) {
    alert('Please select a client first.');
    return;
  }
  await window.api.importScan({ clientId: Number(clientId), sourcePath, documentType });
  await loadScans();
  if (selectedClientId === Number(clientId)) {
    await openDetails(selectedClientId);
  }
}
window.importScan = importScan;
window.showView = showView;

function wireEvents() {
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  document.getElementById('client-form').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    payload.status = payload.status || 'WAITING_DOCUMENTS';

    await window.api.createClient(payload);
    document.getElementById('add-client-message').textContent = 'Client created successfully with folder generated.';
    e.target.reset();
    await loadDashboard();
    await loadClients();
  });

  ['search-input','filter-category','filter-status'].forEach(id => {
    document.getElementById(id).addEventListener('input', loadClients);
    document.getElementById(id).addEventListener('change', loadClients);
  });

  document.getElementById('refresh-scans').addEventListener('click', loadScans);

  document.getElementById('export-csv').addEventListener('click', async () => {
    const filePath = await window.api.exportClientsCsv();
    if (filePath) alert(`CSV exported: ${filePath}`);
  });
}

(async function init() {
  await window.api.getConfig();
  wireEvents();
  showView('dashboard');
})();
