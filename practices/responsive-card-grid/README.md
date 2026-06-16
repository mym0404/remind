# Responsive Card Grid

## 목표

카드 목록이 viewport 너비에 맞춰 열 수를 바꾸게 만든다.

## 요구사항

- CSS Grid를 쓴다.
- 카드들은 `.card-grid` 안에 렌더링한다.
- `.card-grid`에 `repeat(auto-fit, minmax(220px, 1fr))` 또는 `repeat(auto-fill, minmax(220px, 1fr))`를 쓴다.
- 고정 3열 grid를 쓰지 않는다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-responsive-card-grid dev
pnpm --filter @remind/practice-responsive-card-grid test
```
