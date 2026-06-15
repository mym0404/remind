import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Deferred Filter List practice", () => {
  it("keeps the input immediate while the expensive result is deferred", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Metric 검색"), "1999");
    expect(screen.getByLabelText("Metric 검색")).toHaveValue("1999");
    expect(screen.getByRole("status")).toHaveAccessibleName("목록 갱신 상태");
    expect(await screen.findByText("Metric 1999")).toBeInTheDocument();
  });
});
