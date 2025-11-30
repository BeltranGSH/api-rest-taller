const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")

// GET - Obtener todas las tareas
router.get("/", taskController.getAllTasks)

// GET - Obtener tarea por ID
router.get("/:id", taskController.getTaskById)

// POST - Crear nueva tarea
router.post("/", taskController.createTask)

// PUT - Actualizar tarea
router.put("/:id", taskController.updateTask)

// DELETE - Eliminar tarea
router.delete("/:id", taskController.deleteTask)

module.exports = router
