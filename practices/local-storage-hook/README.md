# Local Storage Hook

## 목표

state와 localStorage를 같은 API로 묶고 깨진 저장값을 기본값으로 복구한다.

## 요구사항

- 화면이 열리면 localStorage에 저장된 값이 초기 UI에 보인다.
- 값을 바꾸면 React state와 localStorage 값이 함께 바뀐다.
- 저장된 JSON이 깨져 있으면 기본값이 보인다.
- reset을 실행하면 UI와 localStorage가 기본값으로 돌아간다.
- `useLocalStorage` hook은 named export로 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-local-storage-hook dev
pnpm --filter @remind/practice-local-storage-hook test
```
