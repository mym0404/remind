# 기준 섹션

이 파일은 사이트에 반드시 포함할 섹션과 세부 체크 항목의 기준이다. 번호나 우선순위 라벨은 쓰지 않고, 타이틀 자체를 기준으로 검증한다. 각 섹션 문서는 `docs/sections/*.mdx`에 둔다.

## React 상태와 이벤트

- `useState`로 입력값, 선택값, 열림/닫힘 상태를 관리할 수 있는가?
- 배열 상태에서 추가/삭제/수정/토글을 불변 방식으로 처리할 수 있는가?
- 객체 상태를 spread로 안전하게 업데이트할 수 있는가?
- `onChange`, `onClick`, `onSubmit` 이벤트를 구현할 수 있는가?
- `React.ChangeEvent<HTMLInputElement>` 타입을 사용할 수 있는가?
- `React.FormEvent<HTMLFormElement>` 타입을 사용할 수 있는가?
- props callback을 적절한 시점에 호출할 수 있는가?
- `useRef`로 DOM element를 참조할 수 있는가?
- `useEffect`에서 event listener를 등록하고 cleanup할 수 있는가?

## 검색 / 필터 / 정렬 리스트

- 원본 데이터와 화면 표시 데이터를 분리할 수 있는가?
- 검색어를 controlled input으로 관리할 수 있는가?
- 검색어, 필터, 정렬 조건을 별도 state로 둘 수 있는가?
- `filter`, `sort`, `map`을 조합해 리스트를 렌더링할 수 있는가?
- 정렬 시 원본 배열을 mutate하지 않고 복사 후 정렬할 수 있는가?
- 표시 데이터를 `useMemo`로 계산할 수 있는가?
- 결과가 없을 때 empty state를 렌더링할 수 있는가?
- 검색/필터/정렬 조건이 늘어났을 때 상태 구조를 정리할 수 있는가?

## Form 구현

- input value를 React state로 관리할 수 있는가?
- 여러 field를 하나의 form state object로 관리할 수 있는가?
- checkbox, radio, select, textarea를 controlled component로 다룰 수 있는가?
- number input의 string/number 변환을 안전하게 처리할 수 있는가?
- submit 시 `preventDefault()`를 호출할 수 있는가?
- validation 로직을 별도 함수로 분리할 수 있는가?
- field별 error object를 만들 수 있는가?
- submit 중 button을 disabled 처리할 수 있는가?
- 성공/실패 상태를 렌더링할 수 있는가?
- form reset을 구현할 수 있는가?

## Form 접근성

- 모든 input에 `label`과 `htmlFor`를 연결할 수 있는가?
- input의 `id`와 label의 `htmlFor`를 일치시킬 수 있는가?
- placeholder를 label 대체재로 쓰지 않을 수 있는가?
- 에러 메시지에 id를 부여할 수 있는가?
- `aria-describedby`로 input과 에러 메시지를 연결할 수 있는가?
- 에러 상태를 `aria-invalid`로 표현할 수 있는가?
- 필수 입력값에 `required` 또는 `aria-required`를 적용할 수 있는가?
- validation 실패 시 첫 번째 invalid field로 focus를 이동시킬 수 있는가?
- 클릭 가능한 요소에 `div` 대신 `button`을 사용할 수 있는가?
- `button`의 `type="button"`과 `type="submit"`을 구분할 수 있는가?

## 비동기 데이터 로딩

- `fetch`와 `async/await`로 API 데이터를 불러올 수 있는가?
- `loading`, `error`, `data` 상태를 분리할 수 있는가?
- API 응답 타입을 TypeScript로 정의할 수 있는가?
- 빈 배열 응답을 empty state로 처리할 수 있는가?
- 실패 시 error message를 렌더링할 수 있는가?
- retry 함수를 구현할 수 있는가?
- `AbortController`로 요청 cleanup을 구현할 수 있는가?
- 최신 요청 결과만 반영하도록 race condition을 방지할 수 있는가?
- 요청 파라미터가 바뀔 때 데이터를 다시 불러올 수 있는가?
- API 응답을 UI 모델로 변환할 수 있는가?

