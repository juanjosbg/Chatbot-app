// src/components/ChatWindow.tsx
import React, { useEffect, useRef } from "react";
import type { Message } from "@/types/chat";

interface Props {
  messages: Message[];
}

export default function ChatWindow({ messages }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className=" rounded-lg p-4 h-96 overflow-y-auto flex flex-col gap-4"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`p-3 rounded-2xl max-w-[100%] break-words whitespace-pre-wrap text-left
            ${msg.role === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-800 text-gray-200 self-start"}
          `}
        >
          <p className="text-sm">
            <b>{msg.role === "user" ? "Tú" : "Bot"}:</b> {msg.content}
          </p>
        </div>
      ))}
    </div>
  );
}
