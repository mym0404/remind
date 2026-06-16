import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

const css = readFileSync(resolve(__dirname, "style.css"), "utf8");

describe("Scrollable Panel Layout practice", () => {
  it("renders fixed shell and internal panel areas", () => {
    render(<App />);
    expect(screen.getByText("Scrollable Panel Layout").closest(".app-shell")).toBeInTheDocument();
    expect(screen.getByText("Inbox").closest(".content-panel")).toBeInTheDocument();
    expect(screen.getByText("Message 30").closest(".panel-body")).toBeInTheDocument();
  });

  it("fixes the shell to the viewport height", () => {
    expect(css).toMatch(/\.app-shell\s*{[^}]*height:\s*100vh/s);
  });

  it("uses minmax(0, 1fr) for flexible grid rows", () => {
    expect(css).toMatch(/\.app-shell\s*{[^}]*grid-template-rows:[^;]*minmax\(\s*0\s*,\s*1fr\s*\)/s);
    expect(css).toMatch(/\.content-panel\s*{[^}]*grid-template-rows:[^;]*minmax\(\s*0\s*,\s*1fr\s*\)/s);
  });

  it("puts overflow only on the panel body", () => {
    expect(css).toMatch(/\.panel-body\s*{[^}]*overflow:\s*auto/s);
  });

  it("allows the panel body to shrink inside the grid", () => {
    expect(css).toMatch(/\.content-panel\s*{[^}]*min-height:\s*0/s);
    expect(css).toMatch(/\.panel-body\s*{[^}]*min-height:\s*0/s);
  });

  it("prevents page-level scroll leakage", () => {
    expect(css).toMatch(/html,\s*body,\s*#root\s*{[^}]*height:\s*100%/s);
    expect(css).toMatch(/body\s*{[^}]*overflow:\s*hidden/s);
  });
});
