const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`);

module.exports = db;
