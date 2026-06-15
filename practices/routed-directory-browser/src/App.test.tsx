import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App, buildFileTree, type FileRecord } from "./App";

describe("Routed Directory Browser practice", () => {
  it("builds an arbitrarily deep tree with folders before files and case-insensitive sorting", () => {
    const records: FileRecord[] = [
      { path: "app/src/zeta.ts", contents: "" },
      { path: "app/README.md", contents: "" },
      { path: "app/src/Alpha.ts", contents: "" },
      { path: "app/src/components/Button.tsx", contents: "" },
    ];

    const tree = buildFileTree(records);

    expect(tree[0]).toMatchObject({ name: "app", type: "folder" });
    expect(tree[0].children?.map((node) => node.name)).toEqual(["src", "README.md"]);
    expect(tree[0].children?.[0].children?.map((node) => node.name)).toEqual([
      "components",
      "Alpha.ts",
      "zeta.ts",
    ]);
  });

  it("renders nested file rows and opens the selected file content", async () => {
    const user = userEvent.setup();
    render(<App />);

    const explorer = screen.getByLabelText("파일 탐색기");
    expect(within(explorer).getByRole("button", { name: "app" })).toBeInTheDocument();

    await user.click(within(explorer).getByRole("button", { name: "WidgetList.tsx" }));
    expect(screen.getByLabelText("파일 내용")).toHaveTextContent("app/src/WidgetList/WidgetList.tsx");
  });
});
