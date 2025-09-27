# VoteRiders Internal Volunteer Portal

## Overview
Secure internal platform for managing voter assistance requests and standardizing volunteer workflows. Enables volunteers to triage, prioritize, and respond to inquiries efficiently while maintaining data security and access control.

---

## Core Features

### Authentication & Access Control
- **Serverless authentication** via Firebase Identity Platform.  
- **JWT-based sessions** with email allowlist verification stored in Firestore. Unauthorized accounts are blocked automatically.  
- **Infrastructure:** Firebase BaaS and Firestore for serverless persistence.

### Voter Assistance Triage
- **Decision tree algorithm** computes eligibility and urgency scores for incoming tickets.  
- Prioritizes cases based on calculated risk and urgency metrics to ensure timely resolution.

### FAQ Knowledge Base
- Fully **searchable and filterable** FAQ repository.  

### Support & Resources
- Static support page with training materials, team contacts, and external references.

---

## Tech Stack
- **Frontend:** React  
- **Backend Services:** Firebase (Serverless)  
- **Database:** Firestore (NoSQL)  
- **Authentication:** Firebase Identity Platform (JWT)  
- **Hosting & Deployment:** Vercel  
- **Development:** Node.js  

---

## Architecture
- **Serverless, scalable design:** React frontend communicates directly with Firebase services.  
- **Business logic & security:** Firestore rules enforce access control; Cloud Functions handle complex operations.  
- Clear separation of **UI** and **backend** responsibilities.

---

## Deployment
- Frontend hosted on Vercel with **continuous deployment** from `main`.  

**Production URL:** https://vote-riders-internal-volunteer-app.vercel.app/

---

## Local Setup
```bash
git clone [repo-url]
cd [repo-name]
npm install

Create .env.local with Firebase config:

REACT_APP_FIREBASE_API_KEY="..."
REACT_APP_FIREBASE_AUTH_DOMAIN="..."
REACT_APP_FIREBASE_PROJECT_ID="..."

npm run dev
App runs at http://localhost:5173/