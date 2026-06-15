# Local Storage Hook

## 목표

state와 localStorage를 같은 API로 묶고 깨진 저장값을 기본값으로 복구한다.

## 요구사항

- useLocalStorage hook을 만든다.
- 초기 mount에서 저장값을 읽는다.
- 깨진 JSON은 기본값으로 처리한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-local-storage-hook dev
pnpm --filter @remind/practice-local-storage-hook test
```
