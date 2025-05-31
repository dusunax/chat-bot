import { ROLE } from "@/types/chat";
import { formatDateToUnix } from "@/utils/formatDate";
import { Message } from "./Message";

export const StreamingMessage = ({
  streamingMessage,
}: {
  streamingMessage: string;
}) => {
  return (
    <Message
      className="border-2 border-green-500"
      message={{
        text: streamingMessage,
        role: ROLE.System,
        id: "streaming",
        created: formatDateToUnix(new Date()),
      }}
    />
  );
};
