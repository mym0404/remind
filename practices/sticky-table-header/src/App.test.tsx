import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const css = readFileSync(resolve(__dirname, "style.css"), "utf8");

describe("Sticky Table Header practice", () => {
  it("renders a scroll container around the table", () => {
    render(<App />);
    expect(screen.getByRole("table").closest(".table-scroll")).toBeInTheDocument();
  });

  it("makes the table wrapper scrollable", () => {
    expect(css).toMatch(/\.table-scroll\s*{[^}]*overflow:\s*auto/s);
  });

  it("sticks table header cells to the top", () => {
    expect(css).toMatch(/thead\s+th\s*{[^}]*position:\s*sticky/s);
    expect(css).toMatch(/thead\s+th\s*{[^}]*top:\s*0/s);
  });

  it("sets a header background so rows do not show through", () => {
    expect(css).toMatch(/thead\s+th\s*{[^}]*background:\s*#[0-9a-fA-F]{6}/s);
  });
});
