import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ROLE, Message, createChatRequest } from "@/types/chat";
import { sendChatMessage } from "@/services/chatService";

const LOCAL_STORAGE_KEY = "chat_messages";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ⬆️ Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
    setIsFirstLoad(false);
  }, []);

  // ⬇️ Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    setIsLoading(true);
    setError(null);
    const newMessage: Message = {
      text,
      role: ROLE.User,
      id: uuidv4(),
      created: new Date().getTime(),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const data = await sendChatMessage(
        createChatRequest([...messages, newMessage])
      );
      const responseMessage = data.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        {
          text: responseMessage,
          role: ROLE.System,
          id: data.id,
          created: data.created,
        },
      ]);
    } catch (e) {
      if (error) {
        setMessages((prev) => prev.slice(0, -1));
      }
      setError("An error occurred while sending the message.🥲");
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const resendLastMessage = async () => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === ROLE.User) {
      await sendMessage(lastMessage.text);
    }
  };

  return {
    messages,
    error,
    isLoading,
    isFirstLoad,
    sendMessage,
    resendLastMessage,
  };
};
