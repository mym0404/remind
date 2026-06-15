import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const css = fs.readFileSync(path.join(process.cwd(), "src", "style.css"), "utf8");

describe("Scrollable Panel Layout practice", () => {
  it("renders a header and an internal scroll list", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Scrollable Panel Layout" })).toBeInTheDocument();
    expect(screen.getByText("메시지 30").parentElement).toHaveClass("message-list");
  });

  it("uses minmax rows and overflow on the inner panel", () => {
    expect(css).toMatch(/grid-template-rows:\s*auto\s+minmax\(0,\s*1fr\)/);
    expect(css).toMatch(/\.message-list\s*{[^}]*overflow:\s*auto/s);
  });
});
