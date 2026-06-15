import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  extractMarkdownLinks,
  extractMarkdownTitle,
  extractSectionTitles,
  findDuplicateValues,
  findPriorityLabels,
} from "./validate-content.mjs";

describe("content validation helpers", () => {
  it("extracts only 기준 섹션 titles and ignores 검증 기준", () => {
    const markdown = [
      "# 기준 섹션",
      "## React 상태와 이벤트",
      "## Suspense",
      "## 검증 기준",
      "- React 공식 문서 확인",
    ].join("\n");

    assert.deepEqual(extractSectionTitles(markdown), [
      "React 상태와 이벤트",
      "Suspense",
    ]);
  });

  it("finds duplicate values", () => {
    assert.deepEqual(findDuplicateValues(["a", "b", "a", "c", "b"]), [
      "a",
      "b",
    ]);
  });

  it("extracts markdown H1 title", () => {
    assert.equal(extractMarkdownTitle("# React 상태와 이벤트\n\n본문"), "React 상태와 이벤트");
  });

  it("extracts visible markdown links", () => {
    assert.deepEqual(
      extractMarkdownLinks("[React](https://react.dev) 참고"),
      ["https://react.dev"],
    );
  });

  it("finds priority labels in text", () => {
    const priorityLabel = ["P", "1"].join("");

    assert.deepEqual(findPriorityLabels(`old label ${priorityLabel} remains`), [
      priorityLabel,
    ]);
  });
});
