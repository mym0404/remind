import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App, addToast, removeToast } from "./App";

describe("Toast Notifications practice", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("adds toast entries without replacing the queue", () => {
    expect(addToast([{ id: 2, message: "첫 번째" }], "두 번째")).toEqual([
      { id: 2, message: "첫 번째" },
      { id: 3, message: "두 번째" },
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

  it("keeps multiple visible toasts in the queue", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "토스트 추가" }));
    await user.click(screen.getByRole("button", { name: "토스트 추가" }));

    expect(screen.getAllByText("저장했습니다.")).toHaveLength(2);
  });

  it("dismisses one toast without removing the others", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "토스트 추가" }));
    await user.click(screen.getByRole("button", { name: "토스트 추가" }));
    await user.click(screen.getAllByRole("button", { name: "닫기" })[0]);

    expect(screen.getAllByText("저장했습니다.")).toHaveLength(1);
  });

  it("auto removes a toast after the delay", () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "토스트 추가" }));
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("저장했습니다.")).not.toBeInTheDocument();
  });

  it("cleans up pending timers on unmount", () => {
    vi.useFakeTimers();
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "토스트 추가" }));
    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
