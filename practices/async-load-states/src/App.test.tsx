import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App, fetchProducts } from "./App";

describe("Async Load States practice", () => {
  it("renders loading and then product data", async () => {
    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
    await waitForElementToBeRemoved(() => screen.queryByText("불러오는 중"));
    expect(screen.getByText("React Handbook")).toBeInTheDocument();
  });

  it("treats an empty response as an empty state", async () => {
    await expect(fetchProducts("empty")).resolves.toEqual([]);
    render(<App />);
    expect(await screen.findByText("상품이 없습니다.")).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    await expect(fetchProducts("error")).rejects.toThrow("network");
  });
});
