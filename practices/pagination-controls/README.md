# Pagination Controls

## 목표

page state와 page size로 목록을 자르고 이전/다음 버튼 상태를 계산한다.

## 요구사항

- 현재 page를 state로 둔다.
- page size로 visible items를 계산한다.
- 처음/끝 page에서 버튼을 disabled 처리한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-pagination-controls dev
pnpm --filter @remind/practice-pagination-controls test
```
