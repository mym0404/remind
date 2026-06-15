# Virtualized List Range

## 목표

scroll 위치와 row 높이로 보이는 구간만 렌더링한다.

## 요구사항

- getVisibleRange를 구현한다.
- overscan을 적용한다.
- 전체 row를 한 번에 렌더링하지 않는다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-virtualized-list-range dev
pnpm --filter @remind/practice-virtualized-list-range test
```
