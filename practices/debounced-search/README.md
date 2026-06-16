# Debounced Search

## 목표

입력은 즉시 바꾸고 요청 기준값만 delay 뒤에 갱신한다.

## 요구사항

- 검색어를 입력하면 input value는 즉시 바뀐다.
- delay가 지나기 전에는 검색 결과가 이전 검색어 기준으로 유지된다.
- 여러 글자를 빠르게 입력하면 마지막 입력만 검색 결과에 반영된다.
- value가 바뀌거나 컴포넌트가 unmount되면 이전 timer가 정리된다.
- `useDebounce` hook은 named export로 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-debounced-search dev
pnpm --filter @remind/practice-debounced-search test
```
