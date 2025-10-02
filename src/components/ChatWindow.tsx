import type { Message } from "@/types/chat";

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-[500px] overflow-y-auto flex flex-col space-y-4 mt-5">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
        >
          <p
            className={`inline-block px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {msg.content}
          </p>
        </div>
      ))}
    </div>
  );
}
