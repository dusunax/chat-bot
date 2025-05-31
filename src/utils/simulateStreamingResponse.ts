import { ChatResponseChunk, ROLE } from "@/types/chat";

export const simulateStreamingResponse = async (
  onChunk: (chunk: string) => void
): Promise<ChatResponseChunk> => {
  const testResponse =
    "**안녕하세요!** 저는 AI 어시스턴트입니다. ❤️🩷🖤🤍🩵🤎 " +
    new Date().getTime();
  const chunks = testResponse.split("").map((char) => char + "");

  for (const chunk of chunks) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    onChunk(chunk);
  }

  return {
    id: "test-response" + Date.now(),
    created: Date.now(),
    model: "gpt-3.5-turbo",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        delta: {
          role: ROLE.System,
          content: testResponse,
        },
      },
    ],
  };
};
