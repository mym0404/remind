import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: IntersectionObserverCallback) { MockIntersectionObserver.instances.push(this); }
  trigger() { this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null; rootMargin = ""; thresholds = [];
}

describe("Infinite Scroll Sentinel practice", () => {
  it("observes the sentinel, appends the next page, and cleans up", () => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    const { unmount } = render(<App />);
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const observer = MockIntersectionObserver.instances[0];
    expect(observer.observe).toHaveBeenCalledWith(screen.getByTestId("sentinel"));
    observer.trigger();
    expect(screen.getByText("항목 15")).toBeInTheDocument();
    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
