"use client";

import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import type { Chat, ChatStore } from "@/types/chat";

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,

  fetchChats: () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const chats: Chat[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Chat, "id">),
      }));
      set({ chats });
    });
  },

  createChat: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const newChat = {
      title: `Chat ${get().chats.length + 1}`,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "chats"), newChat);

    await addDoc(collection(db, "chats", docRef.id, "messages"), {
      role: "assistant",
      content: "👋 Hola! Soy tu asistente virtual, ¿en qué te puedo ayudar hoy?",
      createdAt: serverTimestamp(),
    });

    set({ activeChatId: docRef.id });
  },

  deleteChat: async (id: string) => {
    await deleteDoc(doc(db, "chats", id));
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      activeChatId: state.activeChatId === id ? null : state.activeChatId,
    }));
  },

  setActiveChatId: (id: string) => set({ activeChatId: id }),
}));
