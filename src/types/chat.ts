// Representa un chat
export interface Chat {
  id: string;
  title: string;
  userId: string;
  createdAt: any;
}

// Representa un mensaje dentro de un chat
export interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
  createdAt?: any;
}

// Store de chats
export interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  fetchChats: () => void;
  createChat: () => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  setActiveChatId: (id: string) => void;
}

// Store de mensajes
export interface MessagesStore {
  messages: Message[];
  fetchMessages: (chatId: string) => void;
  sendMessage: (chatId: string, msg: Message) => Promise<void>;
  clearMessages: () => void;
}
