// src/hooks/useMessagesStore.ts
"use client";

import { create } from "zustand";
import { sendMessageAPI } from "@/services/conversations";

export type Message = {
  id?: string;
  chat_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[] | null;
  created_at?: string;
};

type MessagesStore = {
  messages: Message[];
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, msg: Omit<Message, "chat_id" | "user_id">) => Promise<void>;
  clearMessages: () => void;
};

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  fetchMessages: async (_chatId) => {
    return;
  },

  sendMessage: async (chatId, msg) => {
    try {
      const payload = {
        role: msg.role,
        content: msg.content,
        images: msg.images ?? undefined,
      };
      const saved = await sendMessageAPI(chatId, payload);
      set((s) => ({ messages: [...s.messages, saved] }));
    } catch (e) {
      console.error("sendMessage error", e);
    }
  },

  clearMessages: () => set({ messages: [] }),
}));