## Custom Hook

- 컴포넌트 내부 상태 로직을 custom hook으로 분리할 수 있는가?
- `useFetch`를 구현할 수 있는가?
- `useDebounce`를 구현할 수 있는가?
- `useLocalStorage`를 구현할 수 있는가?
- `useClickOutside`를 구현할 수 있는가?
- `usePrevious`를 구현할 수 있는가?
- hook 인자 타입을 정의할 수 있는가?
- hook 반환 타입을 정의할 수 있는가?
- hook 내부 `useEffect` dependency를 올바르게 관리할 수 있는가?
- hook이 특정 컴포넌트에 과하게 결합되지 않게 설계할 수 있는가?

## useDebounce

- `value`, `delay`를 인자로 받는 hook을 만들 수 있는가?
- 내부에 debounced value state를 둘 수 있는가?
- `setTimeout`으로 지연 업데이트를 구현할 수 있는가?
- value 변경 시 이전 timer를 cleanup할 수 있는가?
- 마지막 입력 후 delay가 지난 값만 반환할 수 있는가?
- 검색 input에 debounced value를 연결할 수 있는가?
- debounced value 변경 시 API 요청을 트리거할 수 있는가?
- debounce와 loading/error/empty state를 함께 다룰 수 있는가?

## Modal

- `isOpen` 상태로 modal을 열고 닫을 수 있는가?
- 닫기 버튼을 구현할 수 있는가?
- backdrop 클릭 시 닫을 수 있는가?
- Escape 키로 닫을 수 있는가?
- `useEffect`로 keydown listener를 등록할 수 있는가?
- unmount 또는 close 시 listener cleanup을 할 수 있는가?
- `role="dialog"`를 적용할 수 있는가?
- `aria-modal="true"`를 적용할 수 있는가?
- modal 제목을 `aria-labelledby`로 연결할 수 있는가?
- modal 설명을 `aria-describedby`로 연결할 수 있는가?
- modal open 시 초기 focus를 지정할 수 있는가?
- modal close 후 trigger element로 focus를 복귀시킬 수 있는가?

## Toast

- toast item 타입을 정의할 수 있는가?
- toast 배열 상태를 관리할 수 있는가?
- `showToast(message)` 함수를 구현할 수 있는가?
- 일정 시간 후 toast를 자동 제거할 수 있는가?
- 여러 toast를 동시에 렌더링할 수 있는가?
- timer cleanup을 처리할 수 있는가?
- 성공/실패/정보 toast variant를 구분할 수 있는가?
- ToastProvider와 `useToast` hook으로 전역 toast를 구현할 수 있는가?
- toast에 `role="status"` 또는 `aria-live`를 적용할 수 있는가?
- 수동 닫기 버튼을 제공할 수 있는가?

## TypeScript 타입 설계

- API response 타입을 정의할 수 있는가?
- list item 타입을 정의할 수 있는가?
- component props 타입을 정의할 수 있는가?
- event handler 타입을 정의할 수 있는가?
- optional field와 nullable field를 구분할 수 있는가?
- union type으로 상태를 표현할 수 있는가?
- discriminated union으로 async state를 표현할 수 있는가?
- generic hook 타입을 작성할 수 있는가?
- `Record`, `Pick`, `Omit`, `Partial`을 사용할 수 있는가?
- `HTMLElement`, `HTMLDivElement`, `HTMLButtonElement`, `HTMLInputElement` 차이를 구분할 수 있는가?

## 컴포넌트 분리

- 큰 컴포넌트를 작은 컴포넌트로 분리할 수 있는가?
- UI 컴포넌트와 상태 로직 hook을 분리할 수 있는가?
- 상태를 어디에 둘지 결정할 수 있는가?
- props drilling이 심해질 때 Context로 옮길 수 있는가?
- callback props를 `onSelect`, `onSubmit`, `onClose`, `onOpenChange`처럼 설계할 수 있는가?
- 리스트 렌더링 시 안정적인 `key`를 사용할 수 있는가?
- 재사용 가능한 UI 컴포넌트의 props API를 설계할 수 있는가?

