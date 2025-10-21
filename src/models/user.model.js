// 1. Eliminamos las importaciones de "firebase/firestore" (SDK de cliente)
const { db } = require("../../firebase"); // Usamos la 'db' del SDK de Admin
const bcrypt = require("bcryptjs");

// 2. Obtenemos la colección usando la sintaxis del SDK de Admin
const usersCollection = db.collection("users");

// Buscar por ID
async function findById(id) {
    // Sintaxis: coleccion.doc(id)
    const ref = usersCollection.doc(id);
    // Sintaxis: ref.get()
    const snapshot = await ref.get();
    
    // .exists es una propiedad (sin paréntesis) en el Admin SDK
    if (!snapshot.exists) return null;

    const user = snapshot.data();
    return { id: snapshot.id, username: user.username };
}

// Buscar por nombre de usuario
async function findByUsername(username) {
    // Sintaxis: coleccion.where(...)
    const q = usersCollection.where("username", "==", username);
    // Sintaxis: query.get()
    const snapshot = await q.get();
    
    if (snapshot.empty) return null;

    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
}

// Crear nuevo usuario
async function createUser({ username, password }) {
    // Validar si ya existe (esta función ya usa la sintaxis nueva)
    const existing = await findByUsername(username);
    if (existing) return null;

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPass };
    
    // Sintaxis: coleccion.add(datos)
    const docRef = await usersCollection.add(newUser);

    return { id: docRef.id, username };
}

module.exports = { findById, findByUsername, createUser };