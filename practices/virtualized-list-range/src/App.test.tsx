import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App, getVisibleRange } from "./App";

describe("Virtualized List Range practice", () => {
  it("calculates the visible range with overscan", () => {
    expect(getVisibleRange({ scrollTop: 120, viewportHeight: 90, rowHeight: 30, itemCount: 100, overscan: 2 })).toEqual({ start: 2, end: 9 });
  });

  it("renders only the rows in the visible range", () => {
    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("렌더링 12개 이하");
    expect(screen.queryByText("Row 1999")).not.toBeInTheDocument();
  });
});
