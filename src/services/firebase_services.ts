import firebaseAccount from './firebase_service_account.json';

const fs = require('firebase-admin');
fs.initializeApp({
  credential: fs.credential.cert(firebaseAccount),
});

const db = fs.firestore();
export default db;
