import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Checkout Form practice", () => {
  it("validates each field and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "주문 제출" }));

    expect(screen.getByLabelText("이름")).toHaveFocus();
    expect(screen.getByText("이름을 입력하세요.")).toBeInTheDocument();
    expect(screen.getByText("올바른 이메일을 입력하세요.")).toBeInTheDocument();
    expect(screen.getByText("수량은 1 이상이어야 합니다.")).toBeInTheDocument();
    expect(screen.getByText("약관 동의가 필요합니다.")).toBeInTheDocument();
  });

  it("submits a valid order, disables duplicate submit, and resets the form", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "민지");
    await user.type(screen.getByLabelText("이메일"), "minji@example.com");
    await user.clear(screen.getByLabelText("수량"));
    await user.type(screen.getByLabelText("수량"), "3");
    await user.click(screen.getByLabelText("택배"));
    await user.click(screen.getByLabelText("약관에 동의합니다"));
    await user.click(screen.getByRole("button", { name: "주문 제출" }));

    expect(screen.getByRole("button", { name: "주문 제출" })).toBeDisabled();
    expect(await screen.findByText("민지님의 택배 주문 3건을 접수했습니다.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("이름")).toHaveValue("");
    expect(screen.getByLabelText("수량")).toHaveValue("1");
  });
});
