"use client";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { IconButtonWithText } from "@/components/IconButtonWithText";

export const StreamToggle = () => {
  const { isStream, toggleStream } = useTheme();

  if (isStream === null) return <div></div>;

  return (
    <IconButtonWithText
      icon={isStream ? "🐇" : "🐢"}
      title={isStream ? "스트리밍 응답" : "단일 응답"}
      description={
        isStream
          ? "메시지가 도착하는대로 답변을 볼 수 있어요."
          : "답변이 완성된 후 한 번에 볼 수 있어요."
      }
      subDataTestId={isStream ? "stream-toggle-stream" : "stream-toggle-single"}
      className="p-2 cursor-pointer animate-fade-in group relative"
      onClick={toggleStream}
      aria-label={`Switch to ${isStream ? "Single" : "Stream"} mode`}
      data-testid="stream-toggle"
    />
  );
};
