# Deferred Filter List

## 목표

입력 state는 즉시 갱신하고 무거운 필터링만 낮은 우선순위로 늦춘다.

## 요구사항

- 검색어를 입력하면 input value는 즉시 바뀐다.
- 목록 필터링은 지연된 검색어 기준으로 갱신된다.
- 필터링 중에는 목록 주변의 좁은 범위에만 pending UI가 보인다.
- 검색어 앞뒤 공백과 대소문자가 달라도 같은 항목을 찾는다.
- `filterItems` named export로 trim과 case-insensitive filtering 결과를 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-deferred-filter-list dev
pnpm --filter @remind/practice-deferred-filter-list test
```
