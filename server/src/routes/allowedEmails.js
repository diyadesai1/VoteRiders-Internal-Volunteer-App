import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { firestore, FieldValue } from '../firebaseAdmin.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to allowedEmails.txt (server/scripts/allowedEmails.txt)
const emailsFilePath = path.resolve(__dirname, '..', '..', 'scripts', 'allowedEmails.txt');

function normalize(email) {
  return email.trim().toLowerCase();
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getAllEmails() {
  const snap = await firestore.collection('allowedEmails').get();
  const emails = [];
  snap.forEach(doc => emails.push(doc.id));
  emails.sort();
  return emails;
}

function writeEmailsFile(emails) {
  const body = emails.join('\n') + (emails.length ? '\n' : '');
  fs.writeFileSync(emailsFilePath, body, 'utf8');
}

// GET list of emails
router.get('/', async (_req, res, next) => {
  try {
    const emails = await getAllEmails();
    // Ensure file stays in sync (best-effort)
    try { writeEmailsFile(emails); } catch (_) {}
    res.json({ emails });
  } catch (e) {
    next(e);
  }
});

// PUT replace entire list (adds/removes as needed)
router.put('/', async (req, res, next) => {
  try {
    const { emails } = req.body || {};
    if (!Array.isArray(emails)) {
      return res.status(400).json({ error: 'emails array required' });
    }

    const cleaned = [...new Set(emails.map(normalize).filter(e => e))];
    for (const em of cleaned) {
      if (!emailRegex.test(em)) {
        return res.status(400).json({ error: `Invalid email: ${em}` });
      }
    }

    const existing = await getAllEmails();
    const toAdd = cleaned.filter(e => !existing.includes(e));
    const toDelete = existing.filter(e => !cleaned.includes(e));

    if (!toAdd.length && !toDelete.length) {
      // Still rewrite file to reflect ordering
      writeEmailsFile(cleaned);
      return res.json({ emails: cleaned, added: [], deleted: [] });
    }

    const batch = firestore.batch();

    toAdd.forEach(email => {
      const ref = firestore.collection('allowedEmails').doc(email);
      batch.set(ref, { email, updatedAt: FieldValue.serverTimestamp(), source: 'admin-api' }, { merge: true });
    });

    toDelete.forEach(email => {
      const ref = firestore.collection('allowedEmails').doc(email);
      batch.delete(ref);
    });

    await batch.commit();

    // Write updated file
    writeEmailsFile(cleaned);

    res.json({ emails: cleaned, added: toAdd, deleted: toDelete });
  } catch (e) {
    next(e);
  }
});

export default router;
