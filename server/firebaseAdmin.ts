import { initializeApp, applicationDefault, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (getApps().length) return; 

  const svc = process.env.FIREBASE_SERVICE_JSON;
  if (svc) {
    const serviceAccount = JSON.parse(svc);
    initializeApp({ credential: cert(serviceAccount as any) });
    return;
  }

  try {
    initializeApp({ credential: applicationDefault() });
  } catch {
    initializeApp();
  }
}

initAdmin();

export const dbAdmin = getFirestore();
