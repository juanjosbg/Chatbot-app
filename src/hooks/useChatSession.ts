// src/hooks/useChatSession.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import { useMessagesStore } from "@/hooks/useMessagesStore";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function useChatSession() {
  const { activeChatId, chats } = useChatStore();
  const { messages, clearMessages, sendMessage } = useMessagesStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    clearMessages();
  }, [activeChatId, clearMessages]);

  const handleSend = useCallback(
    async (text?: string, images?: string[]) => {
      if (!activeChatId) return;
      const content = (text ?? input).trim();
      if (!content && (!images || images.length === 0)) return;

      setInput("");

      await addDoc(collection(db, "chats", activeChatId, "messages"), {
        role: "user",
        content,
        images: images ?? null,
        createdAt: serverTimestamp(),
      });

      try {
        await fetch(`/api/chats/${activeChatId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "user", content, images: images ?? null }),
        });
      } catch (e) {
        console.warn("No se pudo enviar user msg a Supabase (la UI sigue por Firestore).", e);
      }

      try {
        const resp = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId: activeChatId }),
        });
        const data = await resp.json();
        const reply = data?.reply ?? "⚠️ No se obtuvo respuesta.";

        // 4) Guarda reply en Firestore
        await addDoc(collection(db, "chats", activeChatId, "messages"), {
          role: "assistant",
          content: reply,
          createdAt: serverTimestamp(),
        });

        try {
          await fetch(`/api/chats/${activeChatId}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: "assistant", content: reply }),
          });
        } catch (e) {
          console.warn("No se pudo enviar assistant msg a Supabase.", e);
        }
      } catch {
        await addDoc(collection(db, "chats", activeChatId, "messages"), {
          role: "assistant",
          content: "⚠️ Error al conectar con el chatbot.",
          createdAt: serverTimestamp(),
        });
      }
    },
    [activeChatId, input]
  );

  const currentChat = chats.find((c) => c.id === activeChatId) || null;
  return { activeChatId, currentChat, messages, input, setInput, handleSend };
}
