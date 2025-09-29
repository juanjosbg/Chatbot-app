// src/services/huggingfaceService.ts
import axios from "axios";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/gpt2";

export const sendMessageToHuggingFace = async (prompt: string) => {
  try {
    const res = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: prompt },
      { headers: { "Authorization": `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY || ""}` } } // API Key es opcional para modelos públicos
    );
    return res.data[0].generated_text;
  } catch (err) {
    console.error("Error HuggingFace:", err);
    return "⚠️ El chatbot no pudo responder.";
  }
};
