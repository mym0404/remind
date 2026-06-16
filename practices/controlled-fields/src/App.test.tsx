import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, formatPreview, initialForm } from "./App";

describe("Controlled Fields practice", () => {
  it("formats the preview from a single form state object", () => {
    expect(formatPreview({ name: "민지", email: "minji@example.com", role: "backend", agreed: true })).toBe(
      "민지 / minji@example.com / backend / 동의",
    );
    expect(formatPreview(initialForm)).toBe("입력 대기");
  });

  it("updates text, select, and checkbox fields as controlled inputs", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.type(screen.getByLabelText("이메일"), "minji@example.com");
    await user.selectOptions(screen.getByLabelText("역할"), "backend");
    await user.click(screen.getByLabelText("약관에 동의합니다"));

    expect(screen.getByRole("status")).toHaveTextContent("민지 / minji@example.com / backend / 동의");
  });

  it("keeps inputs writable after repeated edits", async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByLabelText("이메일");
    await user.type(emailInput, "first@example.com");
    await user.clear(emailInput);
    await user.type(emailInput, "second@example.com");

    expect(emailInput).toHaveValue("second@example.com");
  });

  it("resets every field and preview together", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.type(screen.getByLabelText("이메일"), "minji@example.com");
    await user.selectOptions(screen.getByLabelText("역할"), "designer");
    await user.click(screen.getByLabelText("약관에 동의합니다"));
    await user.click(screen.getByRole("button", { name: "초기화" }));

    expect(screen.getByLabelText("이름")).toHaveValue("");
    expect(screen.getByLabelText("이메일")).toHaveValue("");
    expect(screen.getByLabelText("역할")).toHaveValue("frontend");
    expect(screen.getByLabelText("약관에 동의합니다")).not.toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("입력 대기");
  });
});
