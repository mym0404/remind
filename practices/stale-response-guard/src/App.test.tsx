import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, searchProducts, shouldApplyResponse } from "./App";

describe("Stale Response Guard practice", () => {
  it("resolves search results for the query", async () => {
    await expect(searchProducts("react")).resolves.toEqual(["react result"]);
  });

  it("applies only the latest response id", () => {
    expect(shouldApplyResponse(2, 2)).toBe(true);
    expect(shouldApplyResponse(1, 2)).toBe(false);
  });

  it("keeps input responsive while loading", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "router");

    expect(screen.getByLabelText("검색어")).toHaveValue("router");
    expect(screen.getByRole("status")).toHaveTextContent("검색 중");
  });

  it("does not let an older response replace the latest result", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "slow");
    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "fast");

    await waitFor(() => expect(screen.getByText("fast result")).toBeInTheDocument());
    expect(screen.queryByText("slow result")).not.toBeInTheDocument();
  });
});
