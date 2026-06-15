import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useThrottle } from "./App";

describe("Throttled Input practice", () => {
  it("keeps the first value during the throttle interval", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 500), { initialProps: { value: "a" } });
    rerender({ value: "ab" });
    rerender({ value: "abc" });
    expect(result.current).toBe("a");
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("abc");
    vi.useRealTimers();
  });

  it("does not schedule multiple trailing updates", () => {
    vi.useFakeTimers();
    const { rerender } = renderHook(({ value }) => useThrottle(value, 500), { initialProps: { value: "one" } });
    rerender({ value: "two" });
    rerender({ value: "three" });
    expect(vi.getTimerCount()).toBe(1);
    vi.useRealTimers();
  });
});
