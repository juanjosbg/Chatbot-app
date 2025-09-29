import axios from "axios";

const api = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
  },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessage = async (
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  model: string,
  retries = 3
): Promise<string> => {
  try {
    const res = await api.post("/chat/completions", { model, messages });
    return res.data.choices[0].message.content as string;
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 429 && retries > 0) {
      console.warn(`⚠️ Límite alcanzado. Reintentando... (${retries})`);
      await delay(2000 * Math.pow(2, 3 - retries));
      return sendMessage(messages, model, retries - 1);
    }
    console.error("Error en OpenRouter:", error.response?.data || error.message);
    return "⚠️ El chatbot está ocupado o no disponible. Intenta más tarde.";
  }
};

export const getModels = async (): Promise<string[]> => {
  try {
    const res = await api.get("/models");
    const modelsArray = res.data.models || res.data.data || [];
    return modelsArray.map((m: any) => m.id);
  } catch (error) {
    console.error("Error obteniendo modelos:", error);
    return [];
  }
};
