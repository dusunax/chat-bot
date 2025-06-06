import { useState } from "react";
import { useChat } from "@/hooks/useChat";

type NewMessageFormProps = Pick<ReturnType<typeof useChat>, "sendMessage">;

export const NewMessageForm = ({ sendMessage }: NewMessageFormProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      try {
        sendMessage(message);
        setMessage("");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-14 m-4 mt-0 flex items-center border-2 border-gray-200 bg-white dark:bg-gray-600 dark:border-gray-500 rounded-md"
    >
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-1 resize-none outline-none"
        placeholder="Type a message..."
        required
        autoFocus
        disabled={isLoading}
      />
      <button
        type="submit"
        className="mx-2 shrink-0 w-8 h-8 flex items-center justify-center bg-gray-300 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-500 rounded-full transition-colors cursor-pointer"
        aria-label="Send message"
        disabled={!message.trim() || isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </form>
  );
};
