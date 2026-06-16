# Retryable Fetch

## 목표

실패한 요청을 같은 조건으로 다시 실행한다.

## 요구사항

- 요청이 실패하면 error message와 retry 버튼이 보인다.
- retry 버튼을 누르면 같은 요청 조건으로 loading UI가 다시 보인다.
- retry가 성공하면 error message가 사라지고 report data가 보인다.
- retry 중에는 중복 클릭으로 요청 상태가 꼬이지 않는다.
- `loadReport` named export로 성공과 실패 요청 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-retryable-fetch dev
pnpm --filter @remind/practice-retryable-fetch test
```
