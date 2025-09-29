import React from "react";
import type { Message } from "@/types/chat";

interface Props {
  messages: Message[];
}

export default function ChatWindow({ messages }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
      {messages.map((msg, i) => (
        <p key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
          <b>{msg.role === "user" ? "Tú" : "Bot"}:</b> {msg.content}
        </p>
      ))}
    </div>
  );
}
