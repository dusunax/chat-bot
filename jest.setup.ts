import "@testing-library/jest-dom";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock fetch
global.fetch = jest.fn();

// TextEncoder 모킹
class MockTextEncoder {
  encode(value: string): Uint8Array {
    return new Uint8Array(value.split("").map((c) => c.charCodeAt(0)));
  }
}
global.TextEncoder = MockTextEncoder as unknown as typeof TextEncoder;

// TextDecoder 모킹
class MockTextDecoder {
  decode(value: Uint8Array): string {
    return String.fromCharCode.apply(null, Array.from(value));
  }
}
global.TextDecoder = MockTextDecoder as unknown as typeof TextDecoder;
