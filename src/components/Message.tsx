import { memo } from "react";
import { Message as MessageType } from "@/types/chat";
import { cn } from "@/utils/cn";
import { formatDateToString } from "@/utils/formatDate";
import { renderMarkdown } from "@/utils/markdownRenderer";

interface MessageProps {
  message: MessageType;
  className?: string;
}

export const Message = memo(({ message, className }: MessageProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg mb-4",
        message.role === "user"
          ? "bg-blue-100 dark:bg-blue-900"
          : "bg-gray-100 dark:bg-gray-800",
        className
      )}
    >
      <div className="text-xs text-gray-500">
        {formatDateToString(message.created)}
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {renderMarkdown(message.text)}
      </div>
    </div>
  );
});
