export const LoadingIndecator = () => {
  return (
    <div className="flex items-center gap-2 p-4 animate-fade-in">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        메시지를 생성 중...
      </span>
    </div>
  );
};
