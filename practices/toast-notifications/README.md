# Toast Notifications

## 목표

toast queue, live region, 수동 닫기, 자동 제거를 한 문제로 다룬다.

## 요구사항

- toast 배열 상태를 관리한다.
- role="status"나 aria-live를 둔다.
- 수동 닫기와 timer cleanup을 구현한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-toast-notifications dev
pnpm --filter @remind/practice-toast-notifications test
```
