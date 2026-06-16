# Async Load States

## 목표

네트워크 요청의 loading, error, data, empty 상태를 분리한다.

## 요구사항

- 화면이 처음 열리면 상품 요청이 시작되고 loading UI가 보인다.
- 요청이 성공하면 상품 이름 목록이 화면에 보인다.
- 요청 결과가 빈 배열이면 empty state 문구가 보인다.
- 요청이 실패하면 error message가 보이고 loading UI는 사라진다.
- `fetchProducts`와 `toLoadState` named export로 loader와 상태 변환 결과를 직접 확인할 수 있다.
- `App` props를 확인하면 테스트 전용 mode prop이 없다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-async-load-states dev
pnpm --filter @remind/practice-async-load-states test
```
