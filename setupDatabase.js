const sqlite3 = require('sqlite3').verbose();

// Path to SQLite database file
const dbPath = './mydatabase.db';

// Open a database connection
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error('Error opening database', err.message);
  }
  console.log('Connected to the SQLite database.');
});

// SQL statement to create a table if it doesn't exist
const createTableSql = `
CREATE TABLE IF NOT EXISTS example_table (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

// Execute SQL to create table
db.run(createTableSql, (err) => {
  if (err) {
    return console.error('Error creating table', err.message);
  }
  console.log('Table created or already exists.');
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error('Error closing database', err.message);
  }
  console.log('Database connection closed.');
});
