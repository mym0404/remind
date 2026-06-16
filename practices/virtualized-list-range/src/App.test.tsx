import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App, getVisibleRange } from "./App";

describe("Virtualized List Range practice", () => {
  it("calculates a visible range from scroll position", () => {
    expect(getVisibleRange({ scrollTop: 90, viewportHeight: 120, rowHeight: 30, itemCount: 100, overscan: 0 })).toEqual({
      start: 3,
      end: 7,
      beforeHeight: 90,
      afterHeight: 2790,
    });
  });

  it("applies overscan around the visible range", () => {
    expect(getVisibleRange({ scrollTop: 90, viewportHeight: 120, rowHeight: 30, itemCount: 100, overscan: 2 })).toMatchObject({
      start: 1,
      end: 9,
    });
  });

  it("clamps the range at the list boundaries", () => {
    expect(getVisibleRange({ scrollTop: 0, viewportHeight: 120, rowHeight: 30, itemCount: 5, overscan: 10 })).toMatchObject({
      start: 0,
      end: 5,
    });
  });

  it("does not render every row", () => {
    render(<App />);
    expect(screen.queryByText("Row 1000")).not.toBeInTheDocument();
  });

  it("renders spacer elements for offscreen rows", () => {
    render(<App />);
    expect(screen.getByTestId("before-spacer")).toBeInTheDocument();
    expect(screen.getByTestId("after-spacer")).toBeInTheDocument();
  });
});
