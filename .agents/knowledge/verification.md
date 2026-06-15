# Verification

변경 범위에 맞는 가장 작은 의미 있는 검증을 먼저 실행한다.

## Commands

- `pnpm install`: lockfile과 의존성을 현재 `package.json`에 맞춘다.
- `pnpm validate:codeblocks`: `docs/**/*.mdx`의 JS/TS/JSX/TSX 코드블록을 재귀로 파싱한다.
- `pnpm build`: Rspress production build를 실행한다.
- `pnpm -r --filter './practices/*' build`: 모든 practice package의 Vite build를 실행한다.
- `pnpm --filter <practice-package-name> dev`: 특정 practice package의 로컬 dev server를 띄운다.
- `pnpm --filter <practice-package-name> test`: 특정 practice package의 채점용 Vitest 테스트를 실행한다. starter 상태에서는 실패할 수 있다.
- `pnpm dev`: 로컬 서버를 띄워 브라우저에서 홈, sidebar, 검색, 문서 이동을 확인한다.

## Blind Spots

- `pnpm build`는 문서 route와 MDX 변환을 검증하지만, 모든 사용자 흐름을 대신하지 않는다.
- `pnpm validate:codeblocks`는 syntax 손상만 잡는다. runtime import 누락, 실제 API contract, 예시의 타입 정확성은 별도 검토가 필요하다.
- 의미 있는 UI 변경 뒤에는 dev server와 브라우저 확인을 함께 한다.
- practice 테스트는 정답 구현을 검증하기 위한 기준이다. starter 코드에서는 미구현 요구사항 때문에 실패하는 것이 정상일 수 있다.
- README 배너를 바꾼 뒤에는 이미지 파일을 직접 확인하고 README의 상대 경로가 유지되는지 확인한다.
