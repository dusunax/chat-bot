export const FirstLoadingIndecator = () => {
  return (
    <div className="flex-1 flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-300 dark:border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          메시지를 불러오는 중...
        </p>
      </div>
    </div>
  );
};
