"use client";
import { useState, useEffect } from "react";
import type { Message } from "@/types/chat";
import { sendMessageToOpenAI } from "@/services/openaiService";
import { sendMessage, getModels } from "@/services/aiService";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hola!, ¿En qué te podemos ayudar hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(
    "google/gemini-2.5-flash-lite-preview-09-2025"
  );
  const [models, setModels] = useState<string[]>([
    "google/gemini-2.5-flash-lite-preview-09-2025",
  ]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const routerModels = await getModels();
        setModels((prev) => Array.from(new Set([...prev, ...routerModels])));
      } catch (err) {
        console.error("Error cargando modelos:", err);
      }
    };
    fetchModels();
  }, []);

  const handleSend = async (text?: string, images?: string[]) => {
  const content = text ?? input;

  if (!content?.trim() && (!images || images.length === 0)) return;

  const newMessages: Message[] = [
    ...messages,
    { role: "user", content, images },
  ];
  setMessages(newMessages);
  setInput(""); // limpiar input

  try {
    let reply = "";
    if (model === "gpt-3.5-turbo" || model === "gpt-4o-mini") {
      reply = await sendMessageToOpenAI(
        newMessages.map((m) => ({
          role: m.role,
          content: m.content ?? "",
        }))
      );
    } else {
      reply = await sendMessage(newMessages, model);
    }

    setMessages([...newMessages, { role: "assistant", content: reply }]);
  } catch (err) {
    console.error("Error en handleSend:", err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ Error al conectar con el chatbot." },
    ]);
  }
};


  return { messages, input, setInput, handleSend, model, setModel, models };
};
