// server/api/conversations.ts
import { Router } from "express";
import type { Response } from "express";
import type { AuthedRequest } from "../middlewares/authFirebase";
import { requireFirebaseAuth } from "../middlewares/authFirebase";
import { supabaseAdmin } from "../supabase";

const router = Router();

// (Opcional) Listar chats del usuario
router.get("/chats", requireFirebaseAuth, async (req: AuthedRequest, res: Response) => {
  const uid = req.uid!;
  const { data, error } = await supabaseAdmin
    .from("chats")
    .select("*")
    .eq("user_id", uid)
    .order("last_message_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// (Opcional) Crear chat en Supabase
router.post("/chats", requireFirebaseAuth, async (req: AuthedRequest, res: Response) => {
  const uid = req.uid!;
  const { title, model } = (req.body ?? {}) as { title?: string; model?: string };

  const { data, error } = await supabaseAdmin
    .from("chats")
    .insert({
      user_id: uid,
      title: title || "Nuevo chat",
      model: model || "google/gemini-2.5-flash-lite-preview-09-2025",
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Insertar mensaje (user o assistant) en Supabase
router.post("/chats/:id/messages", requireFirebaseAuth, async (req: AuthedRequest, res: Response) => {
  const uid = req.uid!;
  const chatId = req.params.id;
  const { role, content, images } = (req.body ?? {}) as {
    role: "user" | "assistant";
    content: string;
    images?: string[] | null;
  };

  const { data, error } = await supabaseAdmin
    .from("messages")
    .insert({
      chat_id: chatId,
      user_id: uid,
      role,
      content,
      images: images ? JSON.stringify(images) : null,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  await supabaseAdmin
    .from("chats")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", chatId)
    .eq("user_id", uid);

  res.json(data);
});

export default router;
