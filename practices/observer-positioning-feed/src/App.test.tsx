import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App, getFloatingStyle } from "./App";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  disconnect = vi.fn();
}

describe("Observer Positioning Feed practice", () => {
  it("calculates floating coordinates from DOMRect and placement", () => {
    const style = getFloatingStyle({
      placement: "top",
      trigger: new DOMRect(120, 200, 80, 30),
      floating: { width: 160, height: 44 },
    });

    expect(style).toEqual({ top: 148, left: 120 });
  });

  it("loads the next page through IntersectionObserver and cleans up", () => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    const { unmount } = render(<App />);

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    const observer = MockIntersectionObserver.instances[0];

    expect(observer.observe).toHaveBeenCalledWith(screen.getByTestId("sentinel"));
    observer.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      observer as unknown as IntersectionObserver,
    );

    expect(screen.getByText("관찰 항목 18")).toBeInTheDocument();
    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
