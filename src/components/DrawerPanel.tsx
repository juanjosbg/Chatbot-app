"use client";
import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CiChat1, CiSearch } from "react-icons/ci";
import { Dialog, DialogTitle, Transition } from "@headlessui/react";

interface DrawerPanelProps {
  setOpen: (open: boolean) => void;
  model: string;
  setModel: (m: string) => void;
  models: string[];
}

export default function DrawerPanel({
  setOpen,
  model,
  setModel,
  models,
}: DrawerPanelProps) {
  return (
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
          {/* Header */}
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

          <hr className="text-gray-400 sm:text-xl/8"/>

          <div className="relative flex-1 px-4 overflow-y-auto">
            <div className="flex flex-col gap-2 mb-4 mt-10 text-2xl text-gray-400 sm:text-xl/8">
              <div className="flex  items-center gap-2">
                <label className="font-thing mr-5 text-white">
                  Selecciona modelo:
                </label>
                <select className="border rounded-full max-w-50 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white"
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
            <span className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
              <CiChat1 className="text-gray-300" />
              <p className="text-gray-300">Nuevo Chat</p>
            </span>

            <span className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
              <CiSearch className="text-gray-300" />
              <p className="text-gray-300">Buscar Chats</p>
            </span>
          </div>
        </div>
      </Dialog.Panel>
    </Transition.Child>
  );
}
