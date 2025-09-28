// Initialize Firebase and export auth + helpers
// Firestore collection 'allowedEmails' (document ID = lowercase email) controls access.
// Usage: import { signInWithGoogleAndAllowlist } from './firebase';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // optional
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;
try {
  if (typeof window !== 'undefined' && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
  }
} catch (e) {
  // ignore analytics init errors (e.g. unsupported environment)
}
export { analytics };

export function trackEvent(name, params) {
  if (analytics) logEvent(analytics, name, params);
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Allow any email whose domain matches this, in addition to explicit allowlist entries.
const AUTO_ALLOWED_DOMAIN = 'voteriders.org';

export async function isEmailAllowed(email) {
  if (!email) return false;
  const lower = email.toLowerCase();
  const domain = lower.split('@')[1];
  // Auto-allow trusted domain
  if (domain === AUTO_ALLOWED_DOMAIN) return true;
  try {
    const ref = doc(db, 'allowedEmails', lower);
    const snap = await getDoc(ref);
    return snap.exists();
  } catch (e) {
    console.error('Firestore allowlist check failed', e);
    return false; // deny if we cannot verify
  }
}

export async function isEmailAdmin(email) {
  if (!email) return false;
  try {
    const ref = doc(db, 'allowedEmails', email.toLowerCase());
    const snap = await getDoc(ref);
    if (!snap.exists()) return false;
    const data = snap.data() || {};
    if (data.isAdmin === true) return true;
    if (Array.isArray(data.roles) && data.roles.includes('admin')) return true;
    return false;
  } catch (e) {
    console.error('Firestore admin check failed', e);
    return false;
  }
}

export async function signInWithGoogleAndAllowlist() {
  const result = await signInWithPopup(auth, provider);
  const email = result.user.email?.toLowerCase();
  const allowed = await isEmailAllowed(email);
  if (!email || !allowed) {
    try { await result.user.delete(); } catch (_) {}
    await signOut(auth);
    throw new Error('Access denied. This Google account is not on the approved list or VoteRiders.org domain. Contact your administrator if you believe this is an error.');
  }
  trackEvent('login', { method: 'google', email_domain: email.split('@')[1] });
  return result.user;
}
