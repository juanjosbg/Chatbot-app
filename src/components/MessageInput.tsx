interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: (text?: string, images?: string[]) => void;
}

export default function MessageInput({
  input,
  setInput,
  handleSend,
}: MessageInputProps) {
  return (
    <div className="flex gap-2 p-3 border-t border-gray-700 bg-gray-900">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Escribe un mensaje..."
        className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 rounded-xl px-4 py-2 resize-none"
        rows={1}
      />
      <button
        onClick={() => handleSend(input)}
        disabled={!input.trim()}
        className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
      >
        ➤
      </button>
    </div>
  );
}
