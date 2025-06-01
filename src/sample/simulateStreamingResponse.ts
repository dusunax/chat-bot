import { ChatResponseChunk, ROLE } from "@/types/chat";
import { formatDateToUnix } from "./formatDate";

export const simulateStreamingResponse = async (
  onChunk: (chunk: string) => void
): Promise<ChatResponseChunk> => {
  const testResponse =
    "**안녕하세요!** 저는 `AI 챗봇`입니다. ❤️🩷🖤🤍🩵🤎\n\n![image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) [link](https://www.google.com)\n\n# heading 1\n\n## heading 2\n\n### heading 3\n\n- list item 1\n\n- list item 2\n\n- list item 3";

  const chunks = testResponse.split("").map((char) => char + "");

  for (const chunk of chunks) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    onChunk(chunk);
  }

  return {
    id: "test-response" + Date.now(),
    created: formatDateToUnix(new Date()),
    model: "your-model-name",
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
