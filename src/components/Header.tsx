import { StreamToggle } from "./StreamToggle";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header>
      <ul className="flex justify-between items-center h-10 px-4">
        <li>
          <StreamToggle />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </header>
  );
};
