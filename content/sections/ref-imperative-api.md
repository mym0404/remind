# Ref / Imperative API

## 언제 쓰나

`ref`는 화면에 보이는 값이 아니라 DOM node나 렌더링과 무관한 값을 잡아둘 때 쓴다. input에 focus를 주거나 특정 요소로 스크롤해야 할 때는 DOM node를 `useRef`로 저장한다.

렌더링에 쓰지 않는 값도 `useRef`에 둘 수 있다. 마지막 제출 검색어, timer id, 외부 라이브러리 instance처럼 값은 유지해야 하지만 값이 바뀌어도 다시 렌더링할 필요가 없는 경우다.

부모가 자식 내부 DOM을 직접 만져야 할 때는 DOM node 전체를 넘기지 않는다. `useImperativeHandle`로 `focus`, `clear`, `scrollIntoView`처럼 필요한 method만 제한해서 노출한다.

React 19 기준으로 컴포넌트는 `ref`를 prop으로 받을 수 있다. 이때도 자식 컴포넌트 안에서는 내부 DOM ref와 외부에 공개할 handle을 분리한다.

## 바로 쓰는 코드

```tsx
import {
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type Ref,
} from "react";

type SearchInputHandle = {
  clear: () => void;
  focus: () => void;
  scrollIntoView: () => void;
};

type SearchInputProps = {
  ref?: Ref<SearchInputHandle>;
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ ref, value, onChange }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      clear: () => {
        onChange("");
        inputRef.current?.focus();
      },
      focus: () => {
        inputRef.current?.focus();
      },
      scrollIntoView: () => {
        inputRef.current?.scrollIntoView({ block: "center" });
      },
    }),
    [onChange],
  );

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return (
    <input
      id="search-keyword"
      ref={inputRef}
      value={value}
      onChange={handleChange}
      placeholder="검색어"
    />
  );
};

export const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<SearchInputHandle>(null);
  const lastSubmittedQueryRef = useRef("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuery = query.trim();

    if (!nextQuery) {
      searchInputRef.current?.focus();
      return;
    }

    if (lastSubmittedQueryRef.current === nextQuery) {
      searchInputRef.current?.scrollIntoView();
      return;
    }

    lastSubmittedQueryRef.current = nextQuery;
    console.log("search", nextQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-keyword">검색어</label>
      <SearchInput ref={searchInputRef} value={query} onChange={setQuery} />

      <button type="submit">검색</button>
      <button type="button" onClick={() => searchInputRef.current?.clear()}>
        지우기
      </button>
    </form>
  );
};
```

## 실수 포인트

- `ref.current`를 렌더링 중에 읽고 화면 분기 조건으로 쓰면 React 상태 흐름과 어긋난다.
- 화면에 보여야 하는 값은 `useRef`가 아니라 `useState`로 관리한다.
- DOM node 전체를 부모에게 공개하면 부모가 자식의 내부 구조에 강하게 묶인다.
- `useImperativeHandle`에는 부모가 실제로 호출해야 하는 method만 담는다.
- `clear` 같은 method가 내부 값을 바꾸면 controlled value도 함께 갱신해야 한다.
- `ref.current`는 처음 렌더링 때 비어 있을 수 있으므로 호출 시점에는 optional chaining으로 다룬다.
- `useImperativeHandle`의 dependency를 비우면 handle 안의 callback이 오래된 props를 볼 수 있다.

## 참고

- [React useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
