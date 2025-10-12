import type { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "server/.env.local") });

import admin from "firebase-admin";

function loadFirebaseCreds(): admin.ServiceAccount | null {
  const p = process.env.FIREBASE_CREDENTIALS_PATH;
  if (p && fs.existsSync(p)) {
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw);
  }

  const b64 = process.env.FIREBASE_SERVICE_JSON_B64;
  if (b64) {
    const raw = Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(raw);
  }

  const json = process.env.FIREBASE_SERVICE_JSON;
  if (json) {
    const normalized = json.trim().startsWith("'") && json.trim().endsWith("'")
      ? json.trim().slice(1, -1)
      : json.trim();

    return JSON.parse(normalized);
  }

  return null;
}

if (!admin.apps.length) {
  const creds = loadFirebaseCreds();
  if (creds) {
    admin.initializeApp({ credential: admin.credential.cert(creds) });
  } else {
    admin.initializeApp();
  }
}

export type AuthedRequest = Request & { uid?: string };

export async function requireFirebaseAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const authz = req.header("Authorization") || "";
    const token = authz.startsWith("Bearer ") ? authz.slice("Bearer ".length) : "";
    if (!token) return res.status(401).json({ error: "Missing token" });

    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
