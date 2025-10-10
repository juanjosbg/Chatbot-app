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
  updateDoc,
  doc,
} from "firebase/firestore";

import type { Message, MessagesStore } from "@/types/chat";

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],

  fetchMessages: (chatId) => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Message),
      }));
      set({ messages: msgs });
    });

    return unsub;
  },

  sendMessage: async (chatId, msg) => {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      ...msg,
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", chatId), {
      lastMessageAt: serverTimestamp(),
    });
  },

  clearMessages: () => set({ messages: [] }),
}));
