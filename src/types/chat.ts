import { env } from "@/config/env";

export enum ROLE {
  System = "system",
  User = "user",
}

export type Model = typeof env.chat.model;

export interface Message {
  text: string;
  role: ROLE;
  id: string;
  created: number;
}

export interface ChatRequest {
  model: Model;
  messages: {
    role: ROLE;
    content: string;
  }[];
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: Model;
  choices: {
    index: number;
    message: {
      role: ROLE;
      reasoning_content: string | null;
      content: string;
      tool_calls: string[];
    };
    logprobs: string | null;
    finish_reason: string;
    stop_reason: string | null;
  }[];
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens_details: string | null;
  };
  prompt_logprobs: string | null;
}

export const createChatRequest = (messages: Message[]): ChatRequest => {
  return {
    model: env.chat.model,
    messages: messages.map(({ text, role }) => ({
      role,
      content: text,
    })),
  };
};
