import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";

const rootDir = process.cwd();
const docsDir = path.join(rootDir, "docs");
const checkedLanguages = new Set(["js", "jsx", "ts", "tsx"]);

const collectMdxFiles = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectMdxFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".mdx") ? [entryPath] : [];
    })
    .sort();

const parseCodeBlock = ({ code, filePath, language, line }) => {
  try {
    parse(code, {
      sourceType: "module",
      errorRecovery: false,
      plugins: [
        "jsx",
        ["typescript", { disallowAmbiguousJSXLike: false }],
      ],
    });
  } catch (error) {
    const relativePath = path.relative(rootDir, filePath);
    const errorLine = error.loc ? line + error.loc.line - 1 : line;
    const message = error instanceof Error ? error.message : String(error);

    throw new Error(`${relativePath}:${errorLine} ${language} code block does not parse: ${message}`);
  }
};

const validateFile = (filePath) => {
  const markdown = fs.readFileSync(filePath, "utf8");
  const fencePattern = /^```([^\s`]+)[^\n]*\n([\s\S]*?)^```/gm;
  let match;
  let count = 0;
  const errors = [];

  while ((match = fencePattern.exec(markdown))) {
    const language = match[1].toLowerCase();

    if (!checkedLanguages.has(language)) {
      continue;
    }

    const line = markdown.slice(0, match.index).split(/\r?\n/).length;
    try {
      parseCodeBlock({ code: match[2], filePath, language, line });
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }

    count += 1;
  }

  return { count, errors };
};

const files = collectMdxFiles(docsDir);
const result = files.reduce(
  (summary, filePath) => {
    const { count, errors } = validateFile(filePath);

    return {
      count: summary.count + count,
      errors: [...summary.errors, ...errors],
    };
  },
  { count: 0, errors: [] },
);

if (result.errors.length > 0) {
  console.error(result.errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${result.count} code blocks in ${files.length} MDX files.`);
