"use client";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const StreamToggle = () => {
  const { isStream, toggleStream } = useTheme();
  return (
    <button
      className="p-2 cursor-pointer"
      onClick={toggleStream}
      aria-label={`Switch to ${isStream ? "Normal" : "Stream"} mode`}
    >
      {isStream ? "🐇 답변 미리 보기" : "🐢 답변 한 번에 보기"}
    </button>
  );
};
