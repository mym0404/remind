# Context Provider Guard

## 목표

Provider 바깥 hook 사용을 명확한 에러로 막고 context value를 안정화한다.

## 요구사항

- Provider와 useTheme hook을 만든다.
- Provider 밖에서는 에러를 던진다.
- context value는 useMemo로 안정화한다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- starter는 실행 가능한 얇은 골격만 제공한다.
- 테스트가 요구하는 사용자 동작과 순수 로직을 직접 구현한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-context-provider-guard dev
pnpm --filter @remind/practice-context-provider-guard test
```
