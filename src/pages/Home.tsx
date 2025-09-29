"use client";
import React, { useState, Fragment } from "react";
import { useChat } from "@/hooks/useChat";
import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import { Dialog, DialogTitle, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { LiaSmsSolid } from "react-icons/lia";

export default function Home() {
  const { messages, input, setInput, handleSend, model, setModel, models } =
    useChat();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen h-[107vh]">
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
        <button
          onClick={() => setOpen(true)}
          className="fixed top-5 right-5 rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg hover:bg-blue-700 z-20"
        >
        <LiaSmsSolid />
        </button>

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
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col bg-gray-800 shadow-xl">
                        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                          <DialogTitle className="text-lg font-medium text-white">
                            Panel de opciones
                          </DialogTitle>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="relative flex-1 px-4 py-6 overflow-y-auto">
                          {/* Contenido del drawer */}
                          <p className="text-gray-300">
                            Aquí puedes agregar cualquier contenido:
                            configuraciones, info del chat, etc.
                          </p>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
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
