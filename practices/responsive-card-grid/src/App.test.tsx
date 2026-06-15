import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const css = fs.readFileSync(path.join(process.cwd(), "src", "style.css"), "utf8");

describe("Responsive Card Grid practice", () => {
  it("renders cards inside the grid container", () => {
    render(<App />);
    expect(screen.getByText("React").parentElement).toHaveClass("card-grid");
  });

  it("uses an intrinsic responsive grid", () => {
    expect(css).toMatch(/grid-template-columns:\s*repeat\(auto-(fit|fill),\s*minmax\(min\(100%,\s*220px\),\s*1fr\)\)/);
  });
});
