import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Async Product Search practice", () => {
  it("debounces the query and renders loading, data, and empty states", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("검색어"), "react");

    expect(screen.getByRole("status")).toHaveTextContent("검색 중");
    await waitForElementToBeRemoved(() => screen.queryByText("검색 중"));
    expect(screen.getByText("React Handbook")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "nothing");

    expect(await screen.findByText("검색 결과가 없습니다.")).toBeInTheDocument();
  });

  it("ignores stale responses when the query changes quickly", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("검색어"), "slow");
    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "router");

    expect(await screen.findByText("Router Lab")).toBeInTheDocument();
    expect(screen.queryByText("Slow Legacy Result")).not.toBeInTheDocument();
  });
});
