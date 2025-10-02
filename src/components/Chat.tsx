"use client";
import { useChat } from "@/hooks/useChat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chat() {
  const { messages, input, setInput, handleSend } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md h-[80vh] mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-700 bg-gray-900">
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
}
