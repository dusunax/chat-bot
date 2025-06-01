import { StreamToggle } from "./StreamToggle";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <StreamToggle />
      <ThemeToggle />
    </header>
  );
};
