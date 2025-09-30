import React, { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoSend } from "react-icons/io5";

type MessageInputProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: (text?: string, images?: string[]) => void;
};

export default function MessageInput({
  input,
  setInput,
  handleSend,
}: MessageInputProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...urls]);
    }
  };

  const sendMessage = () => {
    if (!input.trim() && previews.length === 0) return;
    handleSend(input, previews);
    setInput("");
    setPreviews([]);
  };

  return (
    <div className="flex flex-col gap-2 p-3 border-t border-gray-700 bg-gray-900">
      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap bg-gray-800 p-2 rounded-lg">
          {previews.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`preview-${index}`}
              className="w-16 h-16 object-cover rounded-lg border border-gray-600"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200"
        >
          <MdAddPhotoAlternate size={22} />
        </label>

        <button
          onClick={sendMessage}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center"
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
}
