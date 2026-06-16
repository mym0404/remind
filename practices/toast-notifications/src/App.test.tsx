import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App, addToast, removeToast } from "./App";

describe("Toast Notifications practice", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("adds toast entries without replacing the queue", () => {
    expect(addToast(addToast([], "첫 번째"), "두 번째")).toEqual([
      { id: 1, message: "첫 번째" },
      { id: 2, message: "두 번째" },
    ]);
  });

  it("removes a toast by id", () => {
    expect(removeToast([{ id: 1, message: "첫 번째" }], 1)).toEqual([]);
  });

  it("announces toasts through a live region", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "토스트 추가" }));

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("저장했습니다.")).toBeInTheDocument();
  });

  it("supports manual dismiss", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "토스트 추가" }));
    await user.click(screen.getByRole("button", { name: "닫기" }));

    expect(screen.queryByText("저장했습니다.")).not.toBeInTheDocument();
  });

  it("auto removes a toast and cleans its timer", async () => {
		vi.useFakeTimers();
		const clearSpy = vi.spyOn(globalThis, "clearTimeout");
		const { unmount } = render(<App />);

		fireEvent.click(screen.getByRole("button", { name: "토스트 추가" }));
		vi.advanceTimersByTime(3000);
    expect(screen.queryByText("저장했습니다.")).not.toBeInTheDocument();
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
