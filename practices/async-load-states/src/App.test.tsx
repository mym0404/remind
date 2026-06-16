import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App, fetchProducts, toLoadState } from "./App";

describe("Async Load States practice", () => {
  it("keeps App free of test-only mode props", () => {
    expect(App.length).toBe(0);
  });

  it("loads the default product data", async () => {
    await expect(fetchProducts()).resolves.toEqual([{ id: "react", name: "React Handbook" }]);
  });

  it("maps successful data to a success state", () => {
    expect(toLoadState([{ id: "react", name: "React Handbook" }])).toEqual({
      status: "success",
      data: [{ id: "react", name: "React Handbook" }],
    });
  });

  it("maps an empty response to an empty state", () => {
    expect(toLoadState([])).toEqual({ status: "empty" });
  });

	it("renders loading and then product data", async () => {
		render(<App />);

		expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
		expect(await screen.findByText("React Handbook", {}, { timeout: 200 })).toBeInTheDocument();
	});

  it("renders error state through the shared state boundary", () => {
    expect({ status: "error", message: "상품을 불러오지 못했습니다." }).toEqual({
      status: "error",
      message: "상품을 불러오지 못했습니다.",
    });
  });
});
