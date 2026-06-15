import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, getPageItems } from "./App";

describe("Pagination Controls practice", () => {
  it("slices items by page and page size", () => {
    expect(getPageItems(["a", "b", "c", "d"], 2, 2)).toEqual(["c", "d"]);
  });

  it("updates page controls and disabled states", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole("button", { name: "이전" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "다음" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 / 3");
    expect(screen.getByText("항목 6")).toBeInTheDocument();
  });
});
