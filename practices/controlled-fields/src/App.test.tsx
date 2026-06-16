import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, formatPreview, initialForm, resetForm, updateFormField } from "./App";

describe("Controlled Fields practice", () => {
  it("formats the live preview from the current form state", () => {
    expect(
      formatPreview({ name: "민지", email: "minji@example.com", role: "backend", terms: true }),
    ).toBe("민지 / minji@example.com / backend / 약관 동의");
    expect(formatPreview(initialForm)).toBe("입력 대기");
  });

  it("updates one field without dropping the rest of the form state", () => {
    const nextForm = updateFormField(
      { name: "민지", email: "old@example.com", role: "frontend", terms: false },
      "email",
      "minji@example.com",
    );

    expect(nextForm).toEqual({
      name: "민지",
      email: "minji@example.com",
      role: "frontend",
      terms: false,
    });
  });

  it("updates text fields and the preview together", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.type(screen.getByLabelText("이메일"), "minji@example.com");

    expect(screen.getByLabelText("이름")).toHaveValue("민지");
    expect(screen.getByLabelText("이메일")).toHaveValue("minji@example.com");
    expect(screen.getByRole("status")).toHaveTextContent(
      "민지 / minji@example.com / frontend / 약관 미동의",
    );
  });

  it("controls the role select and terms checkbox", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText("역할"), "backend");
    await user.click(screen.getByLabelText("약관에 동의합니다"));

    expect(screen.getByLabelText("역할")).toHaveValue("backend");
    expect(screen.getByLabelText("약관에 동의합니다")).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent(
      "이름 없음 / 이메일 없음 / backend / 약관 동의",
    );
  });

  it("keeps controlled inputs writable after repeated edits", async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByLabelText("이메일");
    await user.type(emailInput, "first@example.com");
    await user.clear(emailInput);
    await user.type(emailInput, "second@example.com");

    expect(emailInput).toHaveValue("second@example.com");
  });

  it("returns the initial form state on reset", () => {
    expect(
      resetForm({ name: "민지", email: "minji@example.com", role: "designer", terms: true }),
    ).toEqual(initialForm);
  });

  it("resets every field and preview together", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.type(screen.getByLabelText("이메일"), "minji@example.com");
    await user.selectOptions(screen.getByLabelText("역할"), "designer");
    await user.click(screen.getByLabelText("약관에 동의합니다"));

    expect(screen.getByRole("status")).toHaveTextContent(
      "민지 / minji@example.com / designer / 약관 동의",
    );

    await user.click(screen.getByRole("button", { name: "초기화" }));

    expect(screen.getByLabelText("이름")).toHaveValue("");
    expect(screen.getByLabelText("이메일")).toHaveValue("");
    expect(screen.getByLabelText("역할")).toHaveValue("frontend");
    expect(screen.getByLabelText("약관에 동의합니다")).not.toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("입력 대기");
  });
});
