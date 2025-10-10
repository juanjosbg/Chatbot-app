import { Router, Request, Response } from "express";
import { dbAdmin } from "../firebaseAdmin";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { chatId } = req.body as { chatId?: string };
    if (!chatId) return res.status(400).json({ error: "chatId requerido" });

    const msgsSnap = await dbAdmin
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .get();

    const messages = msgsSnap.docs.map((d) => d.data());

    const chatDoc = await dbAdmin.collection("chats").doc(chatId).get();
    const model =
      (chatDoc.exists && (chatDoc.get("model") as string)) ||
      "google/gemini-2.5-flash-lite-preview-09-2025";

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY no configurada" });
    }

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("OpenRouter error:", resp.status, text);
      return res.status(502).json({ error: "Proveedor IA no disponible" });
    }

    const data = (await resp.json()) as any;
    const reply = data?.choices?.[0]?.message?.content ?? "No reply";
    return res.json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "IA error" });
  }
});

export default router;
