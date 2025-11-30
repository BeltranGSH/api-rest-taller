const express = require("express")
const path = require("path")
const { errorHandler } = require("./middleware/errorHandler")
const { jsonParser, urlencoded } = require("./middleware/parser")
const { requestLogger } = require("./middleware/logger")
const taskRoutes = require("./routes/tasks")
const { initializeDatabase } = require("./config/database")

const app = express()
const PORT = process.env.PORT || 3000

// Inicializar base de datos
initializeDatabase()

// Middlewares globales
app.use(requestLogger)
app.use(jsonParser)
app.use(urlencoded)

// Rutas
app.use("/api/tasks", taskRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "API REST de Tareas",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/tasks",
    },
  })
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.path,
    method: req.method,
  })
})

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})

module.exports = app
