import {
  ROLE,
  type ChatRequest,
  type ChatResponse,
  type ChatResponseChunk,
  type SendChatHandlerProps,
} from "@/types/chat";
import { env } from "@/config/env";

const chatRequestHeaders = {
  Authorization: `Bearer ${env.chat.apiKey}`,
  "Content-Type": "application/json",
};

export const sendChatHandler = async (
  payload: ChatRequest,
  { options, actions }: SendChatHandlerProps
): Promise<ChatResponse | ChatResponseChunk> => {
  try {
    validateEnv();
    let data;

    if (options.stream) {
      if (!actions.onChunk) {
        throw new Error("onChunk is required when stream is true");
      }
      data = await processChunkedResponse(payload, actions.onChunk);
    } else {
      data = await processJsonResponse(payload);
    }

    return data;
  } catch (e) {
    console.error("Failed to send message:", e);
    throw e;
  }
};

const validateEnv = () => {
  if (!env.chat.apiUrl || !env.chat.apiKey) {
    throw new Error(
      "Chat API configuration is missing. Please check your environment variables."
    );
  }
};

const processJsonResponse = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  try {
    const response = await fetch(env.chat.apiUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: chatRequestHeaders,
    });

    return response.json();
  } catch (e) {
    console.error("Failed to process json response:", e);
    throw e;
  }
};

const processChunkedResponse = async (
  payload: ChatRequest,
  onChunk: (chunk: string) => void
): Promise<ChatResponseChunk> => {
  try {
    const response = await fetch(env.chat.apiUrl, {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        stream: true,
      }),
      headers: chatRequestHeaders,
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    if (!response.headers.get("content-type")?.includes("text/event-stream")) {
      throw new Error(
        "Invalid response type: " + response.headers.get("content-type")
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    let result = "";
    let metadata: ChatResponseChunk | undefined;
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      // 여러 줄의 데이터를 처리
      const lines = chunk.split("\n");
      for (const line of lines) {
        const cleanLine = line.trim();
        if (!cleanLine || cleanLine === "data: [DONE]") continue;

        try {
          const jsonStr = cleanLine.replace(/^data: /, "");
          const parsedChunk = JSON.parse(jsonStr) as ChatResponseChunk;

          if (metadata === undefined && parsedChunk.id) {
            metadata = parsedChunk;
          }

          const content = parsedChunk.choices[0]?.delta?.content;
          if (content) {
            result += content;
            onChunk(content);
          }
        } catch (e) {
          console.error("Failed to parse chunk:", e, "Line:", cleanLine);
        }
      }
    }

    if (!metadata) {
      throw new Error("No metadata received from stream");
    }

    return {
      ...metadata,
      choices: [
        {
          index: 0,
          delta: {
            role: ROLE.System,
            content: result,
          },
        },
      ],
    };
  } catch (e) {
    console.error("Failed to process chunked response:", e);
    throw e;
  }
};
