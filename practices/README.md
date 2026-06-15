# CoderPad React + TypeScript Practice Sets

이 폴더는 React + TypeScript 라이브 코딩 대비용 practice workspace다.

각 패키지는 CoderPad 예시처럼 얇은 Vite 프로젝트로 구성되어 있다. `src/App.tsx`에서 starter 코드를 고치고, `README.md`의 요구사항과 `src/App.test.tsx`의 테스트를 기준으로 채점한다.

## 패키지

| 패키지 | 중심 개념 |
|---|---|
| `form-checkout` | form state, validation, accessibility, TypeScript event/model 타입 |
| `async-search` | fetch 흐름, debounce, loading/error/empty, race condition |
| `reusable-state-hooks` | custom hook, localStorage, reducer, Context, 상태 분리 |
| `routed-directory-browser` | CoderPad File Tree형 nested data, route/detail, URL state |
| `accessible-autocomplete` | combobox, keyboard, ARIA, focus, outside click |
| `overlay-workbench` | modal, portal, focus restore, Escape, toast, event propagation |
| `observer-positioning-feed` | IntersectionObserver, ResizeObserver, DOMRect, floating position |
| `performance-dashboard` | virtualization, memoization, deferred/transition UI, stable key |

## 실행

```bash
pnpm --filter @remind/practice-form-checkout dev
pnpm --filter @remind/practice-form-checkout test
```

패키지 이름만 바꾸면 다른 practice도 같은 방식으로 실행할 수 있다.
