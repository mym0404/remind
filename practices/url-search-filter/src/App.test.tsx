import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App, filterProducts } from "./App";

describe("URL Search Filter practice", () => {
	beforeEach(() => {
		window.history.pushState({}, "", "/");
	});

	it("filters products with a trimmed case-insensitive query", () => {
		expect(filterProducts(["React", "Router"], "  ROUT ")).toEqual(["Router"]);
	});

	it("reads the initial query string into the input and result list", () => {
		window.history.pushState({}, "", "/?q=router");
		render(<BrowserRouter><App /></BrowserRouter>);

    expect(screen.getByLabelText("검색어")).toHaveValue("router");
    expect(screen.getByText("Router Patterns")).toBeInTheDocument();
    expect(screen.queryByText("React Handbook")).not.toBeInTheDocument();
  });

	it("updates the query string when the input changes", async () => {
		const user = userEvent.setup();
		render(<BrowserRouter><App /></BrowserRouter>);

    await user.type(screen.getByLabelText("검색어"), "css");

    expect(window.location.search).toBe("?q=css");
  });

	it("filters the result list when the input changes", async () => {
		const user = userEvent.setup();
		render(<BrowserRouter><App /></BrowserRouter>);

    await user.type(screen.getByLabelText("검색어"), "css");

    expect(screen.getByText("CSS Layout")).toBeInTheDocument();
    expect(screen.queryByText("React Handbook")).not.toBeInTheDocument();
  });

	it("removes the query param when the input is cleared", async () => {
		const user = userEvent.setup();
		window.history.pushState({}, "", "/?q=react");
		render(<BrowserRouter><App /></BrowserRouter>);

    await user.clear(screen.getByLabelText("검색어"));

    expect(window.location.search).toBe("");
  });
});
