import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";

const TestComponent = () => {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("컴포넌트 랜더링", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("stream-toggle")).toBeInTheDocument();
  });

  it("토글: 다크 모드", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("theme-toggle");

    // 초기 상태
    expect(screen.getByTestId("theme-toggle-light")).toBeInTheDocument();

    // 첫 번째 토글
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("theme-toggle-dark")).toBeInTheDocument();

    // 두 번째 토글
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("theme-toggle-light")).toBeInTheDocument();
  });

  it("토글: 스트림 모드", () => {
    render(<TestComponent />);

    const toggleButton = screen.getByTestId("stream-toggle");

    // 초기 상태
    expect(screen.getByTestId("stream-toggle-single")).toBeInTheDocument();

    // 첫 번째 토글
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("stream-toggle-stream")).toBeInTheDocument();

    // 두 번째 토글
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("stream-toggle-single")).toBeInTheDocument();
  });

  it("localStorage 테스트", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // 토글 테스트
    fireEvent.click(screen.getByTestId("theme-toggle"));
    fireEvent.click(screen.getByTestId("stream-toggle"));

    // localStorage 확인
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(localStorage.getItem("isStream")).toBe("true");
  });
});
