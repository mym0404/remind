import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, fetchReport } from "./App";

describe("Retryable Fetch practice", () => {
  it("exposes a failing mock request for the error branch", async () => {
    await expect(fetchReport(true)).rejects.toThrow("보고서를 불러오지 못했습니다.");
  });

  it("renders an error and retries the same request", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "불러오기" }));
    expect(await screen.findByText("보고서를 불러오지 못했습니다.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "다시 시도" }));
    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
    expect(await screen.findByText("6월 리포트")).toBeInTheDocument();
  });
});
