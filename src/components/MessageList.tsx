import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";
import { LoadingIndecator } from "@/components/LoadingIndecator";
import { FirstLoadingIndecator } from "@/components/FirstLoadingIndecator";
import { ErrorMessage } from "./ErrorMessage";
import { StreamingMessage } from "./StreamingMessage";

interface MessageListProps extends ReturnType<typeof useChat> {}

export const MessageList = ({
  messages,
  streamingMessage,
  error,
  isLoading,
  isFirstLoad,
  resendLastMessage,
}: MessageListProps) => {
  return (
    <div className="h-[calc(100vh-112px)] flex flex-col  overflow-y-auto p-4">
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
  );
};
