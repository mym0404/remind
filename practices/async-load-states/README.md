# Async Load States

## 목표

네트워크 요청의 loading, error, data, empty 상태를 분리한다.

## 요구사항

- 초기 요청 시 loading을 보여준다.
- 요청 성공 시 상품 목록을 보여준다.
- 빈 배열은 empty state로 처리한다.
- 실패는 error message로 보여준다.
- 실패 후 loading UI가 남지 않아야 한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- `App`에 test-only mode prop을 추가하지 않는다.
- `fetchProducts`는 named export로 유지한다.
- loader 경계나 상태 helper를 통해 loading, success, empty, error 상태를 검증 가능하게 분리한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-async-load-states dev
pnpm --filter @remind/practice-async-load-states test
```
