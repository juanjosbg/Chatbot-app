// server/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// salud
app.get("/", (_req, res) => res.send("Backend OK. Prueba /api/health"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = process.env.HOST || "0.0.0.0";
app
  .listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  })
  .on("error", (err) => {
    console.error("❌ Listen error:", err);
  });
