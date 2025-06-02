interface IconButtonWithTextProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
  description: string;
}

export const IconButtonWithText = ({
  icon,
  title,
  description,
  ...props
}: IconButtonWithTextProps) => {
  return (
    <button
      className="p-2 animate-fade-in group cursor-pointer icon-button"
      {...props}
      data-testid="stream-toggle-stream"
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <strong className="text-sm shrink-0">{title}</strong>
        <span className="opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-300 font-bold">
          {description}
        </span>
      </div>
    </button>
  );
};
