import ReactMarkdown from "react-markdown";
import { useMemo } from "react";

export const renderMarkdown = (text: string) => {
  const components = useMemo(
    () => ({
      h1: ({ ...props }) => (
        <h1 className="text-2xl font-bold mb-4" {...props} />
      ),
      h2: ({ ...props }) => (
        <h2 className="text-xl font-bold mb-3" {...props} />
      ),
      h3: ({ ...props }) => (
        <h3 className="text-lg font-bold mb-2" {...props} />
      ),
      h4: ({ ...props }) => (
        <h4 className="text-base font-bold mb-2" {...props} />
      ),
      h5: ({ ...props }) => (
        <h5 className="text-sm font-bold mb-1" {...props} />
      ),
      h6: ({ ...props }) => (
        <h6 className="text-xs font-bold mb-1" {...props} />
      ),
      p: ({ ...props }) => <p className="mb-4" {...props} />,
      a: ({ ...props }) => (
        <a
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      ),
      img: ({ ...props }) => (
        <span className="block relative mx-auto sm:w-[50%] w-full aspect-[16/9] dark:bg-gray-800 rounded">
          <img
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            {...props}
          />
        </span>
      ),
      code: ({ ...props }) => (
        <code
          className={`bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded`}
          {...props}
        />
      ),
      pre: ({ ...props }) => (
        <pre
          className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"
          {...props}
        />
      ),
      blockquote: ({ ...props }) => (
        <blockquote
          className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic"
          {...props}
        />
      ),
      ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
      ol: ({ ...props }) => (
        <ol className="list-decimal pl-6 mb-4" {...props} />
      ),
      li: ({ ...props }) => <li className="mb-1" {...props} />,
      hr: ({ ...props }) => (
        <hr className="my-4 border-gray-300 dark:border-gray-600" {...props} />
      ),
    }),
    []
  );
  return <ReactMarkdown components={components}>{text}</ReactMarkdown>;
};
