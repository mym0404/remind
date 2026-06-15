import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Stale Response Guard practice", () => {
  it("keeps only the latest response on screen", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("검색어"), "slow");
    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "fast");
    expect(await screen.findByText("fast result")).toBeInTheDocument();
    expect(screen.queryByText("slow result")).not.toBeInTheDocument();
  });

  it("shows loading without blocking the input value", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("검색어"), "fast");
    expect(screen.getByLabelText("검색어")).toHaveValue("fast");
    expect(screen.getByRole("status")).toHaveTextContent("검색 중");
  });
});
