import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App, useDebounce } from "./App";

describe("Debounced Search practice", () => {
  it("updates the debounced value only after the delay", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: "r" } });
    rerender({ value: "router" });
    expect(result.current).toBe("r");
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe("r");
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("router");
    vi.useRealTimers();
  });

  it("keeps typing immediate while the result waits for the debounced value", async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.change(screen.getByLabelText("검색어"), { target: { value: "router" } });
    expect(screen.getByLabelText("검색어")).toHaveValue("router");
    expect(screen.getByRole("status")).toHaveTextContent("대기");
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("status")).toHaveTextContent("router");
    vi.useRealTimers();
  });
});