## React 최신 Hook / Concurrent UI

- `useTransition`으로 non-blocking state update를 구현할 수 있는가?
- `isPending`을 이용해 transition 중 pending UI를 보여줄 수 있는가?
- `startTransition`으로 우선순위가 낮은 상태 업데이트를 감쌀 수 있는가?
- input value 업데이트는 transition으로 처리하면 안 된다는 점을 이해하는가?
- `useDeferredValue`로 무거운 리스트 렌더링을 지연시킬 수 있는가?
- `useDeferredValue`와 debounce의 차이를 설명할 수 있는가?
- `useOptimistic`으로 optimistic UI를 구현할 수 있는가?
- optimistic update 실패 시 rollback 또는 error 상태를 처리할 수 있는가?
- `useActionState`의 기본 목적을 이해하고 사용할 수 있는가?
- `useId`로 접근성 id를 안정적으로 생성할 수 있는가?

## Ref / Imperative API

- `useRef`로 DOM node를 저장할 수 있는가?
- `useRef`로 렌더링과 무관한 mutable value를 저장할 수 있는가?
- `useImperativeHandle`로 외부에 노출할 ref handle을 커스터마이즈할 수 있는가?
- 부모에서 자식 input의 `focus`, `clear`, `scrollIntoView` 같은 imperative method를 호출하게 만들 수 있는가?
- React 19에서 `ref`를 prop으로 받을 수 있다는 점을 이해하는가?
- imperative API를 과도하게 노출하지 않고 필요한 메서드만 제한할 수 있는가?

## Context + Provider

- `createContext`로 context를 만들 수 있는가?
- Provider에서 state와 action을 제공할 수 있는가?
- `useContext`를 감싼 custom hook을 만들 수 있는가?
- Provider 바깥에서 hook을 사용하면 에러를 던지게 만들 수 있는가?
- ToastProvider를 구현할 수 있는가?
- ModalProvider를 구현할 수 있는가?
- Context value를 `useMemo`로 안정화할 수 있는가?
- Context가 불필요한 리렌더링을 만들 수 있음을 이해하고 분리할 수 있는가?

## useReducer

- action type을 union type으로 정의할 수 있는가?
- reducer 함수에서 상태 전이를 처리할 수 있는가?
- 복잡한 form 상태를 reducer로 관리할 수 있는가?
- filter/sort/search 상태를 reducer로 관리할 수 있는가?
- cart, wizard, modal stack 같은 상태를 reducer로 설계할 수 있는가?
- reducer에서 상태를 직접 mutate하지 않을 수 있는가?

## React Router

- list page와 detail page를 구성할 수 있는가?
- `useParams`로 route param을 읽을 수 있는가?
- `useNavigate`로 페이지 이동을 할 수 있는가?
- 404 fallback route를 만들 수 있는가?
- nested route의 기본 구조를 이해하고 사용할 수 있는가?
- route param을 기반으로 상세 데이터를 조회할 수 있는가?

## URL Search Params

- 검색어를 URL query string에 반영할 수 있는가?
- 필터 상태를 URL query string에 반영할 수 있는가?
- URL query string에서 초기 state를 복원할 수 있는가?
- `URLSearchParams`를 사용할 수 있는가?
- React Router의 `useSearchParams`를 사용할 수 있는가?
- query string 변경 시 리스트 결과를 다시 계산할 수 있는가?
- 불필요한 history entry가 쌓이지 않도록 replace 옵션을 사용할 수 있는가?

## Autocomplete

