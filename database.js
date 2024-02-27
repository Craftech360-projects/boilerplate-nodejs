const sqlite3 = require("sqlite3").verbose();
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Update path accordingly
const fs = require("fs");

// Read configuration from config.json
const configPath = "./config.json";
const configFile = fs.readFileSync(configPath);
const config = JSON.parse(configFile);
const useFirebase = config.databaseType === "FIREBASE";

// Initialize SQLite database if not using Firebase
let db;
if (!useFirebase) {
  db = new sqlite3.Database("./mydatabase.db", (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the SQLite database.");
      // Create table if not exists
      db.run(
        `CREATE TABLE IF NOT EXISTS example_table (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT
            )`,
        (err) => {
          if (err) {
            console.error("Error creating table:", err.message);
          } else {
            console.log("Table created or already exists.");
          }
        }
      );
    }
  });
}

// Initialize Firebase if using Firebase
if (useFirebase) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Firebase Firestore instance
const firestore = useFirebase ? admin.firestore() : null;

const database = {
  create: function (table, data) {
    return new Promise((resolve, reject) => {
      if (!useFirebase) {
        // Insert data into SQLite
        const { name, description } = data;
        const sql = `INSERT INTO ${table} (name, description) VALUES (?, ?)`;
        db.run(sql, [name, description], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        });
      } else {
        // Insert data into Firebase
        firestore
          .collection(table)
          .add(data)
          .then((docRef) => {
            resolve(docRef.id);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
};

module.exports = database;
