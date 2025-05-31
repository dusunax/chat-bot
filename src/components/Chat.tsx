"use client";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";
import { LoadingIndecator } from "@/components/LoadingIndecator";
import { FirstLoadingIndecator } from "@/components/FirstLoadingIndecator";
import { ErrorMessage } from "./ErrorMessage";
import { StreamingMessage } from "./StreamingMessage";

export const Chat = () => {
  const [stream, setStream] = useState(true);
  const {
    messages,
    error,
    isLoading,
    isFirstLoad,
    streamingMessage,
    sendMessage,
    resendLastMessage,
  } = useChat({ stream });

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
      <button onClick={() => setStream(!stream)}>
        {stream ? "Streaming" : "Non Streaming"}
      </button>
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
