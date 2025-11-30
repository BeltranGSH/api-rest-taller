const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.join(__dirname, "../data/tareas.db")
let db

// Obtener instancia de base de datos
function getDatabase() {
  if (!db) {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error al conectar a la base de datos:", err)
      } else {
        console.log("Conectado a SQLite")
      }
    })
    db.configure("busyTimeout", 10000)
  }
  return db
}

// Inicializar base de datos
function initializeDatabase() {
  const database = getDatabase()

  database.serialize(() => {
    database.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pendiente',
        priority TEXT DEFAULT 'normal',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  })
}

module.exports = {
  getDatabase,
  initializeDatabase,
}
