# Deferred Filter List

## 목표

입력 state는 즉시 갱신하고 무거운 필터링만 낮은 우선순위로 늦춘다.

## 요구사항

- input value는 transition에 넣지 않는다.
- useDeferredValue나 useTransition으로 목록 갱신을 분리한다.
- 무거운 필터링은 지연된 검색어로 실행한다.
- pending UI를 좁은 범위에만 보여준다.
- `filterItems` named export는 검색어를 trim하고 대소문자 구분 없이 필터링한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-deferred-filter-list dev
pnpm --filter @remind/practice-deferred-filter-list test
```
