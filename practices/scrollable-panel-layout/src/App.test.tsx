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
    expect(screen.getByText("Message 30").closest(".panel-body")).toBeInTheDocument();
  });

  it("fixes the shell to the viewport height", () => {
    expect(css).toMatch(/\.app-shell\s*{[^}]*height:\s*100vh/s);
  });

  it("uses minmax(0, 1fr) for the scrollable grid row", () => {
    expect(css).toMatch(/grid-template-rows:[^;]*minmax\(\s*0\s*,\s*1fr\s*\)/s);
  });

  it("puts overflow only on the panel body", () => {
    expect(css).toMatch(/\.panel-body\s*{[^}]*overflow:\s*auto/s);
  });

  it("prevents body-level scroll leakage", () => {
    expect(css).toMatch(/body\s*{[^}]*overflow:\s*hidden/s);
  });
});
