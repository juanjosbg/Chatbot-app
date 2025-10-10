"use client";
import { useState, Fragment } from "react";
import { useChat } from "@/hooks/useChat"; 
import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import { Dialog, Transition } from "@headlessui/react";
import { LiaSmsSolid } from "react-icons/lia";
import DrawerPanel from "@/components/DrawerPanel";

export default function Home() {
  const { messages, input, setInput, handleSend, currentChat } = useChat() as any;
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen h-[107vh]">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-5 right-5 rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg hover:bg-blue-700 z-20"
        >
          <LiaSmsSolid />
        </button>

        <div className="mx-auto max-w-4xl mt-10">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              {currentChat?.title ?? "🤖 Chatbot Multimodelo"}
            </h1>

            <div>
              <ChatWindow messages={messages} />
            </div>

            <div className="mt-2">
              <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
            </div>
          </div>
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <DrawerPanel
                    setOpen={setOpen}
                    model={currentChat?.model ?? "google/gemini-2.5-flash-lite-preview-09-2025"}
                    setModel={() => {}}
                    models={[currentChat?.model ?? "google/gemini-2.5-flash-lite-preview-09-2025"]}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}
