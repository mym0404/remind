import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, todoReducer } from "./App";

describe("Reducer Actions practice", () => {
  it("adds a todo without mutating the previous array", () => {
    const previous = Object.freeze([{ id: "a", title: "기획", done: false }]);
    const next = todoReducer([...previous], { type: "add", title: "구현" });

    expect(next).toHaveLength(2);
    expect(next[1]).toMatchObject({ title: "구현", done: false });
    expect(next).not.toBe(previous);
  });

  it("toggles a todo by id", () => {
    expect(
      todoReducer([{ id: "a", title: "기획", done: false }], { type: "toggle", id: "a" }),
    ).toEqual([{ id: "a", title: "기획", done: true }]);
  });

  it("removes a todo by id", () => {
    expect(
      todoReducer([{ id: "a", title: "기획", done: false }], { type: "remove", id: "a" }),
    ).toEqual([]);
  });

  it("renders added todos from the reducer", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("할 일"), "테스트 작성");
    await user.click(screen.getByRole("button", { name: "추가" }));

    expect(screen.getByText("테스트 작성")).toBeInTheDocument();
  });

  it("renders completed todos with checked state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("할 일"), "테스트 작성");
    await user.click(screen.getByRole("button", { name: "추가" }));
    await user.click(screen.getByRole("checkbox", { name: "테스트 작성" }));

    expect(screen.getByRole("checkbox", { name: "테스트 작성" })).toBeChecked();
  });

  it("removes a todo from the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("할 일"), "테스트 작성");
    await user.click(screen.getByRole("button", { name: "추가" }));
    await user.click(screen.getByRole("button", { name: "테스트 작성 삭제" }));

    expect(screen.queryByText("테스트 작성")).not.toBeInTheDocument();
  });
});
