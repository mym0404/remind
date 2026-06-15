import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const css = fs.readFileSync(path.join(process.cwd(), "src", "style.css"), "utf8");

describe("Sticky Table Header practice", () => {
  it("renders a table inside a scroll shell", () => {
    render(<App />);
    expect(screen.getByRole("table").parentElement).toHaveClass("table-shell");
  });

  it("makes header cells sticky within the scroll shell", () => {
    expect(css).toMatch(/\.table-shell\s*{[^}]*overflow:\s*auto/s);
    expect(css).toMatch(/th\s*{[^}]*position:\s*sticky[^}]*top:\s*0/s);
  });
});
