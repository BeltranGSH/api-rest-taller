# API REST de Tareas con Node.js y Express

API REST completa para gestión de tareas desarrollada con Node.js y Express, siguiendo los estándares RESTful.

## Características

✅ Endpoints REST completos (GET, POST, PUT, DELETE)
✅ Manejo de errores centralizado
✅ Middlewares para análisis de JSON
✅ Base de datos SQLite
✅ Validación de datos
✅ Sistema de logging de solicitudes
✅ Estructura modular y escalable

## Requisitos

- Node.js (v14 o superior)
- npm

## Instalación

1. **Clonar o descargar el repositorio**

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Ejecutar el servidor**

\`\`\`bash
npm start
\`\`\`

Para desarrollo con reinicio automático:
\`\`\`bash
npm run dev
\`\`\`

El servidor estará disponible en `http://localhost:3000`

## Estructura del Proyecto

\`\`\`
api-rest-tareas/
├── app.js                 # Archivo principal de la aplicación
├── package.json          # Dependencias del proyecto
├── config/
│   └── database.js       # Configuración de SQLite
├── middleware/
│   ├── errorHandler.js   # Manejo centralizado de errores
│   ├── parser.js         # Parsers de JSON y URL-encoded
│   └── logger.js         # Logger de solicitudes HTTP
├── controllers/
│   └── taskController.js # Lógica de negocio de tareas
├── routes/
│   └── tasks.js          # Definición de rutas REST
├── data/
│   └── tareas.db         # Base de datos SQLite (creada automáticamente)
└── README.md             # Este archivo
\`\`\`

## Dependencias

- **express**: Framework web para Node.js
- **sqlite3**: Base de datos relacional
- **uuid**: Generador de IDs únicos
- **nodemon**: Reinicio automático en desarrollo (dev)

## Endpoints de la API

### Base URL
\`\`\`
http://localhost:3000/api/tasks
\`\`\`

### 1. Obtener todas las tareas
\`\`\`
GET /api/tasks
\`\`\`

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "title": "Hacer compras",
      "description": "Comprar leche y pan",
      "status": "pendiente",
      "priority": "normal",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
\`\`\`

### 2. Obtener tarea por ID
\`\`\`
GET /api/tasks/:id
\`\`\`

**Parámetros:**
- `id` (string): ID de la tarea

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Hacer compras",
    "description": "Comprar leche y pan",
    "status": "pendiente",
    "priority": "normal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

### 3. Crear nueva tarea
\`\`\`
POST /api/tasks
\`\`\`

**Body (JSON):**
\`\`\`json
{
  "title": "Hacer compras",
  "description": "Comprar leche y pan",
  "priority": "alto"
}
\`\`\`

**Campos:**
- `title` (string, requerido): Título de la tarea
- `description` (string, opcional): Descripción detallada
- `priority` (string, opcional): Prioridad (normal, bajo, alto) - default: "normal"

**Respuesta exitosa (201):**
\`\`\`json
{
  "success": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "id": "uuid-string",
    "title": "Hacer compras",
    "description": "Comprar leche y pan",
    "status": "pendiente",
    "priority": "alto",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

### 4. Actualizar tarea
\`\`\`
PUT /api/tasks/:id
\`\`\`

**Parámetros:**
- `id` (string): ID de la tarea

**Body (JSON):**
\`\`\`json
{
  "title": "Hacer compras en el supermercado",
  "status": "completada",
  "priority": "bajo"
}
\`\`\`

**Campos (todos opcionales):**
- `title`: Nuevo título
- `description`: Nueva descripción
- `status`: Nuevo estado (pendiente, completada)
- `priority`: Nueva prioridad (normal, bajo, alto)

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true,
  "message": "Tarea actualizada exitosamente",
  "data": {
    "id": "uuid-string",
    "title": "Hacer compras en el supermercado",
    "description": "Comprar leche y pan",
    "status": "completada",
    "priority": "bajo",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:45:00.000Z"
  }
}
\`\`\`

### 5. Eliminar tarea
\`\`\`
DELETE /api/tasks/:id
\`\`\`

**Parámetros:**
- `id` (string): ID de la tarea

**Respuesta exitosa (200):**
\`\`\`json
{
  "success": true,
  "message": "Tarea eliminada exitosamente",
  "data": {
    "id": "uuid-string",
    "title": "Hacer compras",
    "description": "Comprar leche y pan",
    "status": "pendiente",
    "priority": "normal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

## Respuestas de Error

### 400 - Bad Request
\`\`\`json
{
  "success": false,
  "error": "El título es requerido"
}
\`\`\`

### 404 - Not Found
\`\`\`json
{
  "success": false,
  "error": "Tarea no encontrada"
}
\`\`\`

### 500 - Internal Server Error
\`\`\`json
{
  "error": {
    "status": 500,
    "message": "Error interno del servidor",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

## Cómo Probar la API

### Usando cURL

**Crear tarea:**
\`\`\`bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudiar Express","description":"Aprender middlewares","priority":"alto"}'
\`\`\`

**Obtener todas las tareas:**
\`\`\`bash
curl http://localhost:3000/api/tasks
\`\`\`

**Obtener tarea específica:**
\`\`\`bash
curl http://localhost:3000/api/tasks/uuid-de-la-tarea
\`\`\`

**Actualizar tarea:**
\`\`\`bash
curl -X PUT http://localhost:3000/api/tasks/uuid-de-la-tarea \
  -H "Content-Type: application/json" \
  -d '{"status":"completada"}'
\`\`\`

**Eliminar tarea:**
\`\`\`bash
curl -X DELETE http://localhost:3000/api/tasks/uuid-de-la-tarea
\`\`\`

### Usando Postman

1. Importa los ejemplos de endpoints anteriores
2. Configura el método HTTP (GET, POST, PUT, DELETE)
3. Establece la URL `http://localhost:3000/api/tasks`
4. Para POST y PUT, agrega un Body con JSON
5. Ejecuta la solicitud

## Middlewares Implementados

### errorHandler.js
Captura y maneja todos los errores de la aplicación, devolviendo respuestas JSON consistentes.

### parser.js
- JSON Parser: Parsea cuerpos de solicitud JSON
- URL-encoded Parser: Parsea datos de formularios

### logger.js
Registra información de cada solicitud HTTP (método, ruta y timestamp) en la consola.

## Características Avanzadas

- **Validación de Datos**: Verificación de campos requeridos
- **Respuestas Consistentes**: Formato JSON estándar para todos los endpoints
- **Gestión de IDs**: Uso de UUID para identificadores únicos
- **Timestamps**: Registro automático de fechas de creación y actualización
- **Persistencia**: Base de datos SQLite local

## Notas de Seguridad

Para producción, considera:
- Agregar autenticación (JWT, OAuth)
- Implementar CORS si es necesario
- Validar y sanitizar todas las entradas
- Usar variables de entorno para configuraciones sensibles
- Agregar rate limiting
- Usar HTTPS

## Licencia

MIT
