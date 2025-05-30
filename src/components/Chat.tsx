"use client";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";

export const Chat = () => {
  const { messages, error, sendMessage } = useChat();

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
      </div>
    </div>
  );
};
