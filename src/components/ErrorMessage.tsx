export const ErrorMessage = ({
  error,
  resendLastMessage,
}: {
  error: string;
  resendLastMessage: () => void;
}) => {
  return (
    <p className="text-red-500">
      {error}
      <button onClick={resendLastMessage} className="ml-2 underline">
        resend
      </button>
    </p>
  );
};
