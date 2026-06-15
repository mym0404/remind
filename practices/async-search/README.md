# Async Product Search

## 목표

검색어가 바뀔 때 비동기 상품 검색을 실행하는 화면을 완성한다.

현재 코드는 submit 기반 동기 필터만 있다. CoderPad에서 자주 보는 검색, loading, empty, stale response 처리를 구현해야 한다.

## 요구사항

- 검색 input을 controlled component로 유지한다.
- `useDebounce`를 만들어 마지막 입력 후 지연된 검색어만 요청에 사용한다.
- mock API 함수를 만들고 Promise 기반으로 상품 목록을 반환한다.
- `loading`, `error`, `data`, `empty` 상태를 분리한다.
- 검색 결과가 없으면 `검색 결과가 없습니다.`를 렌더링한다.
- 실패 시 retry 버튼을 제공한다.
- 요청이 겹치면 최신 검색어의 결과만 반영한다.
- effect cleanup에서 `AbortController`나 request id 방식으로 stale response를 막는다.
- API response 타입과 UI model 타입을 분리한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- 빠르게 바뀐 검색어에서 이전 응답이 화면을 덮어쓰지 않아야 한다.
- loading 중에도 input value 업데이트는 즉시 반영되어야 한다.
- debounce와 loading/error/empty state가 함께 동작해야 한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-async-search dev
pnpm --filter @remind/practice-async-search test
```
