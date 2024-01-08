import { initializeApp } from 'firebase/app';
import admin from 'firebase-admin';

export function initializeFirebase() {
  require('dotenv').config();

  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

  const firebaseparam = {
    type: process.env.type,
    projectId: process.env.project_id,
    privateKeyId: process.env.project_id,
    privateKey: process.env.private_key.replace(/\\n/g, '\n'),
    clientEmail: process.env.client_email,
    clientId: process.env.client_id,
    authUri: process.env.auth_uri,
    tokenUri: process.env.token_uri,
    authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
    clientX509CertUrl: process.env.client_x509_cert_url,
    universeDomain: process.env.universe_domain,
  };

  admin.initializeApp({
    credential: admin.credential.cert(firebaseparam),
    storageBucket: process.env.storageBucket,
  });

  initializeApp(firebaseConfig);

  console.log('Firebase initialized!');
}