- input value를 관리할 수 있는가?
- debounce된 검색어로 API를 호출할 수 있는가?
- loading/error/empty 상태를 처리할 수 있는가?
- 추천 목록을 렌더링할 수 있는가?
- 방향키로 active item을 이동할 수 있는가?
- Enter로 선택할 수 있는가?
- Escape로 닫을 수 있는가?
- 바깥 클릭 시 닫을 수 있는가?
- 선택된 값을 input에 반영할 수 있는가?
- `role="combobox"`를 적용할 수 있는가?
- 추천 목록에 `role="listbox"`를 적용할 수 있는가?
- 추천 항목에 `role="option"`을 적용할 수 있는가?
- active item을 `aria-activedescendant`로 표현할 수 있는가?
- input과 listbox를 `aria-controls`로 연결할 수 있는가?

## Pagination

- 현재 page state를 관리할 수 있는가?
- page size를 기준으로 데이터를 slice할 수 있는가?
- 서버 pagination 요청을 만들 수 있는가?
- `hasNext`, `hasPrev`를 계산할 수 있는가?
- loading 중 중복 요청을 막을 수 있는가?
- page 변경 시 데이터를 다시 불러올 수 있는가?
- page 변경 후 스크롤 위치를 조정할 수 있는가?
- pagination button에 적절한 disabled 상태를 줄 수 있는가?

## Infinite Scroll

- `IntersectionObserver`를 사용할 수 있는가?
- sentinel element에 ref를 연결할 수 있는가?
- 다음 page를 append할 수 있는가?
- loading 중 중복 호출을 방지할 수 있는가?
- `hasMore`가 false일 때 요청을 멈출 수 있는가?
- observer cleanup을 처리할 수 있는가?
- `root`, `rootMargin`, `threshold` 옵션을 이해하고 조정할 수 있는가?
- intersection callback에서 stale closure 문제를 방지할 수 있는가?
- 리스트가 짧아 sentinel이 바로 보이는 경우 연속 호출을 방지할 수 있는가?

## Optimistic Update

- 서버 응답 전에 UI를 먼저 업데이트할 수 있는가?
- 실패 시 이전 상태로 rollback할 수 있는가?
- 성공 시 서버 응답 기준으로 상태를 확정할 수 있는가?
- 요청 중 같은 항목에 대한 중복 액션을 막을 수 있는가?
- 실패 시 toast 또는 inline error를 표시할 수 있는가?
- `useOptimistic`을 사용할 수 있는가?
- `useOptimistic` 없이도 optimistic update를 직접 구현할 수 있는가?

## Error Boundary

- Error Boundary가 렌더링 에러를 잡는 용도임을 설명할 수 있는가?
- class component 기반 Error Boundary를 작성할 수 있는가?
- fallback UI를 렌더링할 수 있는가?
- 이벤트 핸들러나 async 에러는 Error Boundary가 직접 잡지 못한다는 점을 알고 있는가?
- 화면 단위로 Error Boundary를 배치할 수 있는가?
- retry/reset을 위한 key 기반 remount 방식을 설명할 수 있는가?

## Popover / Dropdown / Tooltip Positioning

- trigger element와 floating element를 `ref`로 참조할 수 있는가?
- `getBoundingClientRect()`로 element 위치와 크기를 계산할 수 있는가?
- viewport 기준 좌표와 document 기준 좌표 차이를 이해하는가?
- `window.scrollX`, `window.scrollY`로 scroll offset을 계산할 수 있는가?
- `getScrollOffset` 형태의 유틸 함수를 직접 만들 수 있는가?
- clipping boundary를 고려해 floating element가 화면 밖으로 나가지 않게 보정할 수 있는가?
- `getBoundedClipRect` 형태의 유틸로 viewport 또는 scroll container 내부의 가시 영역을 계산할 수 있는가?
- `top`, `bottom`, `left`, `right` placement를 계산할 수 있는가?
- 공간이 부족할 때 반대 방향으로 flip할 수 있는가?
- 화면 밖으로 삐져나간 만큼 shift할 수 있는가?
- trigger와 floating element 사이 offset을 줄 수 있는가?
- scroll container 내부에서 위치가 깨지는 문제를 다룰 수 있는가?
- `position: absolute`와 `position: fixed`의 차이를 이해하고 선택할 수 있는가?
- z-index stacking context 문제를 인지하고 portal 사용 여부를 판단할 수 있는가?
- resize/scroll 시 floating element 위치를 다시 계산할 수 있는가?
- trigger가 사라지거나 unmount될 때 floating element를 닫을 수 있는가?

