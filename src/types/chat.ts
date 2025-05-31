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

export interface ChatResponseChunk {
  id: string;
  object: string;
  created: number;
  model: Model;
  choices: {
    index: number;
    delta: {
      role: ROLE;
      content: string;
    };
  }[];
}

export interface ChatOptions {
  stream?: boolean;
}

export interface ChatActions {
  onChunk: (chunk: string) => void;
}

export interface SendChatHandlerProps {
  options: ChatOptions;
  actions: ChatActions;
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
      content: string;
    };
    logprobs: string | null;
    finish_reason: string | null;
  }[];
}

export const createChatRequestObj = (messages: Message[]): ChatRequest => {
  return {
    model: env.chat.model,
    messages: messages.map(({ text, role }) => ({
      role,
      content: text,
    })),
  };
};
