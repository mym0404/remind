# Architecture

이 저장소는 Rspress 해답 문서 사이트와 CoderPad형 React practice workspace를 함께 둔다. Rspress 설정은 `rspress.config.ts`에서 시작한다.

## Runtime Path

- `root`는 `docs/`다.
- `base`는 GitHub Pages project path에 맞춰 `/remind/`다.
- `outDir`는 기존 배포 흐름과 맞추기 위해 `dist`다.
- `llms: true`로 production build에서 `llms.txt`, `llms-full.txt`, route별 Markdown 산출물을 만든다.
- 검색은 Rspress built-in search를 쓰고, code block도 index에 포함한다.

## Routing

Rspress는 `docs/` 아래 파일 경로로 route를 만든다.

- `docs/index.mdx`는 `/` route이자 첫 문서다.
- `docs/sections/controlled-fields.mdx`는 `/sections/controlled-fields` route다.
- `docs/sections/*.mdx`는 practice별 해답 페이지이며 `/sections/*` route다.

## Sidebar

Sidebar는 `rspress.config.ts`에서 만든다. 설정 파일은 `references/sections.md`의 해답 제목과 `docs/sections/*.mdx`의 H1을 맞춰 sidebar item을 만든다.

## Practice Workspace

`practices/*`는 Rspress 사이트와 분리된 pnpm workspace package다. 각 package는 Vite React 앱이며 CoderPad형 starter, 한국어 README, Vitest 채점 테스트를 함께 둔다.

practice package의 dependency version은 각 package가 직접 선언하지 않고 `pnpm-workspace.yaml`의 `catalog`를 참조한다.
