import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";
import { LoadingIndecator } from "@/components/LoadingIndecator";
import { FirstLoadingIndecator } from "@/components/FirstLoadingIndecator";
import { ErrorMessage } from "./ErrorMessage";
import { StreamingMessage } from "./StreamingMessage";

type MessageListProps = ReturnType<typeof useChat>;

export const MessageList = ({
  messages,
  streamingMessage,
  error,
  isLoading,
  isFirstLoad,
  resendLastMessage,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isFirstLoad || (messages.length === 0 && isLoading)) {
    return (
      <MessageListOuter>
        <FirstLoadingIndecator />
      </MessageListOuter>
    );
  }

  return (
    <MessageListOuter>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {streamingMessage && (
        <StreamingMessage streamingMessage={streamingMessage} />
      )}
      {isLoading && !streamingMessage && <LoadingIndecator />}
      {error && (
        <ErrorMessage error={error} resendLastMessage={resendLastMessage} />
      )}
      <div ref={messagesEndRef} />
    </MessageListOuter>
  );
};

const MessageListOuter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-112px)] flex flex-col overflow-y-auto p-4">
      {children}
    </div>
  );
};
