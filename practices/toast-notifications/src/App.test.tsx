import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("Toast Notifications practice", () => {
  it("renders multiple toast messages inside a live region", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "토스트 표시" }));
    fireEvent.click(screen.getByRole("button", { name: "토스트 표시" }));
    expect(screen.getByRole("status")).toHaveTextContent("저장했습니다.");
    expect(screen.getAllByText("저장했습니다.")).toHaveLength(2);
  });

  it("auto-dismisses toasts and supports manual close", async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "토스트 표시" }));
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(screen.queryByText("저장했습니다.")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "토스트 표시" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByText("저장했습니다.")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
