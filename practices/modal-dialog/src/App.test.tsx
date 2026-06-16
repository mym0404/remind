import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Modal Dialog practice", () => {
  it("opens an accessible modal dialog", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "모달 열기" }));

    expect(screen.getByRole("dialog", { name: "초대 확인" })).toHaveAttribute("aria-modal", "true");
  });

  it("moves focus to the close button when opened", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "모달 열기" }));

    expect(screen.getByRole("button", { name: "닫기" })).toHaveFocus();
  });

  it("returns focus to the trigger after closing", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "모달 열기" }));
    await user.click(screen.getByRole("button", { name: "닫기" }));

    expect(screen.getByRole("button", { name: "모달 열기" })).toHaveFocus();
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "모달 열기" }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "모달 열기" }));
    fireEvent.mouseDown(screen.getByTestId("modal-backdrop"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
