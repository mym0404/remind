import { describe, expect, it } from "vitest";
import { buildFileTree } from "./App";

describe("File Tree Transform practice", () => {
  it("creates nested folder and file nodes", () => {
    expect(buildFileTree(["src/components/Button.tsx"])).toEqual([
      {
        type: "folder",
        name: "src",
        children: [
          {
            type: "folder",
            name: "components",
            children: [{ type: "file", name: "Button.tsx" }],
          },
        ],
      },
    ]);
  });

  it("deduplicates repeated paths", () => {
    expect(buildFileTree(["README.md", "README.md"])).toEqual([
      { type: "file", name: "README.md" },
    ]);
  });

  it("merges files that share folder ancestors", () => {
    expect(buildFileTree(["src/App.tsx", "src/main.tsx"])).toEqual([
      {
        type: "folder",
        name: "src",
        children: [
          { type: "file", name: "App.tsx" },
          { type: "file", name: "main.tsx" },
        ],
      },
    ]);
  });

  it("handles deeply nested paths", () => {
    expect(buildFileTree(["app/routes/admin/settings/page.tsx"])).toEqual([
      {
        type: "folder",
        name: "app",
        children: [
          {
            type: "folder",
            name: "routes",
            children: [
              {
                type: "folder",
                name: "admin",
                children: [
                  {
                    type: "folder",
                    name: "settings",
                    children: [{ type: "file", name: "page.tsx" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it("sorts folders before files at the same depth", () => {
    expect(buildFileTree(["z-file.ts", "src/App.tsx"])[0]).toMatchObject({
      type: "folder",
      name: "src",
    });
  });

  it("sorts names case-insensitively inside each depth", () => {
    expect(buildFileTree(["beta.ts", "Alpha.ts"])).toEqual([
      { type: "file", name: "Alpha.ts" },
      { type: "file", name: "beta.ts" },
    ]);
  });
});
