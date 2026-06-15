# Project Structure

이 문서는 프로젝트 안에서 주요 파일이 어디에 있는지만 정리한다. 문서 본문 작성 규칙이나 섹션별 내용은 evergreen knowledge로 관리하지 않는다.

## Root Files

- `package.json`: Rspress 실행 script와 npm dependency를 둔다.
- `pnpm-lock.yaml`: pnpm dependency lockfile이다.
- `pnpm-workspace.yaml`: pnpm workspace 설정이다.
- `.mise.toml`: Node와 pnpm 버전을 고정한다.
- `rspress.config.ts`: Rspress root, base path, output, search, sidebar, llms 설정을 둔다.
- `tsconfig.json`: Rspress와 MDX type check 설정을 둔다.
- `README.md`: 프로젝트 소개, practice 목록, 실행 방법, 배포 URL을 둔다.
- `AGENTS.md`: agent가 먼저 읽는 repo-local router다.

## Directories

- `docs/`: Rspress가 읽는 문서 root다.
- `docs/index.mdx`: 사이트 홈 route이자 첫 문서의 원본이다.
- `docs/sections/`: 개별 MDX 문서 원본이 있는 위치다.
- `references/`: 문서 목록 기준이 있는 위치다.
- `practices/`: CoderPad형 React + TypeScript practice package workspace다.
- `practices/*/README.md`: practice별 한국어 문제 지시와 채점 기준이다.
- `practices/*/src/App.tsx`: practice starter 코드의 중심 파일이다.
- `practices/*/src/App.test.tsx`: practice 채점용 Vitest 테스트다.
- `practices/coverage.md`: practice set의 React 개념 커버리지 매트릭스다.
- `scripts/validate-codeblocks.mjs`: `docs/**/*.mdx` 코드블록 문법을 재귀로 검사한다.
- `public/`: README와 Open Graph 용도 asset이 있는 위치다.
- `public/og-image.png`: README와 Open Graph 용도 이미지다.
- `.agents/knowledge/`: agent용 evergreen repository knowledge가 있는 위치다.
- `.agents/knowledge/content-quality.md`: 문서 본문을 고칠 때 적용할 품질 기준이다.
- `dist/`: `pnpm build`가 생성하는 Rspress output이며 git에서 무시한다.
