import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeProvider, useTheme, App } from "./App";

const Probe = () => {
  const { theme, toggleTheme } = useTheme();
  return <button type="button" onClick={toggleTheme}>{theme}</button>;
};

describe("Context Provider Guard practice", () => {
  it("throws a clear error outside ThemeProvider", () => {
    expect(() => render(<Probe />)).toThrow("useTheme must be used within ThemeProvider");
  });

  it("provides the default theme inside ThemeProvider", () => {
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
  });

  it("toggles theme through context", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "테마 변경" }));

    expect(screen.getByRole("status")).toHaveTextContent("dark");
  });

  it("keeps the context value stable across unrelated rerenders", () => {
    const values: unknown[] = [];
    const Collector = () => {
      values.push(useTheme());
      return null;
    };
    const { rerender } = render(<ThemeProvider><Collector /></ThemeProvider>);
    rerender(<ThemeProvider><Collector /></ThemeProvider>);

    expect(values[0]).toBe(values[1]);
  });
});
