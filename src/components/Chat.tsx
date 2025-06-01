"use client";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/contexts/ThemeContext";
import { MessageList } from "./MessageList";
import { NewMessageForm } from "./NewMessageForm";

export const Chat = () => {
  const { isStream } = useTheme();
  const useChatProps = useChat({ stream: isStream ?? true });

  return (
    <>
      <MessageList {...useChatProps} />
      <NewMessageForm sendMessage={useChatProps.sendMessage} />
    </>
  );
};
