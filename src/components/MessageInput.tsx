import React from "react";

export default function MessageInput({
  input,
  setInput,
  handleSend,
}: {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
}) {
  // Función para manejar tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje..."
        className="flex-1 border-2 border-gray-300 rounded-full p-2 text-gray-2 00 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      >
        Enviar
      </button>
    </div>
  );
}
