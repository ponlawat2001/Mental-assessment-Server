import firebaseAccount from './SA_KEY.json';

const fs = require('firebase-admin');
fs.initializeApp({
  credential: fs.credential.cert(firebaseAccount),
});

const db = fs.firestore();
export default db;
