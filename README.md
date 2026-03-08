# Officeno Admin Manager (Electron + SQLite)

## PROJECT OVERVIEW
Officeno Admin Manager is a complete **offline Windows desktop application** built with ElectronJS for a small administrative office in Spain.

It helps manage:
- Client records
- Moroccan consulate service requests and applications
- Other Spanish administrative procedures
- Scanned and uploaded documents stored in local client folders
- Case progress via status tracking

Main service categories:
1. **Moroccan Consulate**
2. **Other Administrative Services**

Key workflows:
- Create and search clients
- Assign categories and service descriptions (passport renewal, NIE, empadronamiento, etc.)
- Track application IDs and case status
- Upload files manually
- Import files from a scanner folder (for example `C:/Scans`)
- Open each client's folder directly in Windows Explorer
- Export clients to CSV
- View applications in a calendar-style grouped list

---

## SYSTEM REQUIREMENTS
- **Windows 10** or **Windows 11**
- **Node.js 18+** (recommended latest LTS)
- **npm** (comes with Node.js)

---

## PROJECT SETUP (FOR DEVELOPERS)

1. Install Node.js (LTS) from the official website.
2. Download or clone this repository.
3. Open terminal in the project root.
4. Install dependencies:

```bash
npm install
```

5. Start the application:

```bash
npm start
```

### Project Structure

```text
/app
  /main        -> Electron main process, IPC handlers, window bootstrap
  /preload     -> secure bridge API between renderer and main
  /renderer    -> HTML/CSS/JS user interface (list, details, docs)
  /database    -> SQLite initialization and schema
  /storage     -> filesystem helpers (folders, file import, document operations)
```

---

## DATABASE
- Database engine: **SQLite** (local only)
- File location: Electron `userData` folder, file name `officeno.sqlite3`
- Main table: `clients`

`clients` fields:
- `id`
- `fullName`
- `nationalId`
- `phone`
- `category`
- `serviceDescription`
- `applicationId`
- `notes`
- `status`
- `folderPath`
- `createdAt`

Status values:
- `WAITING_DOCUMENTS` (default)
- `WORKING_ON_APPLICATION`
- `APPOINTMENT_BOOKED`
- `COMPLETED`
- `PROBLEM_OR_MISSING_DOCUMENT`

---

## FOLDER STORAGE
Client folders are auto-created when adding a client.

Base storage path:
- `Documents/OfficenoData/Clients`

Structure:

```text
Clients/
  Moroccan_Consulate/
    FullName_ID/
  Other_Services/
    FullName_ID/
```

Examples:
- `Clients/Moroccan_Consulate/Ahmed_Benali_X123456/`
- `Clients/Other_Services/Maria_Garcia_12345678X/`

The final full path is saved in `clients.folderPath`.

---

## SCANNER SETUP
Configure your Toshiba scanner so scanned files are automatically saved in:

```text
C:/Scans
```

(When not on Windows, the app uses a local fallback scan folder under `Documents/OfficenoData/Scans`.)

### How to use **Import Scanned Documents**
1. Open **Document Manager**.
2. Click **Refresh Scan Folder**.
3. For each scanned file:
   - Select target client
   - (Optional) Select document type (`Passport`, `ID Card`, `Form`, `Other`)
   - Click **Import Scanned Document**
4. The file is moved from scan folder to the selected client folder (renamed with type prefix when chosen).

---


## MULTI-LANGUAGE SUPPORT
- UI language can be switched between **English**, **Spanish**, and **Arabic** from the header language selector.
- Arabic mode enables right-to-left layout for easier reading.

## ADVANCED SCANNER WORKFLOW (AUTO-ROUTING)
A new **Scanner Setup** page is available in the navbar. It allows you to:
- Set the scan folder path
- Enable/disable auto-import
- Choose an active client for auto-scan routing
- Set a default document type prefix
- Review scan logs

When auto-import is enabled and an active client is selected, newly detected scan files are automatically moved to that client's folder.

## BUILDING THE WINDOWS APPLICATION
This project uses **electron-builder**.

1. Install dependencies:

```bash
npm install
```

2. Build installer:

```bash
npm run build
```

3. Generated installer output:

```text
dist/
  Officeno Admin Manager Setup <version>.exe
```

---

## END USER INSTALLATION GUIDE
1. Download the installer file from your administrator.
2. Run the `.exe` installer.
3. Follow the installation wizard steps.
4. Launch the app from desktop shortcut or Start Menu.

### Daily usage
- **Add a client**: Go to `Add Client`, fill all required fields, save.
- **Upload documents**: Open client details and click `📂 Upload Document`.
- **Import scanned documents**: Open `Document Manager`, map scans to clients, import.
- **Open client folder**: click `📁 Open Folder` in list/details.
- **Change case status**: open client details and update status dropdown.

### Screenshot placeholders
- - Add client form: `docs/screenshots/add-client.png`
- Client details and document list: `docs/screenshots/client-details.png`
- Document manager import view: `docs/screenshots/document-manager.png`

---

## TROUBLESHOOTING

### 1) Scanner folder not detected
- Ensure scanner destination is exactly `C:/Scans`.
- Confirm the folder exists and files are being saved there.
- Click **Refresh Scan Folder** in app.

### 2) Documents not importing
- Verify a client is selected before importing.
- Check if file is locked/open in another program.
- Confirm file still exists in scan folder.

### 3) Client folder not opening
- Click `📁 Open Folder` again.
- The app auto-creates missing folder paths.
- Verify Windows Explorer can access user Documents.

### 4) Database not creating
- Ensure app has permission to write to user profile directories.
- Delete corrupted db file in Electron userData and restart app.
- Re-run `npm install` then `npm start`.

---

## Notes for Developers
- App is intentionally offline-first and local-storage only.
- IPC APIs are exposed safely via preload (`window.api`).
- Use `shell.openPath` for opening files/folders in Windows Explorer.


## APPLICATION HISTORY
Each client can have multiple applications over time.
- In client details, use **Add Application** to open a popup and append new service requests.
- History keeps records of application ID, description, notes, status, and date.
- Call state tracking is included per application (`NOT_CALLED`, `ANSWERED`, `NO_ANSWER`) and is editable only through the Edit action.
- Latest application is reflected on the main client record for quick filtering/search.
