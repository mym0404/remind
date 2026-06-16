import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App, fetchProducts, productLoader, toLoadState } from "./App";

describe("Async Load States practice", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps App free of test-only mode props", () => {
    expect(App.length).toBe(0);
  });

  it("loads the default product data", async () => {
    await expect(fetchProducts()).resolves.toEqual([{ id: "react", name: "React Handbook" }]);
  });

  it("maps product responses to load states", () => {
    expect(toLoadState([{ id: "react", name: "React Handbook" }])).toEqual({
      status: "success",
      data: [{ id: "react", name: "React Handbook" }],
    });
    expect(toLoadState([])).toEqual({ status: "empty" });
  });

  it("renders loading and then product data", async () => {
    render(<App />);

    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
    expect(await screen.findByText("React Handbook", {}, { timeout: 200 })).toBeInTheDocument();
  });

  it("renders the empty state when the loader returns no products", async () => {
    vi.spyOn(productLoader, "fetchProducts").mockResolvedValue([]);

    render(<App />);

    expect(await screen.findByText("상품이 없습니다.")).toBeInTheDocument();
  });

  it("renders an error and ends loading when the loader fails", async () => {
    vi.spyOn(productLoader, "fetchProducts").mockRejectedValue(new Error("Network error"));

    render(<App />);

    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
    expect(await screen.findByRole("alert")).toHaveTextContent("상품을 불러오지 못했습니다.");
    await waitFor(() => expect(screen.queryByText("불러오는 중")).not.toBeInTheDocument());
  });
});
