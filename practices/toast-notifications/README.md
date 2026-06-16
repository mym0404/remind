# Toast Notifications

## 목표

toast queue, live region, 수동 닫기, 자동 제거를 한 문제로 다룬다.

## 요구사항

- `addToast`와 `removeToast`를 named export로 제공한다.
- toast는 새 항목을 추가해도 기존 항목을 유지한다.
- live region은 `aria-live="polite"`로 알림을 전달한다.
- 각 toast는 직접 닫을 수 있다.
- 각 toast는 지연 시간 뒤 자동으로 제거된다.
- component unmount 시 pending timer를 정리한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-toast-notifications dev
pnpm --filter @remind/practice-toast-notifications test
```