## ResizeObserver

- `ResizeObserver`로 element 크기 변화를 감지할 수 있는가?
- trigger 또는 floating element 크기가 바뀔 때 위치를 다시 계산할 수 있는가?
- container 크기 변화에 따라 layout state를 갱신할 수 있는가?
- observer callback에서 과도한 setState를 방지할 수 있는가?
- observer를 cleanup할 수 있는가?
- `contentRect` 또는 `borderBoxSize`를 사용할 수 있는가?
- ResizeObserver loop 문제를 피하기 위해 DOM read/write를 분리할 수 있는가?

## MutationObserver

- `MutationObserver`로 DOM child 변경을 감지할 수 있는가?
- attribute 변경을 감지할 수 있는가?
- 외부 라이브러리나 portal로 인해 DOM이 바뀌는 상황을 감지할 수 있는가?
- DOM 변경 후 floating element 위치를 다시 계산할 수 있는가?
- `childList`, `attributes`, `subtree` 옵션을 구분할 수 있는가?
- observer를 cleanup할 수 있는가?
- React state로 처리할 수 있는 문제와 MutationObserver가 필요한 문제를 구분할 수 있는가?

## IntersectionObserver

- `IntersectionObserver`로 element가 viewport에 들어왔는지 감지할 수 있는가?
- infinite scroll sentinel을 구현할 수 있는가?
- lazy loading 트리거를 구현할 수 있는가?
- `root`, `rootMargin`, `threshold` 옵션을 사용할 수 있는가?
- observer callback에서 중복 요청을 막을 수 있는가?
- observer를 cleanup할 수 있는가?
- scroll event listener 방식과 IntersectionObserver 방식의 차이를 설명할 수 있는가?
- popover trigger나 anchor가 화면 밖으로 나갔을 때 floating element를 닫거나 숨길 수 있는가?

## ARIA / Keyboard Interaction

- native element를 우선 사용하고 불필요한 ARIA를 피할 수 있는가?
- `button`, `input`, `select`, `dialog` 등 semantic element를 적절히 사용할 수 있는가?
- `aria-label`과 `aria-labelledby`를 구분할 수 있는가?
- `aria-describedby`를 error/help text 연결에 사용할 수 있는가?
- `aria-expanded`로 popover/dropdown open 상태를 표현할 수 있는가?
- `aria-controls`로 trigger와 controlled element를 연결할 수 있는가?
- `aria-haspopup`를 menu/listbox/dialog 등에 맞게 사용할 수 있는가?
- `aria-selected`와 `aria-checked`를 구분할 수 있는가?
- `aria-disabled`와 실제 `disabled` 차이를 이해하는가?
- `aria-live`로 비동기 상태 변화나 toast 메시지를 알릴 수 있는가?
- roving tabindex 패턴을 구현할 수 있는가?
- `aria-activedescendant` 패턴을 구현할 수 있는가?
- Escape로 닫기를 구현할 수 있는가?
- Enter/Space로 선택을 구현할 수 있는가?
- ArrowUp/ArrowDown으로 option 이동을 구현할 수 있는가?
- Tab 이동 순서를 깨지 않게 구현할 수 있는가?
- focus가 시각적으로 보이도록 유지할 수 있는가?
- disabled item이 keyboard navigation에서 어떻게 동작해야 하는지 판단할 수 있는가?

## Portal

- `createPortal`을 사용할 수 있는가?
- modal/toast/dropdown을 DOM 계층 밖으로 렌더링할 수 있는가?
- z-index 문제를 Portal로 완화할 수 있는가?
- Portal 사용 시 event bubbling이 React tree 기준으로 동작한다는 점을 이해하는가?
- Portal 대상 DOM node가 없을 때 생성하거나 fallback 처리할 수 있는가?

## Focus Trap

