"use client";
import React from "react";
import { useChat } from "@/hooks/useChat";
import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";

export default function Home() {
  const { messages, input, setInput, handleSend, model, setModel, models } =
    useChat();

  return (
    <div className="bg-gray-900 h-[107vh]">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl mt-10">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              🤖 Chatbot Multimodelo
            </h1>
            <div className="flex flex-col gap-2 mb-4 mt-10 text-2xl text-gray-400 sm:text-xl/8">
              <div className="flex items-center gap-2">
                <label className="font-semibold mr-5">Selecciona modelo:</label>
                <select
                  className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  {models.length > 0 ? (
                    models.map((m, i) => (
                      <option key={`${m}-${i}`} value={m}>
                        {m}
                      </option>
                    ))
                  ) : (
                    <option>Cargando modelos...</option>
                  )}
                </select>
              </div>
            </div>

            <ChatWindow messages={messages} />

            <div className="mt-4">
              <MessageInput
                input={input}
                setInput={setInput}
                handleSend={handleSend}
              />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  );
}
