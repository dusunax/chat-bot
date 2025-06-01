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
      data-testid="stream-toggle"
    >
      {isStream ? (
        <span data-testid="stream-toggle-stream">🐇 답변 미리 보기</span>
      ) : (
        <span data-testid="stream-toggle-normal">🐢 답변 한 번에 보기</span>
      )}
    </button>
  );
};
