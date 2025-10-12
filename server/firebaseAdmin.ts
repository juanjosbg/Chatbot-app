import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "server/.env.local") });

import admin from "firebase-admin";

if (!admin.apps.length) {
  const json = process.env.FIREBASE_SERVICE_JSON;
  if (json) {
    const payload = json.trim().startsWith("{")
      ? json
      : Buffer.from(json, "base64").toString("utf8");
    const creds = JSON.parse(payload);
    admin.initializeApp({ credential: admin.credential.cert(creds) });
  } else {
    admin.initializeApp();
  }
}

export const firebaseAdmin = admin;
