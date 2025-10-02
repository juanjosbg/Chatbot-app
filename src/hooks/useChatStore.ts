// store/useChatStore.ts
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

export interface Chat {
  id: string;
  title: string;
  userId: string;
  createdAt: any;
}

interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  fetchChats: () => void;
  createChat: () => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  setActiveChatId: (id: string) => void;
}

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
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Chat, "id">),
      }));
      set({ chats });
    });
  },

  // Crear chat
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
    set({ activeChatId: docRef.id });
  },

  // Eliminar chat
  deleteChat: async (id: string) => {
    await deleteDoc(doc(db, "chats", id));
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      activeChatId: state.activeChatId === id ? null : state.activeChatId,
    }));
  },

  // Cambiar chat activo
  setActiveChatId: (id: string) => set({ activeChatId: id }),
}));
