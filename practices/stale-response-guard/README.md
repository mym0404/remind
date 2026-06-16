# Stale Response Guard

## 목표

늦게 끝난 이전 요청이 최신 화면을 덮지 못하게 막는다.

## 요구사항

- 검색어가 바뀔 때마다 새 요청이 시작된다.
- 최신 요청보다 늦게 끝난 이전 응답은 화면에 반영되지 않는다.
- loading 중에도 input value는 즉시 바뀐다.
- 최신 응답이 끝나면 해당 검색어의 결과만 보인다.
- `shouldApplyResponse` named export로 stale response 판별 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-stale-response-guard dev
pnpm --filter @remind/practice-stale-response-guard test
```
