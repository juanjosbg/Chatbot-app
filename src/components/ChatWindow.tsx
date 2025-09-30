import React from "react";
import type { Message } from "@/types/chat";

type Props = {
  messages: Message[];
};

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-[500px] overflow-y-auto flex flex-col space-y-4 mt-5">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md
              ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-700 text-gray-200 self-start"
              }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
