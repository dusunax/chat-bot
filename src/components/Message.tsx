import { type Message as MessageType, ROLE } from "@/types/chat";
import { formatDateToString } from "@/utils/formatDate";

export const Message = ({
  message,
  className = "",
}: {
  message: MessageType;
  className?: string;
}) => {
  const style = {
    [ROLE.User]: "text-blue-500",
    [ROLE.System]: "text-green-500",
  };

  return (
    <div key={message.id} className={className}>
      <p className={style[message.role]}>
        {message.text}
        <span className="text-gray-500 text-xs">
          {formatDateToString(message.created)}
        </span>
      </p>
    </div>
  );
};
