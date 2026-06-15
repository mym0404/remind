# Retryable Fetch

## 목표

실패한 요청을 같은 조건으로 다시 실행한다.

## 요구사항

- 실패 시 error message와 retry 버튼을 렌더링한다.
- retry는 마지막 요청 조건을 유지한다.
- 재시도 중에는 loading 상태를 다시 보여준다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-retryable-fetch dev
pnpm --filter @remind/practice-retryable-fetch test
```
