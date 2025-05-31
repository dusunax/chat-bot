import { ChatResponseChunk, ROLE } from "@/types/chat";

export const simulateStreamingResponse = async (
  onChunk: (chunk: string) => void
): Promise<ChatResponseChunk> => {
  const testResponse =
    "**안녕하세요!** 저는 `AI 어시스턴트`입니다. ❤️🩷🖤🤍🩵🤎 " +
    "![image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) [link](https://www.google.com)" +
    `
# heading 1` +
    `
## heading 2` +
    `
### heading 3` +
    `
- list item 1` +
    `
- list item 2` +
    `
- list item 3`;

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
