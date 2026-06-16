import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, clampPage, getPageItems, getTotalPages } from "./App";

describe("Pagination Controls practice", () => {
  it("slices items for the current page", () => {
    expect(getPageItems(["a", "b", "c", "d"], 2, 2)).toEqual(["c", "d"]);
  });

  it("calculates total pages", () => {
    expect(getTotalPages(12, 5)).toBe(3);
  });

  it("clamps page when page size changes", () => {
    expect(clampPage(3, 2)).toBe(2);
  });

  it("disables previous button on the first page", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "이전" })).toBeDisabled();
  });

  it("moves next and disables next on the last page", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "다음" }));
    await user.click(screen.getByRole("button", { name: "다음" }));

    expect(screen.getByRole("status")).toHaveTextContent("3 / 3");
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("updates visible items when page size changes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText("페이지 크기"), "10");

    expect(screen.getByText("Item 10")).toBeInTheDocument();
    expect(screen.queryByText("Item 11")).not.toBeInTheDocument();
  });
});
