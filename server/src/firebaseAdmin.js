// Firebase Admin initialization
// Supply credentials one of three ways:
// 1) FIREBASE_ADMIN_KEY_B64 = base64-encoded service account JSON
// 2) FIREBASE_ADMIN_KEY = raw JSON string
// 3) GOOGLE_APPLICATION_CREDENTIALS points to JSON file (ADC)

import dotenv from 'dotenv';
dotenv.config();

import { initializeApp, cert, getApps, getApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

function loadServiceAccount() {
  // Support raw JSON service account in FIREBASE_SERVICE_ACCOUNT
  const svc = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (svc) {
    try { return JSON.parse(svc); } catch { /* ignore malformed */ }
  }
  const b64 = process.env.FIREBASE_ADMIN_KEY_B64;
  if (b64) {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  }
  const raw = process.env.FIREBASE_ADMIN_KEY;
  if (raw) {
    try { return JSON.parse(raw); } catch { /* ignore */ }
  }
  return null; // fall back to ADC
}

function resolveProjectId(sa) {
  return (
    process.env.FIREBASE_PROJECT_ID ||
    (sa && (sa.project_id || sa.projectId)) ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    process.env.GCP_PROJECT ||
    undefined
  );
}

function init() {
  if (getApps().length) return getApp();
  const sa = loadServiceAccount();
  const projectId = resolveProjectId(sa);
  if (sa) {
    if (!projectId) {
      console.warn('[firebaseAdmin] Service account loaded but project_id missing; Firestore may fail.');
    }
    return initializeApp({ credential: cert(sa), projectId });
  }
  // ADC path
  if (!projectId) {
    console.warn('[firebaseAdmin] No explicit credentials and no project ID found. Set FIREBASE_PROJECT_ID or provide a service account.');
    return initializeApp(); // hope ADC provides it
  }
  return initializeApp({ credential: applicationDefault(), projectId });
}

const app = init();
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
// Provide exports expected by route files
export const firestore = adminDb; // alias used in routes/allowedEmails.js
export { FieldValue };
export { app };
