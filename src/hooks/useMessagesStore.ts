"use client";

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

import type { Message, MessagesStore } from "@/types/chat";

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],

  fetchMessages: (chatId) => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => ({
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
