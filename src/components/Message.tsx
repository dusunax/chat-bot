import { type Message as MessageType, ROLE } from "@/types/chat";
import { formatDate } from "@/utils/formatDate";

export const Message = ({ message }: { message: MessageType }) => {
  const style = {
    [ROLE.User]: "text-blue-500",
    [ROLE.System]: "text-green-500",
  };

  return (
    <div key={message.id}>
      <p className={style[message.role]}>
        {message.text}
        <span className="text-gray-500 text-xs">
          {formatDate(message.created)}
        </span>
      </p>
    </div>
  );
};
