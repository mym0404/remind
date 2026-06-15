import { describe, expect, it } from "vitest";
import { buildFileTree } from "./App";

describe("File Tree Transform practice", () => {
  it("builds an arbitrarily deep folder tree", () => {
    const tree = buildFileTree([
      { path: "app/src/components/Button.tsx", contents: "button" },
      { path: "app/README.md", contents: "readme" },
      { path: "app/src/App.tsx", contents: "app" },
    ]);
    expect(tree[0]).toMatchObject({ name: "app", type: "folder", path: "app" });
    expect(tree[0].children?.map((node) => node.name)).toEqual(["src", "README.md"]);
    expect(tree[0].children?.[0].children?.map((node) => node.name)).toEqual(["components", "App.tsx"]);
  });

  it("sorts folders before files and ignores case", () => {
    const tree = buildFileTree([{ path: "b.txt", contents: "" }, { path: "A/a.txt", contents: "" }]);
    expect(tree.map((node) => node.name)).toEqual(["A", "b.txt"]);
  });
});
