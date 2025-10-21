// 1. NO importamos nada de 'firebase/firestore'
// 2. Solo importamos la 'db' que viene de nuestra inicialización de 'firebase-admin'
const { db } = require("../../firebase"); 

// 3. La referencia a la colección se obtiene así:
const tasksCollection = db.collection("tasks");

// Obtener todas las tareas
async function findAll() {
  // Se usa .get() sobre la colección
  const snapshot = await tasksCollection.get(); 
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Buscar por ID
async function findById(id) {
  // Se usa .doc(id) sobre la colección
  const ref = tasksCollection.doc(id); 
  const snapshot = await ref.get();

  return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
}

// Agregar tarea
async function addTask(data) {
  const newTask = {
    title: data.title,
    description: data.description || "",
    completed: false,
  };

  // Se usa .add() sobre la colección
  const docRef = await tasksCollection.add(newTask);

  return { id: docRef.id, ...newTask };
}

// Actualizar tarea
async function updateTask(id, data) {
  const ref = tasksCollection.doc(id);
  const updatedFields = {};

  if (typeof data.title !== "undefined") updatedFields.title = data.title;
  if (typeof data.description !== "undefined") updatedFields.description = data.description;
  if (typeof data.completed !== "undefined") updatedFields.completed = Boolean(data.completed);

  // Se usa .update() sobre la referencia del documento
  await ref.update(updatedFields); 
  return findById(id);
}

// Eliminar tarea
async function deleteTask(id) {
  const ref = tasksCollection.doc(id);
  
  // Se usa .delete() sobre la referencia del documento
  await ref.delete(); 
  return true;
}

module.exports = { findAll, findById, addTask, updateTask, deleteTask };