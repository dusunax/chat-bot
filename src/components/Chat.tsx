"use client";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";
import { LoadingIndecator } from "@/components/LoadingIndecator";
import { FirstLoadingIndecator } from "@/components/FirstLoadingIndecator";

export const Chat = () => {
  const { messages, error, sendMessage, isLoading, isFirstLoad } = useChat();

  /** Handles form submission to send a message. */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = (e.target as HTMLFormElement).message.value;
    (e.target as HTMLFormElement).reset();
    sendMessage(message);
  };

  return (
    <div>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndecator />}
        {isFirstLoad && <FirstLoadingIndecator />}
      </div>
    </div>
  );
};
