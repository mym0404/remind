import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, searchProducts, shouldApplyResponse } from "./App";

const createDeferred = <Value,>() => {
  let resolve!: (value: Value) => void;
  const promise = new Promise<Value>((nextResolve) => {
    resolve = nextResolve;
  });

  return { promise, resolve };
};

describe("Stale Response Guard practice", () => {
  it("resolves search results for the query", async () => {
    await expect(searchProducts("react")).resolves.toEqual(["react result"]);
  });

  it("applies only the latest response id", () => {
    expect(shouldApplyResponse(2, 2)).toBe(true);
    expect(shouldApplyResponse(1, 2)).toBe(false);
  });

  it("searches when the query changes", async () => {
    const user = userEvent.setup();
    const searchedQueries: string[] = [];
    const search = (query: string) => {
      searchedQueries.push(query);
      return Promise.resolve([`${query} result`]);
    };

    render(<App search={search} />);

    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "go");

    expect(searchedQueries).toEqual(["react", "", "g", "go"]);
  });

  it("keeps input responsive while loading", async () => {
    const user = userEvent.setup();
    const pendingSearch = () => new Promise<string[]>(() => {});

    render(<App search={pendingSearch} />);

    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "router");

    expect(screen.getByLabelText("검색어")).toHaveValue("router");
    expect(screen.getByRole("status")).toHaveTextContent("검색 중");
  });

  it("does not let an older response replace the latest result", async () => {
    const user = userEvent.setup();
    const responses = new Map<string, ReturnType<typeof createDeferred<string[]>>>();
    const search = (query: string) => {
      const response = createDeferred<string[]>();
      responses.set(query, response);
      return response.promise;
    };

    render(<App search={search} />);

    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "slow");
    await user.clear(screen.getByLabelText("검색어"));
    await user.type(screen.getByLabelText("검색어"), "fast");

    await act(async () => {
      responses.get("fast")?.resolve(["fast result"]);
    });

    await waitFor(() => expect(screen.getByText("fast result")).toBeInTheDocument());

    await act(async () => {
      responses.get("slow")?.resolve(["slow result"]);
    });

    expect(screen.queryByText("slow result")).not.toBeInTheDocument();
  });
});
