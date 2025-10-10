export type Role = "user" | "assistant";

export interface Message {
  id?: string;
  role: Role;
  content: string;
  images?: string[];
  createdAt?: any;
}

export interface Chat {
  id: string;
  title: string;
  userId: string;
  model?: string;
  createdAt?: any;
  lastMessageAt?: any;
}

export interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  fetchChats: () => void;
  createChat: () => Promise<void>;
  deleteChat: (id: string) => Promise<void>;
  setActiveChatId: (id: string) => void;
}

export interface MessagesStore {
  messages: Message[];
  fetchMessages: (chatId: string) => () => void;
  sendMessage: (chatId: string, msg: Omit<Message, "id">) => Promise<void>;
  clearMessages: () => void;
}
