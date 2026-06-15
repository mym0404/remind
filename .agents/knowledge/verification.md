# Verification

변경 범위에 맞는 가장 작은 의미 있는 검증을 먼저 실행한다.

## Commands

- `pnpm install`: lockfile과 의존성을 현재 `package.json`에 맞춘다.
- `pnpm validate:codeblocks`: `docs/**/*.mdx`의 JS/TS/JSX/TSX 코드블록을 재귀로 파싱한다.
- `pnpm build`: Rspress production build를 실행한다.
- `pnpm dev`: 로컬 서버를 띄워 브라우저에서 홈, sidebar, 검색, 문서 이동을 확인한다.

## Blind Spots

- `pnpm build`는 문서 route와 MDX 변환을 검증하지만, 모든 사용자 흐름을 대신하지 않는다.
- `pnpm validate:codeblocks`는 syntax 손상만 잡는다. runtime import 누락, 실제 API contract, 예시의 타입 정확성은 별도 검토가 필요하다.
- 의미 있는 UI 변경 뒤에는 dev server와 브라우저 확인을 함께 한다.
