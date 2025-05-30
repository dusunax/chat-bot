type EnvConfig = {
  chat: {
    apiUrl: string;
    apiKey: string;
    model: string;
  };
};

export const env: EnvConfig = {
  chat: {
    apiUrl: process.env.NEXT_PUBLIC_CHAT_API_URL || "",
    apiKey: process.env.NEXT_PUBLIC_CHAT_API_KEY || "",
    model: process.env.NEXT_PUBLIC_CHAT_MODEL || "",
  },
};
