import { renderHook, act } from "@testing-library/react";
import { useChat } from "@/hooks/useChat";
import { SimulateJsonResponse } from "@/sample/simulateJsonResponse";

const mockJsonResponse = SimulateJsonResponse();

describe("useChat", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("초기 상태 확인", () => {
    const { result } = renderHook(() => useChat());

    const DEFAULT_STATE = {
      messages: [],
      error: null,
      isLoading: false,
      isFirstLoad: false,
      streamingMessage: "",
    };

    expect(result.current).toMatchObject(DEFAULT_STATE);
  });

  it("normal 메시지 전송 및 응답 처리", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockJsonResponse,
    });

    const { result } = renderHook(() => useChat({ stream: false }));

    await act(async () => {
      await result.current.sendMessage("테스트 메시지 보내기");
    });

    expect(result.current.messages).toHaveLength(2); // 사용자 메시지 + 응답
    expect(result.current.messages[0].text).toBe("테스트 메시지 보내기");
    expect(result.current.messages[1].text).toBe(
      mockJsonResponse.choices[0].message.content
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("stream 메시지 전송 및 응답 처리", async () => {
    const encoder = new TextEncoder();
    const chunks = [
      `data: {"id":"test-id","object":"chat.completion.chunk","created":123,"model":"gpt-3.5-turbo","choices":[{"index":0,"delta":{"content":"hello"}}]}\n\n`,
      `data: {"id":"test-id","object":"chat.completion.chunk","created":123,"model":"gpt-3.5-turbo","choices":[{"index":0,"delta":{"content":" world"}}]}\n\n`,
      "data: [DONE]\n\n",
    ];

    let chunkIndex = 0;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "text/event-stream" },
      body: {
        getReader: () => ({
          read: async () => {
            if (chunkIndex >= chunks.length) {
              return { done: true, value: undefined };
            }
            return { done: false, value: encoder.encode(chunks[chunkIndex++]) };
          },
        }),
      },
    });

    const { result } = renderHook(() => useChat({ stream: true }));

    await act(async () => {
      await result.current.sendMessage("테스트 메시지 보내기");
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].text).toBe("테스트 메시지 보내기");
    expect(result.current.messages[1].text).toBe("hello world");
  }, 10000);

  it("상태 변화: 로딩", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          resolve({
            ok: true,
            json: async () => mockJsonResponse,
          })
        )
    );

    const { result } = renderHook(() => useChat({ stream: false }));

    let loadingPromise: Promise<void>;
    // 비동기 작업 트리거
    act(() => {
      loadingPromise = result.current.sendMessage("테스트 메시지 보내기");
    });

    expect(result.current.isLoading).toBe(true);

    // 비동기 작업 완료 대기
    await act(async () => {
      await loadingPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("상태 변화: 에러", async () => {
    const errorMessage = "❌ 채팅 응답 API 에러";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useChat({ stream: false }));

    await act(async () => {
      await result.current.sendMessage("테스트 메시지 보내기");
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it("localStorage에 대화 내용 저장", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockJsonResponse,
    });

    const { result } = renderHook(() => useChat({ stream: false }));

    await act(async () => {
      await result.current.sendMessage("테스트 메시지 보내기");
    });

    const savedMessages = JSON.parse(
      localStorage.getItem("chat_messages") || "[]"
    );
    expect(savedMessages).toHaveLength(2);
    expect(savedMessages[0].text).toBe("테스트 메시지 보내기");
    expect(savedMessages[1].text).toBe(
      mockJsonResponse.choices[0].message.content
    );
  });

  it("에러 핸들링: 마지막 메시지 재전송", async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error("요청 실패"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockJsonResponse,
      });

    const { result } = renderHook(() => useChat({ stream: false }));

    // 메시지 전송 시도 (실패)
    await act(async () => {
      await result.current.sendMessage("테스트 메시지 보내기").catch(() => {});
    });

    expect(result.current.error).toBe("요청 실패");
    expect(result.current.messages).toHaveLength(1); // 사용자 메시지만 있음

    // 마지막 메시지를 재전송
    await act(async () => {
      await result.current.resendLastMessage();
    });

    // 재전송 후 상태 확인
    expect(result.current.error).toBeNull();
    expect(result.current.messages).toHaveLength(2); // 사용자 메시지 + 응답
    expect(result.current.messages[0].text).toBe("테스트 메시지 보내기"); // 사용자 메시지
    expect(result.current.messages[1].text).toBe(
      mockJsonResponse.choices[0].message.content
    );
  });
});
