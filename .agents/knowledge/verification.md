# Verification

변경 범위에 맞는 가장 작은 의미 있는 검증을 먼저 실행한다.

## Commands

- `pnpm install`: lockfile과 의존성을 현재 `package.json`에 맞춘다.
- `pnpm build`: Rspress production build를 실행한다.
- `pnpm dev`: 로컬 서버를 띄워 브라우저에서 홈, sidebar, 검색, 문서 이동을 확인한다.

## Blind Spots

- `pnpm build`는 문서 route와 MDX 변환을 검증하지만, 모든 사용자 흐름을 대신하지 않는다.
- 의미 있는 UI 변경 뒤에는 dev server와 브라우저 확인을 함께 한다.
