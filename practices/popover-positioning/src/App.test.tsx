import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, computePopoverPosition } from "./App";

describe("Popover Positioning practice", () => {
  it("flips from bottom to top when the popover would leave the viewport", () => {
    expect(computePopoverPosition({
      preferredPlacement: "bottom",
      offset: 8,
      triggerRect: { top: 170, right: 180, bottom: 190, left: 120, width: 60, height: 20 },
      floatingRect: { width: 160, height: 80 },
      viewportRect: { top: 0, right: 240, bottom: 220, left: 0, width: 240, height: 220 },
    })).toEqual({ top: 82, left: 80, placement: "top" });
  });

  it("opens and closes with outside click and Escape", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "필터" }));
    expect(screen.getByRole("dialog", { name: "필터 옵션" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
