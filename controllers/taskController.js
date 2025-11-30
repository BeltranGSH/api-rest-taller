const { v4: uuidv4 } = require("uuid")
const { getDatabase } = require("../config/database")

// Obtener todas las tareas
function getAllTasks(req, res, next) {
  const db = getDatabase()

  db.all("SELECT * FROM tasks ORDER BY createdAt DESC", (err, rows) => {
    if (err) {
      return next({ status: 500, message: "Error al obtener tareas" })
    }
    res.json({
      success: true,
      data: rows,
    })
  })
}

// Obtener una tarea por ID
function getTaskById(req, res, next) {
  const { id } = req.params
  const db = getDatabase()

  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) {
      return next({ status: 500, message: "Error al obtener la tarea" })
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrada",
      })
    }
    res.json({
      success: true,
      data: row,
    })
  })
}

// Crear nueva tarea
function createTask(req, res, next) {
  const { title, description, priority } = req.body

  // Validar campos requeridos
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "El título es requerido",
    })
  }

  const db = getDatabase()
  const id = uuidv4()
  const now = new Date().toISOString()

  db.run(
    `INSERT INTO tasks (id, title, description, priority, createdAt, updatedAt) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, title, description || null, priority || "normal", now, now],
    (err) => {
      if (err) {
        return next({ status: 500, message: "Error al crear la tarea" })
      }

      db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) {
          return next({ status: 500, message: "Error al recuperar la tarea" })
        }
        res.status(201).json({
          success: true,
          message: "Tarea creada exitosamente",
          data: row,
        })
      })
    },
  )
}

// Actualizar tarea
function updateTask(req, res, next) {
  const { id } = req.params
  const { title, description, status, priority } = req.body
  const db = getDatabase()

  // Verificar que la tarea existe
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) {
      return next({ status: 500, message: "Error al buscar la tarea" })
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrada",
      })
    }

    const updates = []
    const params = []

    if (title !== undefined) {
      updates.push("title = ?")
      params.push(title)
    }
    if (description !== undefined) {
      updates.push("description = ?")
      params.push(description)
    }
    if (status !== undefined) {
      updates.push("status = ?")
      params.push(status)
    }
    if (priority !== undefined) {
      updates.push("priority = ?")
      params.push(priority)
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No hay campos para actualizar",
      })
    }

    updates.push("updatedAt = ?")
    params.push(new Date().toISOString())
    params.push(id)

    const query = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`

    db.run(query, params, (err) => {
      if (err) {
        return next({ status: 500, message: "Error al actualizar la tarea" })
      }

      db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, updatedRow) => {
        if (err) {
          return next({ status: 500, message: "Error al recuperar la tarea actualizada" })
        }
        res.json({
          success: true,
          message: "Tarea actualizada exitosamente",
          data: updatedRow,
        })
      })
    })
  })
}

// Eliminar tarea
function deleteTask(req, res, next) {
  const { id } = req.params
  const db = getDatabase()

  // Verificar que la tarea existe
  db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) {
      return next({ status: 500, message: "Error al buscar la tarea" })
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrada",
      })
    }

    db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
      if (err) {
        return next({ status: 500, message: "Error al eliminar la tarea" })
      }
      res.json({
        success: true,
        message: "Tarea eliminada exitosamente",
        data: row,
      })
    })
  })
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
