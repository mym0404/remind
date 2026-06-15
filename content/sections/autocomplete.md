# Autocomplete

## 언제 쓰나

사용자가 input에 글자를 입력하는 동안 추천 값을 보여줘야 할 때 쓴다. 검색어는 `value` state로 바로 반영하고, API 요청은 debounce된 값으로 보낸다.

Autocomplete는 단순 검색 input보다 상태가 많다. 추천 목록, 선택값, 열림 상태, active item, `loading`, `error`, `empty`를 나눠야 키보드와 비동기 UI가 엉키지 않는다.

추천 중 하나를 고르면 그 값이 input에 들어간다. Escape나 바깥 클릭으로 목록만 닫을 때는 사용자가 입력한 값을 지우지 않는다.

## 바로 쓰는 코드

아래 예시는 input focus를 유지하면서 `aria-activedescendant`로 active option을 알려준다. input은 `aria-controls`로 listbox와 연결한다.

```tsx
import { useEffect, useId, useRef, useState } from "react";

type Suggestion = {
  email: string;
  id: string;
  name: string;
};

type SuggestionsState =
  | { status: "idle"; items: Suggestion[] }
  | { status: "loading"; items: Suggestion[] }
  | { status: "success"; items: Suggestion[] }
  | { status: "error"; items: Suggestion[]; message: string };

const useDebounce = <T,>(value: T, delay: number) => {
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

const getNextIndex = (
  currentIndex: number | undefined,
  itemCount: number,
  step: 1 | -1,
) => {
  if (itemCount === 0) {
    return undefined;
  }

  if (currentIndex === undefined) {
    return step === 1 ? 0 : itemCount - 1;
  }

  return (currentIndex + step + itemCount) % itemCount;
};

export const UserAutocomplete = () => {
  const inputId = useId();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<Suggestion>();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [suggestionsState, setSuggestionsState] = useState<SuggestionsState>({
    status: "idle",
    items: [],
  });
  const trimmedValue = value.trim();
  const debouncedValue = useDebounce(trimmedValue, 300);
  const selectedUserName = selectedUser?.name;
  const activeSuggestion =
    activeIndex === undefined ? undefined : suggestionsState.items[activeIndex];

  useEffect(() => {
    if (debouncedValue !== trimmedValue) {
      return;
    }

    if (debouncedValue === "") {
      setSuggestionsState({ status: "idle", items: [] });
      setIsOpen(false);
      setActiveIndex(undefined);
      return;
    }

    if (selectedUserName === debouncedValue) {
      setSuggestionsState({ status: "idle", items: [] });
      setIsOpen(false);
      setActiveIndex(undefined);
      return;
    }

    const controller = new AbortController();

    const loadSuggestions = async () => {
      setSuggestionsState({ status: "loading", items: [] });
      setIsOpen(true);
      setActiveIndex(undefined);

      try {
        const response = await fetch(
          `/api/users/suggest?q=${encodeURIComponent(debouncedValue)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("추천 목록을 불러오지 못했습니다.");
        }

        const items: Suggestion[] = await response.json();

        setSuggestionsState({ status: "success", items });
        setIsOpen(true);
        setActiveIndex(items.length > 0 ? 0 : undefined);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setSuggestionsState({
          status: "error",
          items: [],
          message:
            error instanceof Error ? error.message : "추천 검색에 실패했습니다.",
        });
        setIsOpen(true);
        setActiveIndex(undefined);
      }
    };

    void loadSuggestions();

    return () => {
      controller.abort();
    };
  }, [debouncedValue, selectedUserName, trimmedValue]);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(undefined);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  const selectSuggestion = (suggestion: Suggestion) => {
    setValue(suggestion.name);
    setSelectedUser(suggestion);
    setIsOpen(false);
    setActiveIndex(undefined);
  };

  const optionId =
    activeIndex === undefined ? undefined : `${listboxId}-option-${activeIndex}`;

  return (
    <section>
      <div ref={rootRef}>
        <label htmlFor={inputId}>사용자</label>
        <input
          id={inputId}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={optionId}
          autoComplete="off"
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value;

            setValue(nextValue);
            setSelectedUser(undefined);
            setIsOpen(nextValue.trim() !== "");
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIsOpen(true);
              setActiveIndex((index) =>
                getNextIndex(index, suggestionsState.items.length, 1),
              );
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setIsOpen(true);
              setActiveIndex((index) =>
                getNextIndex(index, suggestionsState.items.length, -1),
              );
            }

            if (event.key === "Enter" && isOpen && activeSuggestion) {
              event.preventDefault();
              selectSuggestion(activeSuggestion);
            }

            if (event.key === "Escape" && isOpen) {
              event.preventDefault();
              setIsOpen(false);
              setActiveIndex(undefined);
            }
          }}
        />

        {isOpen && (
          <ul id={listboxId} role="listbox">
            {suggestionsState.status === "loading" && (
              <li role="option" aria-disabled="true">
                추천을 불러오는 중입니다.
              </li>
            )}

            {suggestionsState.status === "error" && (
              <li role="option" aria-disabled="true">
                <span role="alert">{suggestionsState.message}</span>
              </li>
            )}

            {suggestionsState.status === "success" &&
              suggestionsState.items.length === 0 && (
                <li role="option" aria-disabled="true">
                  추천할 사용자가 없습니다.
                </li>
              )}

            {suggestionsState.status === "success" &&
              suggestionsState.items.map((suggestion, index) => (
                <li
                  id={`${listboxId}-option-${index}`}
                  key={suggestion.id}
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    selectSuggestion(suggestion);
                  }}
                >
                  <strong>{suggestion.name}</strong>
                  <span>{suggestion.email}</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {selectedUser && <p>선택한 사용자: {selectedUser.name}</p>}
    </section>
  );
};
```

## 실수 포인트

- 입력값과 선택값을 같은 state로만 처리하면, 사용자가 다시 타이핑했을 때 이전 선택이 남을 수 있다.
- API 요청을 원본 `value`에 바로 연결하면 글자마다 요청이 나간다.
- `loading`, `error`, `empty`를 한 조건으로 묶으면 실패와 결과 없음이 같은 UI로 보인다.
- 방향키로 이동한 항목은 DOM focus를 옮기지 말고 `aria-activedescendant`로 알려준다.
- Enter는 active item이 있을 때만 선택 처리한다.
- Escape와 바깥 클릭은 목록만 닫고 input value는 유지한다.
- 선택된 값과 현재 input value가 같을 때 다시 추천 API를 호출하면, 선택 직후 닫힌 목록이 다시 열릴 수 있다.
- 추천 목록 id와 `aria-controls` 값이 다르면 보조 기술이 input과 listbox 관계를 알기 어렵다.
- 각 추천 항목에는 `role="option"`과 현재 선택 상태인 `aria-selected`를 같이 둔다.

## 참고

- [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
