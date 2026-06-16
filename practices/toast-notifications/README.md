# Toast Notifications

## 목표

toast queue, live region, 수동 닫기, 자동 제거를 한 문제로 다룬다.

## 요구사항

- toast를 추가하면 기존 toast는 유지되고 새 toast가 queue 뒤에 보인다.
- live region은 `aria-live="polite"`로 알림을 전달한다.
- 각 toast의 닫기 버튼을 누르면 해당 toast만 사라진다.
- 지정 시간이 지나면 해당 toast가 자동으로 사라진다.
- component unmount 시 pending timer가 정리된다.
- `addToast`와 `removeToast` named export로 queue 결과를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-toast-notifications dev
pnpm --filter @remind/practice-toast-notifications test
```
