import { memo } from "react";
import { Message as MessageType, ROLE } from "@/types/chat";
import { cn } from "@/utils/cn";
import { formatDateToString } from "@/utils/formatDate";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface MessageProps {
  message: MessageType;
  className?: string;
}

export const Message = memo(({ message, className }: MessageProps) => {
  const isUser = message.role === ROLE.User;

  return (
    <div
      className={cn(
        "flex flex-col mb-4",
        isUser ? "items-end" : "items-start",
        className
      )}
    >
      <div
        className={cn(
          "sm:max-w-[80%] w-[calc(100%-1rem)] rounded-xl px-4 sm:px-6 py-3 sm:py-4 break-all",
          isUser
            ? "bg-gray-200 dark:bg-gray-700 rounded-tr-xs"
            : "bg-blue-100 dark:bg-blue-600 rounded-tl-xs"
        )}
      >
        <MarkdownRenderer text={message.text} />
      </div>
      <div
        className={cn(
          "text-xs text-gray-500 dark:text-gray-300 mt-1",
          isUser ? "mr-1" : "ml-1"
        )}
      >
        {formatDateToString(message.created)}
      </div>
    </div>
  );
});
Message.displayName = "Message";