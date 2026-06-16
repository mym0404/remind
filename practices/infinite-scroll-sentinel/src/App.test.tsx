import { render, screen } from "@testing-library/react";
import { act, useRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App, canLoadNext, getNextItems, useIntersectionObserver } from "./App";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }
  trigger(isIntersecting = true) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
}

const runPendingLoad = () => {
  act(() => {
    vi.runOnlyPendingTimers();
  });
};

describe("Infinite Scroll Sentinel practice", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.useFakeTimers();
  });

  it("creates deterministic page items", () => {
    expect(getNextItems(1, 3)).toEqual(["Item 4", "Item 5", "Item 6"]);
  });

  it("allows loading only when not already loading and more data exists", () => {
    expect(canLoadNext(false, true)).toBe(true);
    expect(canLoadNext(true, true)).toBe(false);
    expect(canLoadNext(false, false)).toBe(false);
  });

  it("observes the sentinel ref on mount", () => {
    render(<App />);
    expect(MockIntersectionObserver.instances[0].observe).toHaveBeenCalledWith(
      screen.getByTestId("sentinel"),
    );
  });

  it("calls the hook callback only when the sentinel intersects", () => {
    const onIntersect = vi.fn();

    const HookProbe = () => {
      const sentinelRef = useRef<HTMLDivElement>(null);
      useIntersectionObserver({ sentinelRef, onIntersect });

      return <div ref={sentinelRef} data-testid="probe" />;
    };

    render(<HookProbe />);
    MockIntersectionObserver.instances[0].trigger(false);
    MockIntersectionObserver.instances[0].trigger(true);

    expect(onIntersect).toHaveBeenCalledTimes(1);
  });

  it("appends the next page when the sentinel intersects through the hook", () => {
    render(<App />);
    MockIntersectionObserver.instances[0].trigger(true);
    runPendingLoad();

    expect(screen.getByText("Item 10")).toBeInTheDocument();
  });

  it("does not append duplicate pages while loading", () => {
    render(<App />);
    MockIntersectionObserver.instances[0].trigger(true);
    MockIntersectionObserver.instances[0].trigger(true);
    runPendingLoad();

    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    expect(screen.queryByText("Item 15")).not.toBeInTheDocument();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(<App />);
    unmount();
    expect(MockIntersectionObserver.instances[0].disconnect).toHaveBeenCalled();
  });
});
