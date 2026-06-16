# Context Provider Guard

## 목표

Provider 바깥 hook 사용을 명확한 에러로 막고 context value를 안정화한다.

## 요구사항

- `ThemeProvider`와 `useTheme`를 named export로 만든다.
- Provider 밖에서 `useTheme`를 호출하면 `useTheme must be used within ThemeProvider` 에러를 던진다.
- Provider 안에서는 초기 테마가 `light`다.
- 버튼으로 `dark`와 `light`를 오가며 토글한다.
- context value는 관련 없는 rerender에서 같은 참조를 유지한다.

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
