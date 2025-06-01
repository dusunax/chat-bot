"use client";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";
import { LoadingIndecator } from "@/components/LoadingIndecator";
import { FirstLoadingIndecator } from "@/components/FirstLoadingIndecator";
import { ErrorMessage } from "./ErrorMessage";
import { StreamingMessage } from "./StreamingMessage";
import { useTheme } from "@/contexts/ThemeContext";

export const Chat = () => {
  const { isStream } = useTheme();
  const {
    messages,
    error,
    isLoading,
    isFirstLoad,
    streamingMessage,
    sendMessage,
    resendLastMessage,
  } = useChat({ stream: isStream });

  /** Handles form submission to send a message. */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = (e.target as HTMLFormElement).message.value;
    (e.target as HTMLFormElement).reset();
    try {
      sendMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {streamingMessage && (
          <StreamingMessage streamingMessage={streamingMessage} />
        )}
        {error && (
          <ErrorMessage error={error} resendLastMessage={resendLastMessage} />
        )}
        {isLoading && <LoadingIndecator />}
        {isFirstLoad && <FirstLoadingIndecator />}
      </div>
    </div>
  );
};
