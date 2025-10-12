// server/api/chat.ts
import { Router } from "express";
import type { Response } from "express";
import fetch from "node-fetch";

import type { AuthedRequest } from "../middlewares/authFirebase";
import { requireFirebaseAuth } from "../middlewares/authFirebase";
import { supabaseAdmin } from "../supabase";

// Si además usas Firestore para leer el historial para la IA:
import admin from "firebase-admin";
const dbAdmin = admin.firestore();

const router = Router();

router.post("/", requireFirebaseAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const { chatId } = req.body as { chatId: string };
    if (!chatId) return res.status(400).json({ error: "chatId requerido" });

    // 1) Historial desde Firestore para darle contexto a la IA
    const msgsSnap = await dbAdmin
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .get();

    const messages = msgsSnap.docs.map((d) => {
      const m = d.data() as { role: "user" | "assistant"; content: string };
      return { role: m.role, content: m.content };
    });

    // 2) Modelo (puedes sacarlo de Firestore si lo guardas)
    const chatDoc = await dbAdmin.collection("chats").doc(chatId).get();
    const model =
      (chatDoc.exists && (chatDoc.get("model") as string)) ||
      "google/gemini-2.5-flash-lite-preview-09-2025";

    // 3) Llamada a OpenRouter
    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("OpenRouter error:", resp.status, text);
      return res.status(500).json({ error: "Proveedor IA no disponible" });
    }

    const data = await resp.json();
    const reply: string = data?.choices?.[0]?.message?.content ?? "No reply";

    // 4) Guarda también en Supabase la respuesta del assistant
    await supabaseAdmin
      .from("messages")
      .insert({
        chat_id: chatId,
        user_id: req.uid!,
        role: "assistant",
        content: reply,
        images: null,
      });

    return res.json({ reply });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: "IA error" });
  }
});

export default router;
