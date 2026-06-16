import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const css = readFileSync(resolve(__dirname, "style.css"), "utf8");

describe("Responsive Card Grid practice", () => {
  it("renders the card grid contract", () => {
    render(<App />);
    expect(screen.getByText("Dashboard").closest(".card-grid")).toBeInTheDocument();
  });

  it("uses CSS Grid for the card container", () => {
    expect(css).toMatch(/\.card-grid\s*{[^}]*display:\s*grid/s);
  });

  it("uses repeat with auto-fit or auto-fill", () => {
    expect(css).toMatch(/grid-template-columns:\s*repeat\(auto-(fit|fill),/s);
  });

  it("uses minmax to keep a practical card minimum width", () => {
    expect(css).toMatch(/minmax\(\s*220px\s*,\s*1fr\s*\)/s);
  });
});
