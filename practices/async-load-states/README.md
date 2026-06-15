# Async Load States

## 목표

네트워크 요청의 loading, error, data, empty 상태를 분리한다.

## 요구사항

- 초기 요청 시 loading을 보여준다.
- 빈 배열은 empty state로 처리한다.
- 실패는 error message로 보여준다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-async-load-states dev
pnpm --filter @remind/practice-async-load-states test
```
