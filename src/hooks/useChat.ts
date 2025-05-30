import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ROLE, Message, createChatRequest } from "../types/chat";
import { sendChatMessage } from "../services/chatService";

import dummyMessages from "../data/dummy.json";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(
    dummyMessages as Message[]
  );
  const [error, setError] = useState<string | null>(null);

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
