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
  return (
    <div style={{ marginTop: "10px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="border-2 border-solid rounded-full border-gray-300 p-4"
        style={{ width: "70%", padding: "5px" }}
      />
      <button
        onClick={handleSend}
        style={{ marginLeft: "5px", padding: "5px 10px" }}
      >
        Enviar
      </button>
    </div>
  );
}
