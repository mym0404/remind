import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App, canLoadNext, getNextItems } from "./App";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }
  trigger(isIntersecting = true) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
}

describe("Infinite Scroll Sentinel practice", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("creates deterministic page items", () => {
    expect(getNextItems(1, 3)).toEqual(["Item 4", "Item 5", "Item 6"]);
  });

  it("allows loading only when not already loading and more data exists", () => {
    expect(canLoadNext(false, true)).toBe(true);
    expect(canLoadNext(true, true)).toBe(false);
    expect(canLoadNext(false, false)).toBe(false);
  });

  it("observes the sentinel on mount", () => {
    render(<App />);
    expect(MockIntersectionObserver.instances[0].observe).toHaveBeenCalledWith(screen.getByTestId("sentinel"));
  });

  it("appends the next page when the sentinel intersects", () => {
    render(<App />);
    MockIntersectionObserver.instances[0].trigger(true);
    expect(screen.getByText("Item 10")).toBeInTheDocument();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<App />);
    unmount();
    expect(MockIntersectionObserver.instances[0].disconnect).toHaveBeenCalled();
  });
});
