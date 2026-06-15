# Performance Dashboard

## 목표

큰 metric 목록을 검색해도 입력이 버벅이지 않는 dashboard를 만든다.

현재 코드는 필터 결과 일부를 단순 slice로 렌더링한다. virtualization과 최신 React UI hook을 사용해 렌더링 비용을 줄여야 한다.

## 요구사항

- 검색 input은 즉시 업데이트한다.
- 무거운 필터 결과는 `useDeferredValue`나 `useTransition`으로 분리한다.
- input value 자체를 transition으로 감싸지 않는다.
- `getVisibleRange`를 이용해 보이는 row만 렌더링한다.
- overscan을 적용해 스크롤 중 빈 구간을 줄인다.
- row key는 안정적인 id를 사용한다.
- 불필요한 derived state를 만들지 않는다.
- 비용이 큰 계산은 dependency가 맞는 `useMemo`로 제한한다.
- Suspense fallback과 Error Boundary fallback을 구분해 배치한다.
- optimistic metric 추가나 임시 row 표시를 구현한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- 2000개 이상의 row를 한 번에 전부 렌더링하지 않는다.
- memoization dependency를 비워 두는 방식으로 stale UI를 만들지 않는다.
- 최신 React hook은 필요한 위치에만 사용한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-performance-dashboard dev
pnpm --filter @remind/practice-performance-dashboard test
```
