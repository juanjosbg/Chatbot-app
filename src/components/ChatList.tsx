"use client";
import type { Chat } from "@/hooks/useChatStore";

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ chats, activeChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col gap-2 py-5">
      {chats.length === 0 ? (
        <p className="text-gray-400 text-sm">Aun no tienes conversaciones guardadas.</p>
      ) : (
        chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left px-3 py-2 rounded ${
              chat.id === activeChatId
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {chat.title}
          </button>
        ))
      )}
    </div>
  );
}
