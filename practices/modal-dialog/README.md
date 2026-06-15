# Modal Dialog

## 목표

dialog ARIA, focus 이동, Escape와 backdrop 닫기를 한 modal 문제 안에서 구현한다.

## 요구사항

- role="dialog"와 aria-modal을 적용한다.
- 열릴 때 닫기 버튼으로 focus를 옮긴다.
- 닫힐 때 trigger focus를 복귀한다.
- Escape와 backdrop click으로 닫는다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-modal-dialog dev
pnpm --filter @remind/practice-modal-dialog test
```
