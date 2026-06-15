import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, ThemeProvider, useTheme } from "./App";

const ThemeConsumer = () => {
  const { theme } = useTheme();
  return <span>{theme}</span>;
};

describe("Context Provider Guard practice", () => {
  it("throws a clear error outside the provider", () => {
    expect(() => render(<ThemeConsumer />)).toThrow("useTheme must be used within ThemeProvider");
  });

  it("provides state and actions through the provider", async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><App /></ThemeProvider>);
    expect(screen.getByRole("status")).toHaveTextContent("light");
    await user.click(screen.getByRole("button", { name: "테마 변경" }));
    expect(screen.getByRole("status")).toHaveTextContent("dark");
  });
});
