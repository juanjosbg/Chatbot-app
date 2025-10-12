// src/hooks/useChatStore.ts
"use client";

import { create } from "zustand";
import { listChats, createChatAPI, deleteChatAPI } from "@/services/conversations";

export type Chat = {
  id: string;
  user_id: string;
  title: string;
  model: string;
  last_message_at: string | null;
  created_at: string | null;
};

type ChatStore = {
  chats: Chat[];
  activeChatId: string | null;
  fetchChats: () => Promise<void>;
  createChat: (payload?: { title?: string; model?: string }) => Promise<string | null>;
  deleteChat: (id: string) => Promise<void>;
  setActiveChatId: (id: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,

  fetchChats: async () => {
    try {
      const data: Chat[] = await listChats();
      set({ chats: data });
      const { activeChatId } = get();
      if (!activeChatId && data.length > 0) {
        set({ activeChatId: data[0].id });
      }
    } catch (e) {
      console.error("fetchChats error", e);
    }
  },

  createChat: async (payload) => {
    try {
      const chat: Chat = await createChatAPI(payload);
      set((s) => ({ chats: [chat, ...s.chats], activeChatId: chat.id }));
      return chat.id;
    } catch (e) {
      console.error("createChat error", e);
      return null;
    }
  },

  deleteChat: async (id) => {
    try {
      await deleteChatAPI(id);
      set((s) => ({
        chats: s.chats.filter((c) => c.id !== id),
        activeChatId: s.activeChatId === id ? null : s.activeChatId,
      }));
    } catch (e) {
      console.error("deleteChat error", e);
    }
  },

  setActiveChatId: (id) => set({ activeChatId: id }),
}));
