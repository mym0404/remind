# Context Provider Guard

## 목표

Provider 바깥 hook 사용을 명확한 에러로 막고 context value를 안정화한다.

## 요구사항

- Provider 안에서 화면을 열면 초기 테마가 `light`로 보인다.
- toggle 버튼을 누르면 `dark`와 `light`가 번갈아 보인다.
- Provider 밖에서 `useTheme`를 호출하면 provider 누락 에러가 난다.
- 관련 없는 rerender가 일어나도 context value 참조가 불필요하게 바뀌지 않는다.
- `ThemeProvider`와 `useTheme` named export로 provider 경계를 직접 확인할 수 있다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-context-provider-guard dev
pnpm --filter @remind/practice-context-provider-guard test
```
