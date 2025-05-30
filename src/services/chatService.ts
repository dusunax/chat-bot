import { ChatRequest, ChatResponse } from "@/types/chat";
import { env } from "@/config/env";

const validateEnv = () => {
  if (!env.chat.apiUrl || !env.chat.apiKey) {
    throw new Error(
      "Chat API configuration is missing. Please check your environment variables."
    );
  }
};

export const sendChatMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  validateEnv();

  const response = await fetch(env.chat.apiUrl, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${env.chat.apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};
