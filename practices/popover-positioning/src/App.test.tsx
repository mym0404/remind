import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, computePopoverPosition } from "./App";

describe("Popover Positioning practice", () => {
  it("places the popover below the trigger by default", () => {
    expect(
      computePopoverPosition(
        { top: 20, left: 40, width: 100, height: 30 },
        { top: 0, left: 0, width: 120, height: 80 },
        { width: 500, height: 500 },
      ),
    ).toEqual({
      top: 50,
      left: 40,
      placement: "bottom",
    });
  });

  it("flips above the trigger when bottom space is not enough", () => {
    expect(
      computePopoverPosition(
        { top: 460, left: 40, width: 100, height: 30 },
        { top: 0, left: 0, width: 120, height: 80 },
        { width: 500, height: 500 },
      ),
    ).toMatchObject({
      top: 380,
      placement: "top",
    });
  });

  it("shifts horizontally to stay inside the viewport", () => {
    expect(
      computePopoverPosition(
        { top: 20, left: 450, width: 60, height: 30 },
        { top: 0, left: 0, width: 120, height: 80 },
        { width: 500, height: 500 },
      ).left,
    ).toBe(380);
  });

  it("clamps the popover to the viewport left edge", () => {
    expect(
      computePopoverPosition(
        { top: 20, left: -20, width: 60, height: 30 },
        { top: 0, left: 0, width: 120, height: 80 },
        { width: 500, height: 500 },
      ).left,
    ).toBe(0);
  });

  it("opens and closes from the trigger", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "필터" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("상태 필터");
    await user.click(screen.getByRole("button", { name: "필터" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "필터" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when clicking outside the popover", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "필터" }));
    await user.click(document.body);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
