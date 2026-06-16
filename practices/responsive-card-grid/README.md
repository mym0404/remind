# Responsive Card Grid

## 목표

카드 목록이 viewport 너비에 맞춰 열 수를 바꾸게 만든다.

## 요구사항

- 카드들은 `.card-grid` 안에 렌더링된다.
- `.card-grid`는 CSS Grid로 배치된다.
- viewport 폭이 바뀌면 `repeat(auto-fit, minmax(220px, 1fr))` 또는 `repeat(auto-fill, minmax(220px, 1fr))` 규칙으로 열 수가 달라진다.
- CSS를 확인하면 `grid-template-columns`에 고정 3열 값이 없다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-responsive-card-grid dev
pnpm --filter @remind/practice-responsive-card-grid test
```
