// store/useMessagesStore.ts
import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import type { Message } from "@/types/chat";

interface MessagesStore {
  messages: Message[];
  fetchMessages: (chatId: string) => void;
  sendMessage: (chatId: string, msg: Message) => Promise<void>;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],

  fetchMessages: (chatId) => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Message),
      }));
      set({ messages: msgs });
    });
  },

  sendMessage: async (chatId, msg) => {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      ...msg,
      createdAt: serverTimestamp(),
    });
  },

  clearMessages: () => set({ messages: [] }),
}));
