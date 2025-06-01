export const ErrorMessage = ({
  error,
  resendLastMessage,
}: {
  error: string;
  resendLastMessage: () => void;
}) => {
  return (
    <div className="flex items-center gap-2 p-4 text-red-500 dark:text-red-400 animate-fade-in">
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-sm font-bold">{message}</span>
      <button
        onClick={resendLastMessage}
        className="ml-2 underline text-xs shrink-0"
      >
        다시 시도
      </button>
    </div>
  );
};
