import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, loadReport } from "./App";

describe("Retryable Fetch practice", () => {
  it("rejects with a user-facing error when loading fails", async () => {
    await expect(loadReport(true)).rejects.toThrow("보고서를 불러오지 못했습니다.");
  });

  it("resolves report data when loading succeeds", async () => {
    await expect(loadReport(false)).resolves.toEqual({ title: "주간 리포트" });
  });

  it("shows loading and then an error with retry action", async () => {
    render(<App />);

    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("불러오기 실패"));
    expect(screen.getByRole("button", { name: "다시 시도" })).toBeInTheDocument();
  });

  it("shows loading again while retrying", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole("button", { name: "다시 시도" });
    await user.click(screen.getByRole("button", { name: "다시 시도" }));

    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
  });

  it("clears the error after a successful retry", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole("button", { name: "다시 시도" });
    await user.click(screen.getByRole("button", { name: "다시 시도" }));

    await waitFor(() => expect(screen.getByText("주간 리포트")).toBeInTheDocument());
    expect(screen.queryByText("불러오기 실패")).not.toBeInTheDocument();
  });
});
