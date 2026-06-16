import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, clampPage, getPageItems, getTotalPages } from "./App";

describe("Pagination Controls practice", () => {
  it("returns only remaining items on the last page", () => {
    expect(getPageItems(["a", "b", "c", "d", "e"], 3, 2)).toEqual(["e"]);
  });

  it("calculates total pages", () => {
    expect(getTotalPages(12, 5)).toBe(3);
  });

  it("clamps page to valid boundaries", () => {
    expect(clampPage(0, 2)).toBe(1);
    expect(clampPage(3, 2)).toBe(2);
  });

  it("shows the first page with previous disabled", () => {
    render(<App />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 6")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이전" })).toBeDisabled();
  });

  it("moves to the last page and disables next", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "다음" }));
    await user.click(screen.getByRole("button", { name: "다음" }));

    expect(screen.getByRole("status")).toHaveTextContent("3 / 3");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Item 12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("clamps the current page when page size changes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "다음" }));
    await user.click(screen.getByRole("button", { name: "다음" }));
    await user.selectOptions(screen.getByLabelText("페이지 크기"), "10");

    expect(screen.getByRole("status")).toHaveTextContent("2 / 2");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Item 12")).toBeInTheDocument();
  });
});
