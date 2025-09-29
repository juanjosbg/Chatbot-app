import { useState, useEffect } from "react";
import type { Message } from "@/types/chat";
import { sendMessageToOpenAI } from "@/services/openaiService";
import { sendMessage, getModels } from "@/services/aiService";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [models, setModels] = useState<string[]>(["gpt-3.5-turbo"]);

  // Cargar modelos de OpenRouter al inicio
  useEffect(() => {
    const fetchModels = async () => {
      const routerModels = await getModels();
      setModels((prev) => [...prev, ...routerModels]);
    };
    fetchModels();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      let reply = "";
      if (model === "gpt-3.5-turbo" || model === "gpt-4o-mini") {
        reply = await sendMessageToOpenAI(newMessages);
      } else {
        reply = await sendMessage(newMessages, model);
      }
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error al conectar con el chatbot." },
      ]);
    }
  };

  return { messages, input, setInput, handleSend, model, setModel, models };
};
