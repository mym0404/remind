# useDebounce

## 언제 쓰나

사용자가 검색 input에 글자를 입력할 때마다 API를 호출하면 요청이 너무 자주 나간다. `useDebounce`는 마지막 입력 후 지정한 시간이 지나야 값을 바꿔서, 실제 요청은 안정된 검색어로만 보내게 한다.

hook은 `value`와 `delay`를 인자로 받는다. 원래 `value`는 입력과 함께 바로 바뀌고, 내부의 debounced state는 `delay`가 지난 뒤에 따라간다.

검색, 자동완성, 서버 필터처럼 사용자가 짧은 시간에 값을 여러 번 바꾸는 화면에 잘 맞는다.

## 바로 쓰는 코드

```tsx
import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

type SearchResult = {
  id: string;
  title: string;
};

type SearchState =
  | { status: "idle"; items: SearchResult[] }
  | { status: "loading"; items: SearchResult[] }
  | { status: "success"; items: SearchResult[] }
  | { status: "error"; items: SearchResult[]; message: string };

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 400);
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
    items: [],
  });

  useEffect(() => {
    if (debouncedQuery === "") {
      setSearchState({ status: "idle", items: [] });
      return;
    }

    const abortController = new AbortController();

    const search = async () => {
      setSearchState({ status: "loading", items: [] });

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: abortController.signal },
        );

        if (!response.ok) {
          throw new Error("검색 결과를 가져오지 못했습니다.");
        }

        const items = (await response.json()) as SearchResult[];
        setSearchState({ status: "success", items });
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        setSearchState({
          status: "error",
          items: [],
          message:
            error instanceof Error ? error.message : "검색 중 문제가 생겼습니다.",
        });
      }
    };

    void search();

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery]);

  const hasNoResult =
    searchState.status === "success" && searchState.items.length === 0;

  return (
    <section>
      <label htmlFor="search">검색어</label>
      <input
        id="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="예: React"
      />

      {searchState.status === "loading" && <p>검색 중입니다.</p>}
      {searchState.status === "error" && (
        <p role="alert">{searchState.message}</p>
      )}
      {hasNoResult && <p>검색 결과가 없습니다.</p>}
      {searchState.status === "success" && searchState.items.length > 0 && (
        <ul>
          {searchState.items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
```

## 실수 포인트

- `setTimeout`만 쓰고 cleanup을 빼면 이전 timer가 늦게 실행되어 오래된 값이 반영될 수 있다.
- `useEffect` dependency에서 `value`나 `delay`를 빼면 hook이 최신 입력값이나 대기 시간을 제대로 반영하지 못한다.
- API 요청은 원본 `query`가 아니라 `debouncedQuery`가 바뀔 때 트리거한다.
- `loading`은 요청을 시작할 때만 켜고, `error`와 `empty`는 응답 결과가 확정된 뒤에 나눠서 보여준다.
- empty state는 초기 상태가 아니라, 요청이 성공했고 결과 배열이 비었을 때만 보여준다.

## 참고

- [React useEffect](https://react.dev/reference/react/useEffect)
