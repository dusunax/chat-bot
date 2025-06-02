import { useMemo } from "react";
import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  text: string;
}

export const MarkdownRenderer = ({ text }: MarkdownRendererProps) => {
  const components: Components = useMemo(
    () => ({
      h1: ({ ...props }) => (
        <h1 className="text-2xl font-bold mb-4 last:mb-0" {...props} />
      ),
      h2: ({ ...props }) => (
        <h2 className="text-xl font-bold mb-3 last:mb-0" {...props} />
      ),
      h3: ({ ...props }) => (
        <h3 className="text-lg font-bold mb-2 last:mb-0" {...props} />
      ),
      h4: ({ ...props }) => (
        <h4 className="text-base font-bold mb-2 last:mb-0" {...props} />
      ),
      h5: ({ ...props }) => (
        <h5 className="text-sm font-bold mb-1 last:mb-0" {...props} />
      ),
      h6: ({ ...props }) => (
        <h6 className="text-xs font-bold mb-1 last:mb-0" {...props} />
      ),
      p: ({ ...props }) => <p className="mb-4 last:mb-0" {...props} />,
      a: ({ ...props }) => (
        <a
          className="text-blue-400 underline"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      ),
      strong: ({ ...props }) => <span className="font-black" {...props} />,
      img: ({ src, alt }) => (
        <span className="block relative mx-auto sm:w-[50%] w-full aspect-[16/9] rounded-lg">
          <Image
            className="absolute inset-0 w-full h-full object-contain"
            src={(src as string) || ""}
            alt={alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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
          className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto grow-0"
          {...props}
        />
      ),
      blockquote: ({ ...props }) => (
        <blockquote
          className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic"
          {...props}
        />
      ),
      ul: ({ ...props }) => (
        <ul className="list-disc pl-6 mb-4 last:mb-0" {...props} />
      ),
      ol: ({ ...props }) => (
        <ol className="list-decimal pl-6 mb-4 last:mb-0" {...props} />
      ),
      li: ({ ...props }) => <li className="mb-1" {...props} />,
      hr: ({ ...props }) => (
        <hr className="my-4 border-gray-300 dark:border-gray-600" {...props} />
      ),
      table: ({ ...props }) => (
        <div className="overflow-x-auto my-4">
          <table
            className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
            {...props}
          />
        </div>
      ),
      thead: ({ ...props }) => <thead {...props} />,
      tbody: ({ ...props }) => (
        <tbody
          className="divide-y divide-gray-300 dark:divide-gray-600"
          {...props}
        />
      ),
      tr: ({ ...props }) => (
        <tr className="bg-gray-50 dark:bg-gray-800" {...props} />
      ),
      th: ({ ...props }) => (
        <th
          className="px-4 py-2 text-left font-semibold border bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          {...props}
        />
      ),
      td: ({ ...props }) => (
        <td
          className="px-4 py-2 border border-gray-300 dark:border-gray-600"
          {...props}
        />
      ),
    }),
    []
  );

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {text}
    </ReactMarkdown>
  );
};
