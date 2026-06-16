# Sticky Table Header

## 목표

스크롤되는 표에서 header만 상단에 붙게 만든다.

## 요구사항

- table은 scroll container 안에 렌더링된다.
- container 내용이 길어지면 container 내부만 스크롤된다.
- 스크롤해도 header cell은 container 상단에 붙어 있다.
- sticky header에는 row 위로 보이는 background와 z-index가 적용된다.
- table은 의미 있는 `table`, `thead`, `tbody`, `th`, `td` 구조를 유지한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-sticky-table-header dev
pnpm --filter @remind/practice-sticky-table-header test
```
