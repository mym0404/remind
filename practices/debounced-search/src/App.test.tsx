import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App, searchProducts } from "./App";

describe("Debounced Search practice", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("filters products case-insensitively with trimmed query", () => {
    expect(searchProducts("  router ")).toEqual(["Router Patterns"]);
  });

  it("updates the input immediately but delays the search basis", async () => {
		vi.useFakeTimers();
		render(<App />);

		fireEvent.change(screen.getByLabelText("검색어"), { target: { value: "router" } });

    expect(screen.getByLabelText("검색어")).toHaveValue("router");
    expect(screen.getByRole("status")).toHaveTextContent("검색 기준: 전체");
    vi.advanceTimersByTime(299);
    expect(screen.getByRole("status")).toHaveTextContent("검색 기준: 전체");
    vi.advanceTimersByTime(1);
    expect(screen.getByRole("status")).toHaveTextContent("검색 기준: router");
  });

  it("uses only the last value typed inside the debounce window", async () => {
		vi.useFakeTimers();
		render(<App />);

		fireEvent.change(screen.getByLabelText("검색어"), { target: { value: "react" } });
		fireEvent.change(screen.getByLabelText("검색어"), { target: { value: "css" } });
    vi.advanceTimersByTime(300);

    expect(screen.getByRole("status")).toHaveTextContent("검색 기준: css");
    expect(screen.getByText("CSS Layout")).toBeInTheDocument();
    expect(screen.queryByText("React Handbook")).not.toBeInTheDocument();
  });

  it("cleans pending timers when unmounted", async () => {
		vi.useFakeTimers();
		const clearSpy = vi.spyOn(globalThis, "clearTimeout");
		const { unmount } = render(<App />);

		fireEvent.change(screen.getByLabelText("검색어"), { target: { value: "react" } });
    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
