import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, todoReducer } from "./App";

describe("Reducer Actions practice", () => {
  it("adds, toggles, and removes todos without mutating the previous state", () => {
    const previous = [{ id: "a", title: "A", done: false }];
    const added = todoReducer(previous, { type: "add", todo: { id: "b", title: "B", done: false } });
    const toggled = todoReducer(added, { type: "toggle", id: "b" });
    const removed = todoReducer(toggled, { type: "remove", id: "a" });
    expect(previous).toEqual([{ id: "a", title: "A", done: false }]);
    expect(removed).toEqual([{ id: "b", title: "B", done: true }]);
  });

  it("wires reducer actions to the UI", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("할 일"), "테스트 작성");
    await user.click(screen.getByRole("button", { name: "추가" }));
    const item = screen.getByText("테스트 작성").closest("li");
    expect(item).not.toBeNull();
    await user.click(within(item as HTMLLIElement).getByRole("button", { name: "완료" }));
    expect(item).toHaveAttribute("data-done", "true");
  });
});
