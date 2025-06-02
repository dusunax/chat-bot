"use client";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { IconButtonWithText } from "@/components/IconButtonWithText";

export const StreamToggle = () => {
  const { isStream, toggleStream } = useTheme();

  if (isStream === null) return <div></div>;

  const props = {
    className: "p-2 cursor-pointer animate-fade-in group relative",
    onClick: toggleStream,
    "aria-label": `Switch to ${isStream ? "Single" : "Stream"} mode`,
    "data-testid": "stream-toggle",
  };

  return (
    <>
      {isStream ? (
        <IconButtonWithText
          icon="🐇"
          title="스트리밍 응답"
          description="메시지가 도착하는대로 답변을 볼 수 있어요."
          subDataTestId="stream-toggle-stream"
          {...props}
        />
      ) : (
        <IconButtonWithText
          icon="🐢"
          title="단일 응답"
          description="답변이 완성된 후 한 번에 볼 수 있어요."
          subDataTestId="stream-toggle-single"
          {...props}
        />
      )}
    </>
  );
};
