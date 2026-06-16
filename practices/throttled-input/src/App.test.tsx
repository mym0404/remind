import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("Throttled Input practice", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("updates the raw input immediately", async () => {
		vi.useFakeTimers();
		render(<App />);

		fireEvent.change(screen.getByLabelText("메시지"), { target: { value: "abc" } });

    expect(screen.getByLabelText("메시지")).toHaveValue("abc");
  });

  it("does not publish every value inside the throttle interval", async () => {
		vi.useFakeTimers();
		render(<App />);

		fireEvent.change(screen.getByLabelText("메시지"), { target: { value: "abc" } });

    expect(screen.getByRole("status")).not.toHaveTextContent("처리 값: abc");
    vi.advanceTimersByTime(499);
    expect(screen.getByRole("status")).not.toHaveTextContent("처리 값: abc");
  });

  it("publishes the trailing value after the interval", async () => {
		vi.useFakeTimers();
		render(<App />);

		fireEvent.change(screen.getByLabelText("메시지"), { target: { value: "abc" } });
    vi.advanceTimersByTime(500);

    expect(screen.getByRole("status")).toHaveTextContent("처리 값: abc");
  });

  it("cleans the trailing timer on unmount", async () => {
		vi.useFakeTimers();
		const clearSpy = vi.spyOn(globalThis, "clearTimeout");
		const { unmount } = render(<App />);

		fireEvent.change(screen.getByLabelText("메시지"), { target: { value: "abc" } });
    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
