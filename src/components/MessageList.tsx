import type { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1 bg-gray-900">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
            msg.role === "user"
              ? "ml-auto bg-blue-600 text-white"
              : "mr-auto bg-gray-800 text-gray-200"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
