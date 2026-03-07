const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

let db;

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
      appointmentDate TEXT,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'WAITING_DOCUMENTS',
      folderPath TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_clients_fullName ON clients(fullName);
    CREATE INDEX IF NOT EXISTS idx_clients_nationalId ON clients(nationalId);
    CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
    CREATE INDEX IF NOT EXISTS idx_clients_serviceDescription ON clients(serviceDescription);
    CREATE INDEX IF NOT EXISTS idx_clients_category ON clients(category);
    CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
    CREATE INDEX IF NOT EXISTS idx_clients_appointmentDate ON clients(appointmentDate);
  `);
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

module.exports = { initDatabase, getDb };
