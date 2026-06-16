import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, validateForm } from "./App";

describe("Form Validation Errors practice", () => {
  it("returns field-level validation errors", () => {
    expect(validateForm({ name: "", email: "" })).toEqual({
      name: "이름을 입력하세요.",
      email: "이메일을 입력하세요.",
    });
    expect(validateForm({ name: "민지", email: "wrong" })).toEqual({
      email: "올바른 이메일을 입력하세요.",
    });
  });

  it("renders submitted errors next to their fields", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByText("이름을 입력하세요.")).toBeInTheDocument();
    expect(screen.getByText("이메일을 입력하세요.")).toBeInTheDocument();
  });

  it("connects errors to inputs with aria-describedby", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByLabelText("이름")).toHaveAccessibleDescription("이름을 입력하세요.");
    expect(screen.getByLabelText("이메일")).toHaveAccessibleDescription("이메일을 입력하세요.");
  });

  it("marks invalid fields with aria-invalid", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByLabelText("이름")).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByLabelText("이메일")).toHaveAttribute("aria-invalid", "true");
  });

  it("moves focus to the first invalid field", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByLabelText("이름")).toHaveFocus();
  });

  it("clears errors when submitted values become valid", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "제출" }));
    expect(screen.getByText("이름을 입력하세요.")).toBeInTheDocument();
    expect(screen.getByText("이메일을 입력하세요.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.type(screen.getByLabelText("이메일"), "minji@example.com");
    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.queryByText("이름을 입력하세요.")).not.toBeInTheDocument();
    expect(screen.queryByText("이메일을 입력하세요.")).not.toBeInTheDocument();
  });
});
