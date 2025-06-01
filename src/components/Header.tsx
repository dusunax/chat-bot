import { StreamToggle } from "./StreamToggle";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header
      className="flex justify-between items-center h-10 px-4"
      role="header"
    >
      <StreamToggle />
      <ThemeToggle />
    </header>
  );
};
