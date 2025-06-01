import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-on-background transition-colors">
        hello world
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-8">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};
