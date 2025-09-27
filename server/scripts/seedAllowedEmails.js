// Seed allowed emails into Firestore as document IDs in the 'allowedEmails' collection
// Usage: npm run seed:allowedEmails
// Prereqs: Set GOOGLE_APPLICATION_CREDENTIALS env var or provide FIREBASE_SERVICE_ACCOUNT (JSON string)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
function initFirebase() {
  if (admin.apps.length) return; // already initialized

  // Support either application default creds or a JSON string in FIREBASE_SERVICE_ACCOUNT
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (svcJson) {
    try {
      const serviceAccount = JSON.parse(svcJson);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      return;
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:', e);
      process.exit(1);
    }
  }

  // Fallback: application default credentials (GOOGLE_APPLICATION_CREDENTIALS)
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

function readEmailsFile() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'allowedEmails.txt');
  if (!fs.existsSync(filePath)) {
    console.error('allowedEmails.txt not found at', filePath);
    process.exit(1);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  return raw
    .split(/\r?\n/) // split lines
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#')) // remove empty & comment lines
    .map(l => l.toLowerCase()); // normalize case
}

async function seed() {
  initFirebase();
  const db = admin.firestore();
  const emails = [...new Set(readEmailsFile())]; // dedupe

  if (!emails.length) {
    console.log('No emails found to seed. Exiting.');
    return;
  }

  console.log(`Seeding ${emails.length} allowed emails...`);

  const COLLECTION = 'allowedEmails';
  const BATCH_LIMIT = 500;
  let processed = 0;

  while (processed < emails.length) {
    const batch = db.batch();
    const slice = emails.slice(processed, processed + BATCH_LIMIT);
    slice.forEach(email => {
      const docRef = db.collection(COLLECTION).doc(email); // email as document ID
      batch.set(docRef, {
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        source: 'seed-script',
      }, { merge: true });
    });
    await batch.commit();
    processed += slice.length;
    console.log(`Committed batch: ${processed}/${emails.length}`);
  }

  console.log('Seeding complete.');
}

seed().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
