const admin = require('firebase-admin');
const serviceAccount = require('./ServicesAccountKey.json'); // Tu llave

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Esta es la 'db' que debes exportar
const db = admin.firestore(); 

module.exports = { db };