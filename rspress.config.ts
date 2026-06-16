import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rspress/core";
import { transformerNotationHighlight } from "@shikijs/transformers";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(rootDir, "docs");

const extractReferenceTitles = (referenceFileName: string) => {
  const markdown = fs.readFileSync(path.join(rootDir, "references", referenceFileName), "utf8");
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

const createLinksByTitle = (docsSubdir: string, routePrefix: string) =>
  new Map(
    fs
      .readdirSync(path.join(docsDir, docsSubdir))
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const markdown = fs.readFileSync(path.join(docsDir, docsSubdir, fileName), "utf8");
        const title = extractMarkdownTitle(markdown);

        if (!title) {
          throw new Error(`Missing H1 title in docs/${docsSubdir}/${fileName}`);
        }

        return [title, `/${routePrefix}/${fileName.replace(/\.mdx$/, "")}`] as const;
      }),
  );

const createSidebarItems = ({
  referenceFileName,
  docsSubdir,
  routePrefix,
  label,
}: {
  referenceFileName: string;
  docsSubdir: string;
  routePrefix: string;
  label: string;
}) => {
  const linksByTitle = createLinksByTitle(docsSubdir, routePrefix);

  return extractReferenceTitles(referenceFileName).map((title) => {
    const link = linksByTitle.get(title);

    if (!link) {
      throw new Error(`Missing MDX page for ${label}: ${title}`);
    }

    return { text: title, link };
  });
};

const indexMarkdown = fs.readFileSync(path.join(docsDir, "index.mdx"), "utf8");
const indexTitle = extractMarkdownTitle(indexMarkdown);

if (!indexTitle) {
  throw new Error("Missing H1 title in docs/index.mdx");
}

const conceptSidebarItems = createSidebarItems({
  referenceFileName: "concepts.md",
  docsSubdir: "concepts",
  routePrefix: "concepts",
  label: "concept",
});

const solutionSidebarItems = createSidebarItems({
  referenceFileName: "sections.md",
  docsSubdir: "sections",
  routePrefix: "sections",
  label: "solution",
});

export default defineConfig({
  root: docsDir,
  base: "/remind/",
  outDir: "dist",
  lang: "ko",
  title: "React Practice Guide",
  description: "React 개념과 live coding practice 해답을 함께 확인하는 문서 사이트",
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
    nav: [
      { text: "홈", link: "/" },
      { text: "개념", link: "/concepts/form-basic" },
      { text: "해답집", link: "/sections/controlled-fields" },
    ],
    sidebar: {
      "/": [
        {
          text: "개념",
          items: conceptSidebarItems,
        },
        {
          text: "해답집",
          items: solutionSidebarItems,
        },
      ],
    },
    search: true,
    enableScrollToTop: true,
  },
});
