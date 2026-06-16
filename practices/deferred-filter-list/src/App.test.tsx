import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, filterItems } from "./App";

describe("Deferred Filter List practice", () => {
  it("filters with trimmed case-insensitive query", () => {
    expect(filterItems(["React", "Router"], "  rout ")).toEqual(["Router"]);
  });

  it("updates input value immediately", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("검색어"), "react");

    expect(screen.getByLabelText("검색어")).toHaveValue("react");
  });

  it("renders filtered results from the deferred query", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("검색어"), "css");

    expect(await screen.findByText("CSS Layout")).toBeInTheDocument();
    expect(screen.queryByText("React Handbook")).not.toBeInTheDocument();
  });

  it("keeps pending UI scoped to the list status", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("검색어"), "router");

    expect(screen.getByRole("status")).toHaveTextContent(/목록/);
  });
});
