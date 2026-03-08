const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

let db;

function ensureColumn(table, column, definition) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  const exists = columns.some(c => c.name === column);
  if (!exists) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function initDatabase(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      nationalId TEXT NOT NULL,
      phone TEXT,
      category TEXT NOT NULL,
      serviceDescription TEXT,
      notes TEXT,
      applicationId TEXT,
      status TEXT NOT NULL DEFAULT 'WAITING_DOCUMENTS',
      folderPath TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER NOT NULL,
      applicationId TEXT,
      serviceDescription TEXT,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'WAITING_DOCUMENTS',
      callStatus TEXT NOT NULL DEFAULT 'NOT_CALLED',
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_clients_fullName ON clients(fullName);
    CREATE INDEX IF NOT EXISTS idx_clients_nationalId ON clients(nationalId);
    CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
    CREATE INDEX IF NOT EXISTS idx_clients_serviceDescription ON clients(serviceDescription);
    CREATE INDEX IF NOT EXISTS idx_clients_applicationId ON clients(applicationId);
    CREATE INDEX IF NOT EXISTS idx_clients_category ON clients(category);
    CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
    CREATE INDEX IF NOT EXISTS idx_applications_clientId ON applications(clientId);
    CREATE INDEX IF NOT EXISTS idx_applications_createdAt ON applications(createdAt);
    CREATE INDEX IF NOT EXISTS idx_applications_callStatus ON applications(callStatus);
  `);

  ensureColumn('clients', 'applicationId', 'TEXT');
  ensureColumn('applications', 'callStatus', "TEXT DEFAULT 'NOT_CALLED'");
}

function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

module.exports = { initDatabase, getDb };
