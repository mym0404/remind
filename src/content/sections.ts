import referenceMarkdown from "../../references/sections.md?raw";

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string };

export type DocSection = {
  blocks: MarkdownBlock[];
  raw: string;
  slug: string;
  title: string;
};

const sectionModules = import.meta.glob<string>("../../content/sections/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "");

const extractReferenceTitles = (markdown: string) => {
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

const extractTitle = (markdown: string) =>
  markdown
    .split(/\r?\n/)
    .find((line) => /^#\s+/.test(line.trim()))
    ?.replace(/^#\s+/, "")
    .trim();

const flushParagraph = ({
  blocks,
  paragraphLines,
}: {
  blocks: MarkdownBlock[];
  paragraphLines: string[];
}) => {
  if (paragraphLines.length === 0) {
    return;
  }

  blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  paragraphLines.length = 0;
};

const parseMarkdown = (markdown: string) => {
  const lines = markdown.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  let currentList: string[] = [];
  let currentCode: { language: string; lines: string[] } | undefined;

  const flushList = () => {
    if (currentList.length === 0) {
      return;
    }

    blocks.push({ type: "list", items: currentList });
    currentList = [];
  };

  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    const fenceMatch = /^```(\w*)$/.exec(trimmed);

    if (fenceMatch) {
      if (currentCode) {
        blocks.push({
          type: "code",
          language: currentCode.language,
          code: currentCode.lines.join("\n"),
        });
        currentCode = undefined;
        continue;
      }

      flushParagraph({ blocks, paragraphLines });
      flushList();
      currentCode = { language: fenceMatch[1] ?? "", lines: [] };
      continue;
    }

    if (currentCode) {
      currentCode.lines.push(line);
      continue;
    }

    if (!trimmed) {
      flushParagraph({ blocks, paragraphLines });
      flushList();
      continue;
    }

    const headingMatch = /^(#{2,4})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph({ blocks, paragraphLines });
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    const listMatch = /^-\s+(.+)$/.exec(trimmed);
    if (listMatch) {
      flushParagraph({ blocks, paragraphLines });
      currentList.push(listMatch[1]);
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  flushParagraph({ blocks, paragraphLines });
  flushList();

  return blocks;
};

const referenceTitles = extractReferenceTitles(referenceMarkdown);
const sectionsByTitle = new Map<string, DocSection>();

for (const raw of Object.values(sectionModules)) {
  const title = extractTitle(raw);

  if (!title) {
    continue;
  }

  sectionsByTitle.set(title, {
    blocks: parseMarkdown(raw),
    raw,
    slug: slugify(title),
    title,
  });
}

export const sections = referenceTitles
  .map((title) => sectionsByTitle.get(title))
  .filter((section): section is DocSection => Boolean(section));
