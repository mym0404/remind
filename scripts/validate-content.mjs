import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED_SECTION_HEADINGS = [
  "## 언제 쓰나",
  "## 바로 쓰는 코드",
  "## 실수 포인트",
  "## 참고",
];
const PRIORITY_LABEL_PATTERN = /\bP[0-2]\b/g;
const FORBIDDEN_TEXT_VALUES = [
  ["__", "TODO", "__"].join(""),
  ["source", "Title"].join(""),
  ["Cheat", "Section"].join(""),
  ["as", "any"].join(" "),
  ["@ts", "ignore"].join("-"),
  ["@ts", "nocheck"].join("-"),
  ["@ts", "expect", "error"].join("-"),
];
const FORBIDDEN_TEXT_PATTERN = new RegExp(FORBIDDEN_TEXT_VALUES.join("|"), "g");

export const extractSectionTitles = (markdown) => {
  const titles = [];

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

export const extractMarkdownTitle = (markdown) =>
  markdown
    .split(/\r?\n/)
    .find((line) => /^#\s+/.test(line.trim()))
    ?.replace(/^#\s+/, "")
    .trim();

export const findDuplicateValues = (values) => {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
};

export const findPriorityLabels = (text) => [
  ...new Set(text.match(PRIORITY_LABEL_PATTERN) ?? []),
];

export const extractMarkdownLinks = (markdown) =>
  [...markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]);

const readText = (filePath) => fs.readFileSync(filePath, "utf8");

const listSectionFiles = (dir) => {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(dir, entry.name))
    .sort();
};

const walkTextFiles = (dir) => {
  const ignoredDirectories = new Set([".git", "node_modules", "dist"]);
  const allowedExtensions = new Set([
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".mdx",
    ".mjs",
    ".ts",
    ".tsx",
    ".yml",
    ".yaml",
  ]);

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      if (ignoredDirectories.has(entry.name)) {
        return [];
      }

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walkTextFiles(fullPath);
      }

      return allowedExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
    });
};

const validateSectionShape = ({ expectedTitles, filePath, rootDir, text }) => {
  const errors = [];
  const relativePath = path.relative(rootDir, filePath);
  const title = extractMarkdownTitle(text);

  if (!title) {
    errors.push(`${relativePath}: 첫 줄 H1 제목이 없습니다.`);
    return { errors, links: [], title };
  }

  if (!expectedTitles.includes(title)) {
    errors.push(`${relativePath}: 기준 문서에 없는 제목입니다. ${title}`);
  }

  for (const heading of REQUIRED_SECTION_HEADINGS) {
    if (!text.includes(heading)) {
      errors.push(`${relativePath}: 필수 heading 누락 ${heading}`);
    }
  }

  const headingPositions = REQUIRED_SECTION_HEADINGS.map((heading) => text.indexOf(heading));
  if (
    headingPositions.every((position) => position >= 0) &&
    headingPositions.some((position, index) => index > 0 && position < headingPositions[index - 1])
  ) {
    errors.push(`${relativePath}: 섹션 heading 순서가 기준과 다릅니다.`);
  }

  const codeFenceCount = (text.match(/```/g) ?? []).length;
  if (codeFenceCount < 2 || codeFenceCount % 2 !== 0) {
    errors.push(`${relativePath}: 코드 블록이 없거나 닫히지 않았습니다.`);
  }

  const forbiddenMatches = [...new Set(text.match(FORBIDDEN_TEXT_PATTERN) ?? [])];
  if (forbiddenMatches.length > 0) {
    errors.push(`${relativePath}: 제거해야 할 문구 ${forbiddenMatches.join(", ")}`);
  }

  const links = extractMarkdownLinks(text);
  if (links.length === 0) {
    errors.push(`${relativePath}: 참고 링크가 없습니다.`);
  }

  return { errors, links, title };
};

export const validateContent = ({ rootDir = ROOT_DIR } = {}) => {
  const referencePath = path.join(rootDir, "references", "sections.md");
  const sectionDir = path.join(rootDir, "docs", "sections");
  const expectedTitles = extractSectionTitles(readText(referencePath));
  const files = listSectionFiles(sectionDir);
  const errors = [];

  if (expectedTitles.length !== 35) {
    errors.push(`기준 섹션은 35개여야 합니다. 현재 ${expectedTitles.length}개입니다.`);
  }

  if (files.length !== 35) {
    errors.push(`MDX 섹션 파일은 35개여야 합니다. 현재 ${files.length}개입니다.`);
  }

  const sectionResults = files.map((filePath) =>
    validateSectionShape({
      expectedTitles,
      filePath,
      rootDir,
      text: readText(filePath),
    }),
  );
  const actualTitles = sectionResults.map((result) => result.title).filter(Boolean);
  const missingTitles = expectedTitles.filter((title) => !actualTitles.includes(title));
  const unexpectedTitles = actualTitles.filter((title) => !expectedTitles.includes(title));
  const duplicateTitles = findDuplicateValues(actualTitles);

  if (missingTitles.length > 0) {
    errors.push(`콘텐츠 파일에 없는 기준 섹션: ${missingTitles.join(", ")}`);
  }

  if (unexpectedTitles.length > 0) {
    errors.push(`기준 문서에 없는 콘텐츠 섹션: ${unexpectedTitles.join(", ")}`);
  }

  if (duplicateTitles.length > 0) {
    errors.push(`중복 섹션 제목: ${duplicateTitles.join(", ")}`);
  }

  for (const result of sectionResults) {
    errors.push(...result.errors);
  }

  const duplicatedLinks = findDuplicateValues(sectionResults.flatMap((result) => result.links));
  if (duplicatedLinks.length > 0) {
    errors.push(`화면 노출 reference URL이 반복됩니다: ${duplicatedLinks.join(", ")}`);
  }

  for (const filePath of walkTextFiles(rootDir)) {
    const labels = findPriorityLabels(readText(filePath));

    if (labels.length > 0) {
      errors.push(
        `${path.relative(rootDir, filePath)}: 제거해야 할 우선순위 라벨 ${labels.join(", ")}`,
      );
    }
  }

  return errors;
};

const run = () => {
  const errors = validateContent();

  if (errors.length > 0) {
    console.error("콘텐츠 검증 실패");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("콘텐츠 검증 통과");
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
