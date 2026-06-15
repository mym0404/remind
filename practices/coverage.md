# Practice Concept Coverage

이 매트릭스는 practice set이 저장소의 React + TypeScript 개념을 빠짐없이 묻는지 확인하기 위한 기준이다.

## 커버리지 요약

- practice package: 8개
- 커버 개념: 44개
- 기준: CoderPad 공개 React 예시, 현재 열린 CoderPad File Tree Challenge, `references/sections.md`

## 개념 매트릭스

| Practice | 검증 개념 |
|---|---|
| `form-checkout` | controlled input, form object state, checkbox/radio/textarea, number parsing, `preventDefault`, validation 함수 분리, field error object, `aria-describedby`, `aria-invalid`, 첫 invalid focus, submit disabled, reset, React event type, form model type |
| `async-search` | fetch 흐름, async/await, loading/error/data/empty state, retry, debounce, `AbortController`, stale response 방지, request parameter effect, API response type, UI model 변환 |
| `reusable-state-hooks` | custom hook, `useLocalStorage`, `usePrevious`, `useReducer`, action discriminated union, immutable update, Context Provider, Provider guard hook, context value memoization, state 위치 결정 |
| `routed-directory-browser` | nested data transform, recursive rendering, stable key, folder/file sorting, React Router route, `useParams`, detail view, 404 fallback, `URLSearchParams`, URL 기반 state 복원 |
| `accessible-autocomplete` | combobox, listbox, option, `aria-controls`, `aria-activedescendant`, Arrow key, Enter select, Escape close, outside click, selected value 반영, empty state |
| `overlay-workbench` | modal open/close, backdrop click, Escape close, keydown listener cleanup, `role="dialog"`, `aria-modal`, `aria-labelledby`, initial focus, focus restore, portal, event propagation, toast queue, timer cleanup, `role="status"` |
| `observer-positioning-feed` | `IntersectionObserver`, sentinel ref, page append, duplicate loading guard, `hasMore`, observer cleanup, stale closure 방지, `getBoundingClientRect`, scroll/viewport coordinate, placement, flip, shift, `ResizeObserver` |
| `performance-dashboard` | derived state 제거, `useMemo`, stable key, virtualized visible range, overscan, layout cost 제한, `useTransition`, `useDeferredValue`, input priority, Suspense fallback, Error Boundary, optimistic UI |

## CoderPad 반영 지점

- 실제 열린 예시는 File Tree Challenge였고, `routed-directory-browser`가 그 구조를 직접 반영한다.
- 공식 CoderPad 예시의 Todo, controlled input, virtualized list, file tree, optimistic update 유형을 나머지 practice에 나눠 반영했다.
- 각 package는 CoderPad처럼 얇은 Vite 프로젝트이며 `src/App.tsx`를 중심으로 고치게 되어 있다.
- 각 package는 README 요구사항과 `src/App.test.tsx` 채점 기준을 함께 둔다.
