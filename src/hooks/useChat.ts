import { useState, useEffect, useCallback, useRef } from "react";
import {
  ROLE,
  createChatRequestObj,
  type Message,
  type ChatOptions,
} from "@/types/chat";
import { sendChatHandler } from "@/services/chatService";
import { formatDateToUnix } from "@/utils/formatDate";

const LOCAL_STORAGE_KEY = "chat_messages";

const DEFAULT_OPTIONS: Required<ChatOptions> = {
  stream: true,
};

export const useChat = (options: ChatOptions = DEFAULT_OPTIONS) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const streamingMessageRef = useRef<string>("");

  const onChunk = useCallback((chunk: string) => {
    streamingMessageRef.current += chunk;
    setStreamingMessage(streamingMessageRef.current);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (text.trim() === "" || isLoading) {
        return;
      }
      setIsLoading(true);
      setError(null);
      setStreamingMessage("");
      streamingMessageRef.current = "";

      const userMsg: Message = {
        text,
        role: ROLE.User,
        id: crypto.randomUUID(),
        created: formatDateToUnix(new Date()),
      };
      if (!error) {
        setMessages((prev) => [...prev, userMsg]);
      }

      try {
        const data = await sendChatHandler(
          createChatRequestObj([...messages, userMsg]),
          { options, actions: { onChunk } }
        );

        let responseText = "";
        if (options.stream) {
          responseText = streamingMessageRef.current;
        } else if (!options.stream && "message" in data.choices[0]) {
          responseText = data.choices[0].message.content;
        }

        const systemMsg: Message = {
          ...data,
          role: ROLE.System,
          text: responseText,
        };

        setMessages((prev) => [...prev, systemMsg]);
      } catch (e) {
        console.error("Failed to send message:", e);
        setError(e instanceof Error ? e.message : "Failed to send message");
      } finally {
        setIsLoading(false);
        setIsFirstLoad(false);
        setStreamingMessage("");
        streamingMessageRef.current = "";
      }
    },
    [messages, options, isLoading, onChunk]
  );

  const resendLastMessage = useCallback(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === ROLE.User);
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text);
    }
  }, [messages, sendMessage]);

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

  return {
    messages,
    error,
    isLoading,
    isFirstLoad,
    streamingMessage,
    sendMessage,
    resendLastMessage,
  };
};
