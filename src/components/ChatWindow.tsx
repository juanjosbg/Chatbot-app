import React from "react";
import type { Message } from "@/types/chat";

type Props = {
  messages: Message[];
};

export default function ChatWindow({ messages }: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-[500px] overflow-y-auto flex flex-col space-y-4 mt-5">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
        >
          {msg.content && (
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.content}
            </p>
          )}
          {msg.images && msg.images.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {msg.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`uploaded-${idx}`}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
