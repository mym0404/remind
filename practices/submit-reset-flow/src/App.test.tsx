import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App, submitMessage } from "./App";

describe("Submit Reset Flow practice", () => {
  it("trims and resolves the submitted message", async () => {
    await expect(submitMessage("  배포 준비  ")).resolves.toEqual({ savedMessage: "배포 준비" });
  });

  it("disables submit while the async request is pending", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("메시지"), "배포 준비");
    await user.click(screen.getByRole("button", { name: "저장" }));

    expect(screen.getByRole("button", { name: "저장" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("저장 중");
  });

  it("prevents duplicate submissions while pending", async () => {
    const user = userEvent.setup();
    render(<App />);
    const submitButton = screen.getByRole("button", { name: "저장" });

    await user.type(screen.getByLabelText("메시지"), "배포 준비");
    await user.dblClick(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it("shows success and resets the input after a successful submit", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("메시지"), "배포 준비");
    await user.click(screen.getByRole("button", { name: "저장" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 완료"));
    expect(screen.getByLabelText("메시지")).toHaveValue("");
  });

  it("keeps the input when submission fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("메시지"), "fail");
    await user.click(screen.getByRole("button", { name: "저장" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("저장 실패"));
    expect(screen.getByLabelText("메시지")).toHaveValue("fail");
  });
});