- modal 내부 focusable element를 찾을 수 있는가?
- Tab/Shift+Tab 이동을 modal 내부로 제한할 수 있는가?
- modal open 시 첫 focus 위치를 지정할 수 있는가?
- modal close 후 이전 focus로 복귀시킬 수 있는가?
- focusable selector를 구성할 수 있는가?
- disabled/hidden element를 focus 대상에서 제외할 수 있는가?

## Compound Component 패턴

- `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` 구조를 만들 수 있는가?
- Context로 compound component 내부 상태를 공유할 수 있는가?
- Accordion을 compound component로 설계할 수 있는가?
- controlled/uncontrolled API를 compound component에 적용할 수 있는가?
- component 간 조합 가능성을 높이는 props 구조를 설계할 수 있는가?

## Controlled / Uncontrolled 조합

- `value`가 있으면 controlled로 동작하게 만들 수 있는가?
- `defaultValue`가 있으면 uncontrolled 초기값으로 처리할 수 있는가?
- `onChange` callback을 외부에 노출할 수 있는가?
- Modal의 `open`, `defaultOpen`, `onOpenChange` 패턴을 이해하는가?
- 내부 state와 외부 controlled state가 충돌하지 않게 설계할 수 있는가?
- controlled 여부를 boolean으로 안정적으로 판별할 수 있는가?

## 성능 최적화 기초

- derived data에 `useMemo`를 적용할 수 있는가?
- callback props에 `useCallback`을 적용할 수 있는가?
- 불필요한 state를 줄이고 계산 가능한 값은 state로 두지 않을 수 있는가?
- 리스트 item에 안정적인 key를 줄 수 있는가?
- 큰 리스트에서 virtualization이 필요한 상황을 설명할 수 있는가?
- scroll/resize handler를 throttle 또는 debounce할 수 있는가?
- layout thrashing이 발생하는 read/write 패턴을 피할 수 있는가?
- `getBoundingClientRect()` 같은 layout read와 style 변경 같은 layout write를 분리할 수 있는가?

## Virtualized List

- 큰 리스트에서 모든 item을 렌더링하지 않아야 하는 이유를 설명할 수 있는가?
- visible range를 계산하는 기본 원리를 이해하는가?
- item height가 고정일 때 start/end index를 계산할 수 있는가?
- scroll offset 기반으로 렌더링할 item 범위를 계산할 수 있는가?
- 전체 높이를 placeholder로 유지하고 visible item만 렌더링하는 구조를 설명할 수 있는가?

## React Query / Server State

- server state와 client state를 구분할 수 있는가?
- cache, staleTime, refetch 개념을 설명할 수 있는가?
- query key를 어떻게 설계할지 설명할 수 있는가?
- mutation 성공 후 invalidate 또는 optimistic update를 적용할 수 있는가?
- 라이브러리 없이도 기본적인 fetch/cache 구조를 간단히 구현할 수 있는가?

## Suspense

- Suspense가 loading boundary를 제공한다는 점을 이해하는가?
- Error Boundary와 Suspense의 역할 차이를 설명할 수 있는가?
- 비동기 UI를 boundary 단위로 나누는 이유를 설명할 수 있는가?
- Suspense 기반 data fetching과 일반 loading state 방식의 차이를 설명할 수 있는가?

## 검증 기준

- React 공식 문서에서 hook 사용법을 확인한다.
- TypeScript 공식 문서나 handbook에서 타입 문법을 확인한다.
- MDN에서 DOM API 사용법을 확인한다.
- MDN에서 `IntersectionObserver`, `ResizeObserver`, `MutationObserver` 옵션을 확인한다.
- MDN에서 `getBoundingClientRect`, `scrollX`, `scrollY`, `Element`, `HTMLElement` 관련 API를 확인한다.
- WAI-ARIA Authoring Practices에서 combobox, dialog, menu, tabs 패턴을 확인한다.
- npm 라이브러리 사용이 허용될 경우 문서를 보고 최소 API만 적용한다.
- 검색한 코드를 그대로 복붙하지 않고 현재 문제의 상태 구조와 타입에 맞게 바꾼다.
