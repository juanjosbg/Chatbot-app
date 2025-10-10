"use client";

import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "@/hooks/useChatStore";
import { useMessagesStore } from "@/hooks/useMessagesStore";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function useChatSession() {
  const { activeChatId, chats } = useChatStore();
  const { messages, fetchMessages, clearMessages, sendMessage } = useMessagesStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    clearMessages();
    if (!activeChatId) return;
    const unsub = fetchMessages(activeChatId);
    return () => { if (typeof unsub === "function") unsub(); };
  }, [activeChatId, fetchMessages, clearMessages]);

  const handleSend = useCallback(
    async (text?: string, images?: string[]) => {
      if (!activeChatId) return;
      const content = (text ?? input).trim();
      if (!content && (!images || images.length === 0)) return;

      setInput("");

      await sendMessage(activeChatId, {
        role: "user",
        content,
        images,
      });

      try {
        const resp = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId: activeChatId }),
        });
        const data = await resp.json();
        const reply = data?.reply ?? "⚠️ No se obtuvo respuesta.";

        await addDoc(collection(db, "chats", activeChatId, "messages"), {
          role: "assistant",
          content: reply,
          createdAt: serverTimestamp(),
        });
      } catch {
        await addDoc(collection(db, "chats", activeChatId, "messages"), {
          role: "assistant",
          content: "⚠️ Error al conectar con el chatbot.",
          createdAt: serverTimestamp(),
        });
      }
    },
    [activeChatId, input, sendMessage]
  );

  const currentChat = chats.find((c) => c.id === activeChatId) || null;
  return { activeChatId, currentChat, messages, input, setInput, handleSend };
}
