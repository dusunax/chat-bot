import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ROLE, Message, createChatRequest } from "../types/chat";
import { sendChatMessage } from "../services/chatService";

const LOCAL_STORAGE_KEY = "chat_messages";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ⬆️ Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // ⬇️ Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
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
    } catch (error) {
      console.error(error);
      setError("An error occurred while sending the message.🥲");
    }
  };

  return {
    messages,
    error,
    sendMessage,
  };
};
