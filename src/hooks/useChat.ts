// src/hooks/useChat.ts
"use client";

import { useChatSession } from "./useChatSession";

export const useChat = () => {
  const {
    messages,
    input,
    setInput,
    handleSend,
    currentChat,
    activeChatId,
  } = useChatSession();

  const model = currentChat?.model ?? "google/gemini-2.5-flash-lite-preview-09-2025";

  const setModel = (_: string) => { };

  const models = [model];

  return {
    messages,
    input,
    setInput,
    handleSend,
    model,
    setModel,
    models,
    currentChat,
    activeChatId,
  };
};
