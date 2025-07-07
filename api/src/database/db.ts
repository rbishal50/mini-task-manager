import Database from "better-sqlite3";

const db = new Database(":memory:");

// Initialize tasks table
db.exec(`
  CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    created TEXT NOT NULL,
    submitter TEXT NOT NULL,
    assignee TEXT
  );
`);

export default db;
