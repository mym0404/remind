# React 상태와 이벤트

## 언제 쓰나

사용자 입력에 따라 화면이 바뀌어야 할 때 쓴다. input 값, 선택된 필터, 패널 열림 상태처럼 컴포넌트가 기억해야 하는 값을 `useState`에 둔다.

리스트를 추가, 삭제, 수정, 토글할 때도 state를 쓴다. 배열이나 객체를 직접 바꾸지 않고 새 배열과 새 객체를 만들어 넣어야 React가 변경을 알아차린다.

DOM element에 직접 접근해야 할 때는 `useRef`를 쓴다. 전역 이벤트를 붙일 때는 `useEffect`에서 등록하고 cleanup에서 해제한다.

## 바로 쓰는 코드

```tsx
import { useEffect, useRef, useState } from "react";
import type * as React from "react";

type Filter = "all" | "active" | "done";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type TodoPanelProps = {
  initialTodos: Todo[];
  onSave: (todos: Todo[]) => void;
};

const readFilter = (value: string): Filter => {
  if (value === "active" || value === "done") {
    return value;
  }

  return "all";
};

export const TodoPanel = ({ initialTodos, onSave }: TodoPanelProps) => {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [meta, setMeta] = useState({ owner: "", memo: "" });
  const [todos, setTodos] = useState<Todo[]>(() => initialTodos);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeta((current) => ({
      ...current,
      owner: event.target.value,
    }));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(readFilter(event.target.value));
  };

  const addTodo = () => {
    const nextTitle = title.trim();

    if (nextTitle.length === 0) {
      return;
    }

    setTodos((current) => [
      ...current,
      { id: crypto.randomUUID(), title: nextTitle, done: false },
    ]);
    setTitle("");
    titleInputRef.current?.focus();
  };

  const updateTodo = (id: string, nextTitle: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, title: nextTitle } : todo,
      ),
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(todos);
    setIsOpen(false);
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.done;
    }

    if (filter === "done") {
      return todo.done;
    }

    return true;
  });

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => setIsOpen((current) => !current)}>
        {isOpen ? "닫기" : "열기"}
      </button>

      {isOpen && (
        <>
          <label>
            담당자
            <input value={meta.owner} onChange={handleOwnerChange} />
          </label>

          <label>
            할 일
            <input
              ref={titleInputRef}
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <button type="button" onClick={addTodo}>
            추가
          </button>

          {(["all", "active", "done"] satisfies Filter[]).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="filter"
                value={option}
                checked={filter === option}
                onChange={handleFilterChange}
              />
              {option}
            </label>
          ))}

          <ul>
            {visibleTodos.map((todo) => (
              <li key={todo.id}>
                <input
                  value={todo.title}
                  onChange={(event) => updateTodo(todo.id, event.target.value)}
                />
                <button type="button" onClick={() => toggleTodo(todo.id)}>
                  {todo.done ? "되돌리기" : "완료"}
                </button>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>

          <button type="submit">저장</button>
        </>
      )}
    </form>
  );
};
```

## 실수 포인트

- `title = "새 값"`처럼 state 변수를 직접 바꾸면 화면이 다시 그려지지 않는다.
- 배열에 `push`, `splice`를 쓰지 말고 spread, `map`, `filter`로 새 배열을 만든다.
- 객체 state를 바꿀 때는 `{ ...current, owner: value }`처럼 기존 필드를 보존한다.
- form submit에서는 `event.preventDefault()`를 먼저 호출한다.
- `button`은 기본 타입이 `submit`이므로 저장 버튼이 아니면 `type="button"`을 적는다.
- state를 바꾼 직후 props callback에 최신 값이 필요하면 `nextTodos` 같은 값을 먼저 만들고 `setTodos(nextTodos)`와 `onSave(nextTodos)`에 같은 값을 넘긴다.
- `useEffect`에서 등록한 event listener는 cleanup에서 같은 함수 참조로 제거한다.
- `useRef`는 DOM focus처럼 렌더링 결과에 직접 접근해야 할 때만 쓴다.

## 참고

- [React useState](https://react.dev/reference/react/useState)
