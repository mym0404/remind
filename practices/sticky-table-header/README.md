# Sticky Table Header

## 목표

스크롤되는 표에서 header만 상단에 붙게 만든다.

## 요구사항

- table을 감싸는 scroll container를 만든다.
- thead th에 position: sticky와 top을 준다.
- sticky header 배경을 지정한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-sticky-table-header dev
pnpm --filter @remind/practice-sticky-table-header test
```
