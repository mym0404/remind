# Repository Guide

## Project Overview

React와 TypeScript 문법을 빠르게 확인하는 Rspress 문서 사이트다. Rspress 설정과 문서 소스, 기준 문서, 검증 스크립트가 분리되어 있다.

## Tech Stack

- 런타임은 `mise`로 고정한 Node 24.16.0과 pnpm 10.33.0을 쓴다.
- 사이트 생성기는 Rspress 2를 쓴다.
- 문서 본문은 MDX를 쓴다.
- 검증 스크립트는 Node 내장 test runner와 plain ESM 스크립트를 쓴다.

## Project Structure

```text
AGENTS.md                  # repo-local agent router
.agents/knowledge/         # evergreen agent knowledge
.mise.toml                 # Node/pnpm version pin
docs/
  index.mdx                # 문서 홈
  sections/                # MDX 문서 소스
references/sections.md     # 문서 목록과 검증 기준
scripts/
  validate-content.mjs     # 문서 소스 검증
  validate-content.test.mjs
rspress.config.ts          # Rspress root, base, sidebar, search, llms 설정
```

## Runtime And Architecture

Rspress는 `docs/`를 문서 root로 읽고 conventional route를 만든다. 자세한 구조와 routing 기준은 `.agents/knowledge/architecture.md`를 먼저 확인한다.

## Verification Commands

- `pnpm validate:content`: `references/sections.md`와 `docs/sections/*.mdx`의 일관성을 검증한다.
- `pnpm test`: 검증 스크립트 helper의 unit test를 실행한다.
- `pnpm build`: Rspress production build와 llms 산출물을 만든다.
- `pnpm dev`: 로컬 dev server를 띄워 브라우저에서 홈, sidebar, 검색, 문서 이동을 확인한다.

## Knowledge Router

- `.agents/knowledge/architecture.md`: Rspress 구조, route, sidebar 기준
- `.agents/knowledge/project-structure.md`: 주요 파일과 디렉터리 위치
- `.agents/knowledge/verification.md`: 검증 명령과 blind spot
- `.agents/knowledge/rspress.md`: 이 repo에서 쓰는 Rspress MDX 문법 reference

## Knowledge System

Root `AGENTS.md`는 agent router이고, evergreen 지식은 `.agents/knowledge/*`에 둔다. 프로젝트 구조, stable runtime entrypoint, 검증 명령, ownership boundary, durable repository contract가 바뀌면 같은 변경에서 root `AGENTS.md`와 관련 knowledge 문서를 함께 갱신한다.

Task-local scope, success criteria, verification criteria, temporary constraint, preference, example은 사용자가 일반 지식으로 만들라고 했거나 저장소 변경으로 현재 사실이 된 경우에만 knowledge에 남긴다. 현재 repository knowledge는 기존 상태를 설명하는 문서이며, 의도적인 기능 변경이나 구조 변경을 거절하는 근거로 쓰지 않는다.
