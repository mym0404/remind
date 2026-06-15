import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("URL Search Filter practice", () => {
  it("restores the input value from the query string", () => {
    render(<MemoryRouter initialEntries={["/?q=router"]}><App /></MemoryRouter>);
    expect(screen.getByLabelText("검색어")).toHaveValue("router");
    expect(screen.getByText("Router")).toBeInTheDocument();
    expect(screen.queryByText("Debounce")).not.toBeInTheDocument();
  });

  it("updates the search params as the input changes", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    await user.type(screen.getByLabelText("검색어"), "debounce");
    expect(screen.getByTestId("current-url")).toHaveTextContent("q=debounce");
  });
});
