![Remind](./public/readme-banner.png)

# Remind

React Live Coding in your mind.

React와 TypeScript 개념을 빠르게 복습하고, CoderPad형 라이브 코딩 문제로 직접 확인하는 저장소입니다.

## 구성

| 경로 | 설명 |
|---|---|
| `docs/` | Rspress 문서 사이트 원문 |
| `docs/sections/*.mdx` | React + TypeScript 개념별 문서 |
| `references/sections.md` | 문서 섹션과 세부 체크 항목 기준 |
| `practices/` | CoderPad형 React + TypeScript practice workspace |
| `practices/coverage.md` | practice별 개념 커버리지 매트릭스 |
| `public/readme-banner.png` | README와 Open Graph 용도 배너 이미지 |

## Practice Sets

각 practice는 독립 Vite React 앱입니다. `src/App.tsx`에서 starter를 고치고, `README.md`와 `src/App.test.tsx`를 기준으로 채점합니다.

| 패키지 | 중심 개념 |
|---|---|
| `@remind/practice-form-checkout` | form state, validation, accessibility, TypeScript event/model 타입 |
| `@remind/practice-async-search` | fetch 흐름, debounce, loading/error/empty, race condition |
| `@remind/practice-reusable-state-hooks` | custom hook, localStorage, reducer, Context |
| `@remind/practice-routed-directory-browser` | CoderPad File Tree형 nested data, route/detail, URL state |
| `@remind/practice-accessible-autocomplete` | combobox, keyboard, ARIA, focus, outside click |
| `@remind/practice-overlay-workbench` | modal, portal, focus restore, Escape, toast, event propagation |
| `@remind/practice-observer-positioning-feed` | IntersectionObserver, ResizeObserver, DOMRect, floating position |
| `@remind/practice-performance-dashboard` | virtualization, memoization, deferred/transition UI, stable key |

## 실행 방법

```bash
pnpm install
pnpm dev
```

```bash
pnpm validate:codeblocks
pnpm build
```

practice 하나를 실행할 때는 package filter를 사용합니다.

```bash
pnpm --filter @remind/practice-routed-directory-browser dev
pnpm --filter @remind/practice-routed-directory-browser test
```

모든 practice의 Vite build를 확인할 때는 아래 명령을 사용합니다.

```bash
pnpm -r --filter './practices/*' build
```

## 배포 URL

[https://mym0404.github.io/remind/](https://mym0404.github.io/remind/)
