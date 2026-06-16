# Stale Response Guard

## 목표

늦게 끝난 이전 요청이 최신 화면을 덮지 못하게 막는다.

## 요구사항

- 검색어 변경마다 요청을 보낸다.
- 최신 요청 id나 AbortController로 stale response를 무시한다.
- loading 중에도 input은 즉시 갱신된다.
- 최신 응답 판별 로직은 `shouldApplyResponse` 같은 이름 있는 helper로 드러낸다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-stale-response-guard dev
pnpm --filter @remind/practice-stale-response-guard test
```
