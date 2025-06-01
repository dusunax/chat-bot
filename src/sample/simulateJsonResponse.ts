import { ChatResponse, ROLE } from "@/types/chat";
import { formatDateToUnix } from "./formatDate";

export const SimulateJsonResponse = (): ChatResponse => {
  return {
    id: "test-response-non-streaming" + Date.now(),
    created: formatDateToUnix(new Date()),
    model: "gpt-3.5-turbo",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: { role: ROLE.System, content: "test for non streaming" },
        logprobs: null,
        finish_reason: null,
      },
    ],
  };
};
