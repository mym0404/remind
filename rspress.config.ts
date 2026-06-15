import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rspress/core";
import { transformerNotationHighlight } from "@shikijs/transformers";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(rootDir, "docs");

const extractReferenceTitles = () => {
  const markdown = fs.readFileSync(path.join(rootDir, "references", "sections.md"), "utf8");
  const titles: string[] = [];

  for (const line of markdown.split(/\r?\n/)) {
    if (line.trim() === "## 검증 기준") {
      break;
    }

    const match = /^##\s+(.+)$/.exec(line.trim());
    if (match) {
      titles.push(match[1]);
    }
  }

  return titles;
};

const extractMarkdownTitle = (markdown: string) =>
  markdown
    .split(/\r?\n/)
    .find((line) => /^#\s+/.test(line.trim()))
    ?.replace(/^#\s+/, "")
    .trim();

const indexMarkdown = fs.readFileSync(path.join(docsDir, "index.mdx"), "utf8");
const indexTitle = extractMarkdownTitle(indexMarkdown);

if (!indexTitle) {
  throw new Error("Missing H1 title in docs/index.mdx");
}

const sectionLinksByTitle = new Map([
  [indexTitle, "/"] as const,
  ...fs
    .readdirSync(path.join(docsDir, "sections"))
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const markdown = fs.readFileSync(path.join(docsDir, "sections", fileName), "utf8");
      const title = extractMarkdownTitle(markdown);

      if (!title) {
        throw new Error(`Missing H1 title in docs/sections/${fileName}`);
      }

      return [title, `/sections/${fileName.replace(/\.mdx$/, "")}`] as const;
    }),
]);

const sectionSidebarItems = extractReferenceTitles().map((title) => {
  const link = sectionLinksByTitle.get(title);

  if (!link) {
    throw new Error(`Missing MDX page for section: ${title}`);
  }

  return { text: title, link };
});

export default defineConfig({
  root: docsDir,
  base: "/remind/",
  outDir: "dist",
  lang: "ko",
  title: "React Practice 해답집",
  description: "React live coding practice의 해답과 핵심 개념을 확인하는 문서 사이트",
  llms: true,
  search: {
    codeBlocks: true,
  },
  builderConfig: {
    html: {
      implementation: "native",
    },
  },
  markdown: {
    shiki: {
      transformers: [transformerNotationHighlight()],
    },
  },
  themeConfig: {
    nav: [{ text: "해답", link: "/" }],
    sidebar: {
      "/": [
        {
          text: "Practice 해답",
          items: sectionSidebarItems,
        },
      ],
    },
    search: true,
    enableScrollToTop: true,
  },
});
