# Custom Hook

## 언제 쓰나

컴포넌트 안의 상태 로직이 화면 코드보다 길어질 때 custom hook으로 뺀다. 컴포넌트는 값을 보여주고 이벤트를 연결하는 일에 집중하고, hook은 데이터 요청, 저장소 동기화, 타이머, DOM 이벤트 같은 동작을 맡는다.

- `useFetch`는 요청 상태와 재요청 함수를 한곳에서 관리할 때 쓴다.
- `useDebounce`는 검색어처럼 자주 바뀌는 값을 늦게 반영할 때 쓴다.
- `useLocalStorage`는 state와 `localStorage` 값을 맞춰야 할 때 쓴다.
- `useClickOutside`는 팝오버나 메뉴 바깥 클릭을 감지할 때 쓴다.
- `usePrevious`는 직전 값을 비교해야 할 때 쓴다.

좋은 hook은 특정 컴포넌트 이름이나 UI 구조를 몰라도 쓸 수 있다. 인자는 동작에 필요한 값만 받고, 반환값은 컴포넌트가 렌더링에 필요한 값과 함수만 담는다.

## 바로 쓰는 코드

```tsx
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

type FetchState<T> = {
  data: T | undefined;
  error: string | undefined;
  loading: boolean;
};

type UseFetchArgs = {
  enabled?: boolean;
  options?: RequestInit;
  url: string;
};

type UseFetchResult<T> = FetchState<T> & {
  refetch: () => void;
};

export const useFetch = <T,>({
  enabled = true,
  options,
  url,
}: UseFetchArgs): UseFetchResult<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });
  const [requestCount, setRequestCount] = useState(0);

  const refetch = useCallback(() => {
    setRequestCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setState((current) => ({ ...current, loading: false }));
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      setState((current) => ({ ...current, error: undefined, loading: true }));

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = (await response.json()) as T;
        setState({ data, error: undefined, loading: false });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          data: undefined,
          error: error instanceof Error ? error.message : "Unknown error",
          loading: false,
        });
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [enabled, options, requestCount, url]);

  return { ...state, refetch };
};

export const useDebounce = <T,>(value: T, delayMs: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [delayMs, value]);

  return debouncedValue;
};

type LocalStorageOptions<T> = {
  deserialize?: (value: string) => T;
  serialize?: (value: T) => string;
};

type LocalStorageResult<T> = readonly [T, Dispatch<SetStateAction<T>>];

const defaultDeserialize = <T,>(value: string): T => JSON.parse(value);

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
  {
    deserialize = defaultDeserialize<T>,
    serialize = JSON.stringify,
  }: LocalStorageOptions<T> = {},
): LocalStorageResult<T> => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? initialValue : deserialize(storedValue);
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, serialize(value));
  }, [key, serialize, value]);

  return [value, setValue];
};

type UseClickOutsideArgs<T extends HTMLElement> = {
  enabled?: boolean;
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
  ref: RefObject<T | null>;
};

export const useClickOutside = <T extends HTMLElement>({
  enabled = true,
  onClickOutside,
  ref,
}: UseClickOutsideArgs<T>) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleDocumentEvent = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        onClickOutside(event);
      }
    };

    document.addEventListener("mousedown", handleDocumentEvent);
    document.addEventListener("touchstart", handleDocumentEvent);

    return () => {
      document.removeEventListener("mousedown", handleDocumentEvent);
      document.removeEventListener("touchstart", handleDocumentEvent);
    };
  }, [enabled, onClickOutside, ref]);
};

export const usePrevious = <T,>(value: T): T | undefined => {
  const previousRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
};
```

```tsx
import { useCallback, useRef, useState } from "react";

type User = {
  id: string;
  name: string;
};

export const UserSearch = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useLocalStorage("user-search-query", "");
  const debouncedQuery = useDebounce(query, 300);
  const previousQuery = usePrevious(debouncedQuery);
  const closePanel = useCallback(() => setIsOpen(false), []);
  const url = `/api/users?query=${encodeURIComponent(debouncedQuery)}`;
  const {
    data: users = [],
    error,
    loading,
    refetch,
  } = useFetch<User[]>({
    enabled: debouncedQuery.length > 0,
    url,
  });

  useClickOutside({ enabled: isOpen, onClickOutside: closePanel, ref: panelRef });

  return (
    <section ref={panelRef}>
      <input
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        value={query}
      />
      {previousQuery !== debouncedQuery && <p>검색어가 바뀌었습니다.</p>}
      {loading && <p>불러오는 중입니다.</p>}
      {error && <button onClick={refetch}>다시 시도</button>}
      {isOpen && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
```

## 실수 포인트

- hook 이름은 `use`로 시작해야 React가 hook 규칙을 검사한다.
- `useEffect` 안에서 읽는 외부 값은 dependency 배열에 넣는다.
- `options`, `onClickOutside`, `serialize` 같은 함수나 객체를 매번 새로 만들면 effect가 반복 실행된다.
- `useFetch`는 `AbortController`로 이전 요청을 정리해야 늦게 끝난 응답이 화면을 덮어쓰지 않는다.
- hook 안에서 특정 화면의 문구, DOM 구조, CSS class를 알게 만들면 컴포넌트 결합도가 높아진다.
- 반환값을 너무 많이 늘리면 쓰는 쪽이 hook 내부 사정을 알아야 한다.

## 참고

- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
