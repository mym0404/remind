import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, validateProfile } from "./App";

describe("Form Validation Errors practice", () => {
  it("returns field errors from the validation function", () => {
    expect(validateProfile({ name: "", email: "bad" })).toEqual({
      name: "이름을 입력하세요.",
      email: "올바른 이메일을 입력하세요.",
    });
  });

  it("renders accessible field errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "저장" }));

    expect(screen.getByLabelText("이름")).toHaveFocus();
    expect(screen.getByLabelText("이름")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("이름")).toHaveAccessibleDescription("이름을 입력하세요.");
    expect(screen.getByText("올바른 이메일을 입력하세요.")).toBeInTheDocument();
  });
});
