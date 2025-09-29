import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessageToOpenAI = async (
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  retries = 3
): Promise<string> => {
  try {
    const res = await api.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages,
    });

    return res.data.choices[0].message.content as string;
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 429 && retries > 0) {
      console.warn(`⚠️ Límite de solicitudes alcanzado. Reintentando... (${retries})`);
      await delay(2000 * (4 - retries));
      return sendMessageToOpenAI(messages, retries - 1);
    }

    console.error("Error en OpenAI:", error.response?.data || error.message);
    throw error;
  }
};
