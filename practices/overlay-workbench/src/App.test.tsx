import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("Overlay Workbench practice", () => {
  it("opens a dialog, moves focus inside, closes with Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(<App />);

    const trigger = screen.getByRole("button", { name: "설정 열기" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "설정" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: "닫기" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("renders toast status messages and removes them after the timer", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    await user.click(screen.getByRole("button", { name: "토스트 표시" }));

    expect(screen.getByRole("status")).toHaveTextContent("저장했습니다.");
    vi.advanceTimersByTime(3000);
    await waitForElementToBeRemoved(() => screen.queryByRole("status"));
    vi.useRealTimers();
  });
});
