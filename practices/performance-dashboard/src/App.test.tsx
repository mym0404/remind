import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, getVisibleRange } from "./App";

describe("Performance Dashboard practice", () => {
  it("calculates a virtualized visible range with overscan", () => {
    expect(
      getVisibleRange({
        scrollTop: 120,
        rowHeight: 30,
        viewportHeight: 90,
        total: 100,
        overscan: 2,
      }),
    ).toEqual({ start: 2, end: 9 });
  });

  it("keeps typing responsive while the filtered list updates", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Metric 검색"), "1999");

    expect(screen.getByLabelText("Metric 검색")).toHaveValue("1999");
    expect(screen.getByRole("status")).toHaveTextContent("1개 표시");
    expect(screen.getByText("Metric 1999")).toBeInTheDocument();
  });
});
