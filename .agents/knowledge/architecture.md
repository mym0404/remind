# Architecture

이 저장소는 Rspress 문서 사이트다. Rspress 설정은 `rspress.config.ts`에서 시작한다.

## Runtime Path

- `root`는 `docs/`다.
- `base`는 GitHub Pages project path에 맞춰 `/remind/`다.
- `outDir`는 기존 배포 흐름과 맞추기 위해 `dist`다.
- `llms: true`로 production build에서 `llms.txt`, `llms-full.txt`, route별 Markdown 산출물을 만든다.
- 검색은 Rspress built-in search를 쓰고, code block도 index에 포함한다.

## Routing

Rspress는 `docs/` 아래 파일 경로로 route를 만든다.

- `docs/index.mdx`는 `/` route이자 첫 문서다.
- `docs/sections/react-state-events.mdx`는 `/sections/react-state-events` route다.
- `docs/sections/*.mdx`는 `/sections/*` route다.

## Sidebar

Sidebar는 `rspress.config.ts`에서 만든다. 설정 파일은 `references/sections.md`와 `docs/sections/*.mdx`를 읽어 sidebar item을 만든다.

## Practice Workspace

`practices/*`는 Rspress 사이트와 분리된 pnpm workspace package다. 각 package는 Vite React 앱이며 CoderPad형 starter, 한국어 README, Vitest 채점 테스트를 함께 둔다.
