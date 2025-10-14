# Tareas REST API

API REST para la administración de tareas (CRUD) usando Node.js y Express.

## Endpoints principales

- `GET /api/tasks` — Listar todas las tareas
- `GET /api/tasks/:id` — Obtener una tarea por ID
- `POST /api/tasks` — Crear una nueva tarea (requiere campo `title`)
- `PUT /api/tasks/:id` — Actualizar una tarea existente
- `DELETE /api/tasks/:id` — Eliminar una tarea

## Uso

1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia el servidor:
   ```sh
   npm start
   ```

El servidor se ejecuta por defecto en http://localhost:3000
