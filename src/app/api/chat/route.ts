import { NextResponse } from "next/server";
import { env } from "@/config/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(env.chat.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.chat.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // 스트리밍 응답 처리
    if (response.headers.get("content-type")?.includes("text/event-stream")) {
      const stream = response.body;
      if (!stream) {
        throw new Error("No stream available");
      }

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // 일반 JSON 응답 처리
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
