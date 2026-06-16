import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { App, readStorageValue, useLocalStorage } from "./App";

describe("Local Storage Hook practice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads an existing JSON value from localStorage", () => {
    localStorage.setItem("practice-name", JSON.stringify("민지"));
    expect(readStorageValue("practice-name", "")).toBe("민지");
  });

  it("falls back to the default value for broken JSON", () => {
    localStorage.setItem("practice-name", "{broken");
    expect(readStorageValue("practice-name", "기본값")).toBe("기본값");
  });

  it("hydrates the input from storage on mount", () => {
    localStorage.setItem("practice-name", JSON.stringify("민지"));
    render(<App />);

    expect(screen.getByLabelText("이름")).toHaveValue("민지");
  });

  it("writes each update back to localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "지훈");

    expect(localStorage.getItem("practice-name")).toBe(JSON.stringify("지훈"));
    expect(screen.getByRole("status")).toHaveTextContent("지훈");
  });

  it("supports functional updates and writes the calculated value", async () => {
    const user = userEvent.setup();

    const Counter = () => {
      const [count, setCount] = useLocalStorage("practice-count", 0);

      return (
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          {count}
        </button>
      );
    };

    render(<Counter />);

    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "1" }));

    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(localStorage.getItem("practice-count")).toBe(JSON.stringify(2));
  });

  it("resets state and storage together", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("이름"), "지훈");
    await user.click(screen.getByRole("button", { name: "초기화" }));

    expect(screen.getByLabelText("이름")).toHaveValue("");
    expect(localStorage.getItem("practice-name")).toBe(JSON.stringify(""));
  });
});
