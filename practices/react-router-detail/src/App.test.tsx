import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App, findArticle } from "./App";

describe("React Router Detail practice", () => {
  it("finds article data by route id", () => {
    expect(findArticle("react")).toMatchObject({ title: "React Handbook" });
    expect(findArticle("missing")).toBeUndefined();
  });

  it("renders the list route", () => {
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);

    expect(screen.getByRole("link", { name: "React Handbook" })).toHaveAttribute("href", "/articles/react");
  });

  it("renders detail content from route params", () => {
    render(<MemoryRouter initialEntries={["/articles/router"]}><App /></MemoryRouter>);

    expect(screen.getByRole("heading", { name: "Router Patterns" })).toBeInTheDocument();
    expect(screen.getByText("URL과 화면을 연결합니다.")).toBeInTheDocument();
  });

  it("renders a 404 fallback for an unknown id", () => {
    render(<MemoryRouter initialEntries={["/articles/missing"]}><App /></MemoryRouter>);

    expect(screen.getByRole("alert")).toHaveTextContent("문서를 찾을 수 없습니다.");
  });

  it("navigates from list to detail through links", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);

    await user.click(screen.getByRole("link", { name: "React Handbook" }));

    expect(screen.getByRole("heading", { name: "React Handbook" })).toBeInTheDocument();
  });
});
