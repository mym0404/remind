import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Reusable State Hooks practice", () => {
  it("persists notes and restores them on remount", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.type(screen.getByLabelText("노트 제목"), "Observer cleanup");
    await user.click(screen.getByRole("button", { name: "추가" }));
    expect(screen.getByText("Observer cleanup")).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByText("Observer cleanup")).toBeInTheDocument();
  });

  it("pins notes through reducer actions and keeps pinned items first", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Route params 복습 고정" }));

    const notes = screen.getAllByRole("listitem").map((item) => item.textContent);
    expect(notes[0]).toContain("Route params 복습");
  });
});
