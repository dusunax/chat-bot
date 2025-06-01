"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isStream: boolean;
  toggleTheme: () => void;
  toggleStream: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isStream, setIsStream] = useState(false);

  useEffect(() => {
    // 유저가 설정한 테마가 있는지 확인
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedStream = localStorage.getItem("isStream") === "true";

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // 유저가 설정한 테마가 없으면 시스템 설정을 따라감
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setIsStream(savedStream);
  }, []);

  useEffect(() => {
    // 테마 업데이트
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("isStream", isStream.toString());
  }, [theme, isStream]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleStream = () => {
    setIsStream((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, isStream, toggleTheme, toggleStream }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
