# Modal Dialog

## 목표

dialog ARIA, focus 이동, Escape와 backdrop 닫기를 한 modal 문제 안에서 구현한다.

## 요구사항

- 열기 버튼을 누르면 `role="dialog"`와 `aria-modal="true"`가 있는 modal이 보인다.
- modal이 열리면 focus가 닫기 버튼으로 이동한다.
- 닫기 버튼, Escape, backdrop click을 실행하면 modal이 사라진다.
- modal이 닫히면 focus가 열기 버튼으로 돌아간다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-modal-dialog dev
pnpm --filter @remind/practice-modal-dialog test
```
