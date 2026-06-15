# Debounced Search

## 목표

입력은 즉시 바꾸고 요청 기준값만 delay 뒤에 갱신한다.

## 요구사항

- useDebounce hook을 만든다.
- value 변경 시 이전 timer를 cleanup한다.
- 마지막 입력만 검색에 반영한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-debounced-search dev
pnpm --filter @remind/practice-debounced-search test
```
