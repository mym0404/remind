import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Accessible Autocomplete practice", () => {
  it("uses combobox, listbox, option, aria-controls, and active descendant", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("combobox", { name: "개념 검색" });
    await user.type(input, "react");

    const listbox = screen.getByRole("listbox");
    expect(input).toHaveAttribute("aria-controls", listbox.id);
    expect(screen.getAllByRole("option")).toHaveLength(3);

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", expect.stringContaining("option"));
  });

  it("selects with Enter and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("combobox", { name: "개념 검색" });
    await user.type(input, "query");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(input).toHaveValue("React Query");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "react");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
