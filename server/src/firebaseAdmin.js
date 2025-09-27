import admin from 'firebase-admin';
import process from 'process';

if (!admin.apps.length) {
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (svcJson) {
    try {
      const serviceAccount = JSON.parse(svcJson);
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:', e);
      admin.initializeApp({ credential: admin.credential.applicationDefault() });
    }
  } else {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
  }
}

export const firestore = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export default admin;
