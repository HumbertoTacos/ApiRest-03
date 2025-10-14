const { randomUUID } = require("node:crypto");

let tasks = [
  {
    id: randomUUID(),
    title: "Tarea de ejemplo",
    description: "Esta es una tarea de ejemplo",
    completed: false,
  },
];

function findAll() {
  return tasks;
}

function findById(id) {
  return tasks.find((t) => t.id === id) || null;
}

function addTask(data) {
  const task = {
    id: randomUUID(),
    title: data.title,
    description: data.description || "",
    completed: false,
  };
  tasks.push(task);
  return task;
}

function updateTask(id, data) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = {
    ...tasks[index],
    title: typeof data.title === "undefined" ? tasks[index].title : data.title,
    description: typeof data.description === "undefined" ? tasks[index].description : data.description,
    completed: typeof data.completed === "undefined" ? tasks[index].completed : Boolean(data.completed),
  };
  return tasks[index];
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  addTask,
  updateTask,
  deleteTask,
};
