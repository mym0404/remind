import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { App, useLocalStorage } from "./App";

describe("Local Storage Hook practice", () => {
  beforeEach(() => localStorage.clear());

  it("restores the stored value on mount", () => {
    localStorage.setItem("practice-name", JSON.stringify("민지"));
    render(<App />);
    expect(screen.getByLabelText("이름")).toHaveValue("민지");
  });

  it("persists edits to localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("이름"), "지훈");
    expect(localStorage.getItem("practice-name")).toBe(JSON.stringify("지훈"));
  });

  it("falls back when storage has broken JSON", () => {
    localStorage.setItem("broken", "{");
    const { result } = renderHook(() => useLocalStorage("broken", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });
});
