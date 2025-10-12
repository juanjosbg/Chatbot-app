// server/supabase.ts
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "server/.env.local") });

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!url) throw new Error("SUPABASE_URL no está definido en server/.env.local");
if (!serviceRole) throw new Error("SUPABASE_SERVICE_ROLE no está definido en server/.env.local");

export const supabaseAdmin = createClient(url, serviceRole, {
  auth: { persistSession: false },
});
