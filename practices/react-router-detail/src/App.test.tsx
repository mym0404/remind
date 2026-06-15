import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("React Router Detail practice", () => {
  it("navigates from the list to the detail route", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    await user.click(screen.getByRole("link", { name: "Router 기초" }));
    expect(screen.getByRole("heading", { name: "Router 기초" })).toBeInTheDocument();
    expect(screen.getByText("route param")).toBeInTheDocument();
  });

  it("renders a 404 fallback for an unknown id", () => {
    render(<MemoryRouter initialEntries={["/articles/missing"]}><App /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "문서를 찾을 수 없습니다" })).toBeInTheDocument();
  });
});
