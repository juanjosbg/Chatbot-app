import { auth } from "@/config/firebase";

async function authedFetch(input: RequestInfo, init?: RequestInit) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();
  return fetch(input, {
    ...(init || {}),
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function listChats() {
  const r = await authedFetch("/api/chats");
  if (!r.ok) throw new Error(`listChats failed: ${r.status}`);
  return r.json();
}

export async function createChatAPI(payload?: { title?: string; model?: string }) {
  const r = await authedFetch("/api/chats", {
    method: "POST",
    body: JSON.stringify(payload || {}),
  });
  if (!r.ok) throw new Error(`createChat failed: ${r.status}`);
  return r.json();
}

export async function deleteChatAPI(id: string) {
  const r = await authedFetch(`/api/chats/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error(`deleteChat failed: ${r.status}`);
  return r.json();
}

export async function sendMessageAPI(
  chatId: string,
  msg: { role: "user" | "assistant"; content: string; images?: string[] }
) {
  const r = await authedFetch(`/api/chats/${chatId}/messages`, {
    method: "POST",
    body: JSON.stringify(msg),
  });
  if (!r.ok) throw new Error(`sendMessage failed: ${r.status}`);
  return r.json();
}
