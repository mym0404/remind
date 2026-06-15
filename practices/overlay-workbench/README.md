# Overlay Workbench

## 목표

modal과 toast를 실제 제품 UI처럼 동작하게 만든다.

현재 코드는 modal과 toast를 단순 렌더링한다. focus, cleanup, portal, event propagation을 직접 다뤄야 한다.

## 요구사항

- modal은 `role="dialog"`와 `aria-modal="true"`를 가진다.
- modal 제목을 `aria-labelledby`로 연결한다.
- 열릴 때 닫기 버튼이나 첫 interactive element로 focus를 이동한다.
- 닫힐 때 trigger element로 focus를 복귀시킨다.
- Escape 키로 modal을 닫는다.
- backdrop 클릭으로 modal을 닫되, 내부 클릭은 닫히지 않아야 한다.
- `createPortal`로 overlay를 body 아래에 렌더링한다.
- modal keydown listener와 toast timer를 cleanup한다.
- toast는 `role="status"` 또는 `aria-live`를 가진다.
- toast는 일정 시간 후 자동 제거되고 수동 닫기도 가능해야 한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- event propagation을 막아야 하는 위치와 막으면 안 되는 위치를 구분한다.
- timer가 남아 unmount 후 state update를 만들지 않아야 한다.
- portal을 써도 React event 흐름을 이해하고 처리해야 한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-overlay-workbench dev
pnpm --filter @remind/practice-overlay-workbench test
```
