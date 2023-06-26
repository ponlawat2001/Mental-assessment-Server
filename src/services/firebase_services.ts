import firebaseAccount from './firebase_service_account.json';

const firebase_params = {
  type: firebaseAccount.type,
  projectId: firebaseAccount.project_id,
  privateKeyId: firebaseAccount.private_key_id,
  privateKey: firebaseAccount.private_key,
  clientEmail: firebaseAccount.client_email,
  clientId: firebaseAccount.client_id,
  authUri: firebaseAccount.auth_uri,
  tokenUri: firebaseAccount.token_uri,
  authProviderX509CertUrl: firebaseAccount.auth_provider_x509_cert_url,
  clientX509CertUrl: firebaseAccount.client_x509_cert_url,
};
