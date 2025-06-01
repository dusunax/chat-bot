import { StreamToggle } from "./StreamToggle";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="flex justify-between items-center" role="header">
      <StreamToggle />
      <ThemeToggle />
    </header>
  );
};
