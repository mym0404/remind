import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Submit Reset Flow practice", () => {
  it("disables duplicate submits while saving and shows the success message", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("제목"), "배포 준비");
    await user.click(screen.getByRole("button", { name: "저장" }));
    expect(screen.getByRole("button", { name: "저장" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("저장 중");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("배포 준비 저장 완료"));
  });

  it("resets input and status together", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("제목"), "회고 작성");
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("제목")).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("대기 중");
  });
});
