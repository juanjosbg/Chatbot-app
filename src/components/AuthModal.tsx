"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { auth } from "@/config/firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // firebase User | null
  navigateToLogin: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  user,
  navigateToLogin,
}: AuthModalProps) {
  const handleLogout = async () => {
    await auth.signOut();
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-lg bg-gray-800 p-6 text-white shadow-lg">
            <Dialog.Title className="text-lg font-semibold">
              {user ? "Cerrar sesión" : "Iniciar sesión"}
            </Dialog.Title>

            <div className="mt-4 flex flex-col gap-4">
              {user ? (
                <>
                  <p className="text-center">¿Quieres cerrar tu sesión actual?</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 rounded-md px-4 py-2"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <p className="text-center">No has iniciado sesión todavía.</p>
                  <button
                    onClick={navigateToLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2"
                  >
                    Iniciar sesión
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="w-full border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
