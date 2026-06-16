import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App, cards } from "./App";
import * as AppModule from "./App";

const css = readFileSync(resolve(__dirname, "style.css"), "utf8");

describe("Responsive Card Grid practice", () => {
  it("renders every card inside the card grid", () => {
    render(<App />);
    for (const card of cards) {
      expect(screen.getByText(card).closest(".card-grid")).toBeInTheDocument();
    }
  });

  it("uses named exports only", () => {
    expect(AppModule).not.toHaveProperty("default");
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

  it("does not use a fixed three-column grid", () => {
    expect(css).not.toMatch(/grid-template-columns:\s*repeat\(\s*3\s*,/s);
    expect(css).not.toMatch(/grid-template-columns:\s*1fr\s+1fr\s+1fr\s*;/s);
  });
});
