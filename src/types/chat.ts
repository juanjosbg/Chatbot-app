export interface Message {
  role: "user" | "assistant";
  content: string;
  images?: string[];
}
