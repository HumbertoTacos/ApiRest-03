const Task = require("../models/task.model");

function findAll(req, res) {
  const data = Task.findAll();
  res.status(200).json(data);
}

function findById(req, res) {
  const task = Task.findById(req.params.id);
  return task ? res.status(200).json(task) : res.status(404).json({ message: "Tarea no encontrada" });
}

function addTask(req, res) {
  if (!req.body.title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }
  const newTask = Task.addTask(req.body);
  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const updated = Task.updateTask(req.params.id, req.body);
  return updated ? res.status(200).json(updated) : res.status(404).json({ message: "Tarea no encontrada" });
}

function deleteTask(req, res) {
  const deleted = Task.deleteTask(req.params.id);
  return deleted ? res.status(204).send() : res.status(404).json({ message: "Tarea no encontrada" });
}

module.exports = {
  findAll,
  findById,
  addTask,
  updateTask,
  deleteTask,
};
