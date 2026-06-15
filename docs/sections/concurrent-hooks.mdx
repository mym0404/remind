# React 최신 Hook / Concurrent UI

## 언제 쓰나

입력은 바로 반응해야 하지만 목록, 차트, 탭처럼 다시 그리는 데 시간이 걸리는 UI가 있을 때 concurrent Hook을 쓴다. React 19에서는 급한 업데이트와 덜 급한 업데이트를 나눠 화면이 멈추는 느낌을 줄일 수 있다.

`useTransition`은 상태 업데이트를 non-blocking update로 표시한다. `startTransition` 안에 느린 화면 전환이나 무거운 렌더링을 일으키는 state update를 넣고, `isPending`으로 전환 중 UI를 보여준다.

검색 input의 `value`처럼 사용자가 입력하는 값은 transition으로 감싸지 않는다. 입력값 state는 바로 업데이트하고, 그 값을 쓰는 무거운 목록만 `useDeferredValue`나 transition으로 늦춘다.

`useDeferredValue`는 렌더링 우선순위를 늦춘다. debounce처럼 정해진 시간 동안 값을 막아두거나 API 호출 횟수를 줄이는 도구가 아니다. debounce는 마지막 입력 후 일정 시간이 지나야 값을 바꾸고, `useDeferredValue`는 React가 바쁜 동안 덜 중요한 화면 반영을 미룬다.

`useOptimistic`은 서버 응답 전에 화면을 먼저 바꿀 때 쓴다. 실패하면 확정된 서버 state로 돌아가고, 에러 문구는 `useActionState`의 state로 보여준다. `useActionState`는 form action의 결과, pending 상태, 에러 상태를 한곳에서 다룰 때 쓴다.

`useId`는 label, help text, error text를 input과 연결할 때 안정적인 id를 만든다. list key를 만들 때 쓰는 Hook은 아니다.

## 바로 쓰는 코드

```tsx
import {
  useActionState,
  useDeferredValue,
  useId,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";

type TodoStatus = "saved" | "saving";

type Todo = {
  id: string;
  title: string;
  status: TodoStatus;
};

type TodoState = {
  todos: Todo[];
  error?: string;
};

type OptimisticTodo = {
  id: string;
  title: string;
};

type TodoFilter = "all" | TodoStatus;

type SaveTodoResult =
  | { ok: true; todo: Todo }
  | { ok: false; message: string };

const initialState: TodoState = {
  todos: [
    { id: "todo-1", title: "검색 결과 렌더링 줄이기", status: "saved" },
    { id: "todo-2", title: "폼 저장 실패 처리하기", status: "saved" },
  ],
};

const filters: { label: string; value: TodoFilter }[] = [
  { label: "전체", value: "all" },
  { label: "저장됨", value: "saved" },
  { label: "저장 중", value: "saving" },
];

const readTitle = (formData: FormData) =>
  String(formData.get("title") ?? "").trim();

const saveTodo = async (title: string): Promise<SaveTodoResult> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  if (title.includes("실패")) {
    return { ok: false, message: "서버에 저장하지 못했어요." };
  }

  return {
    ok: true,
    todo: {
      id: crypto.randomUUID(),
      title,
      status: "saved",
    },
  };
};

const addTodo = async (
  currentState: TodoState,
  formData: FormData,
): Promise<TodoState> => {
  const title = readTitle(formData);

  if (!title) {
    return { ...currentState, error: "할 일을 입력하세요." };
  }

  const result = await saveTodo(title);

  if (!result.ok) {
    return { ...currentState, error: result.message };
  }

  return {
    todos: [result.todo, ...currentState.todos],
    error: undefined,
  };
};

export const ConcurrentTodoList = () => {
  const searchId = useId();
  const titleId = useId();
  const errorId = useId();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [isPending, startTransition] = useTransition();
  const [state, addTodoAction, isSaving] = useActionState(addTodo, initialState);
  const deferredSearch = useDeferredValue(search);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    state.todos,
    (currentTodos, todo: OptimisticTodo): Todo[] => [
      { id: todo.id, title: todo.title, status: "saving" },
      ...currentTodos,
    ],
  );

  const visibleTodos = useMemo(() => {
    const keyword = deferredSearch.toLowerCase();

    return optimisticTodos.filter((todo) => {
      const matchesKeyword = todo.title.toLowerCase().includes(keyword);
      const matchesFilter = filter === "all" || todo.status === filter;

      return matchesKeyword && matchesFilter;
    });
  }, [deferredSearch, filter, optimisticTodos]);

  const handleSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const handleFilterChange = (nextFilter: TodoFilter) => {
    startTransition(() => {
      setFilter(nextFilter);
    });
  };

  const handleAddTodo = (formData: FormData) => {
    const title = readTitle(formData);

    if (title) {
      addOptimisticTodo({
        id: `optimistic-${crypto.randomUUID()}`,
        title,
      });
    }

    return addTodoAction(formData);
  };

  return (
    <section aria-busy={isPending || isSaving}>
      <label htmlFor={searchId}>검색</label>
      <input
        id={searchId}
        value={search}
        onChange={handleSearchChange}
        placeholder="할 일 검색"
      />

      <div>
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            disabled={filter === item.value}
            onClick={() => handleFilterChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form action={handleAddTodo}>
        <label htmlFor={titleId}>할 일</label>
        <input
          id={titleId}
          name="title"
          aria-describedby={state.error ? errorId : undefined}
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "저장 중" : "추가"}
        </button>
        {state.error ? <p id={errorId}>{state.error}</p> : undefined}
      </form>

      <p aria-live="polite">
        {isPending ? "목록을 바꾸는 중" : `${visibleTodos.length}개 표시`}
      </p>

      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            {todo.status === "saving" ? " 저장 중" : ""}
          </li>
        ))}
      </ul>
    </section>
  );
};
```

## 실수 포인트

- controlled input의 `value` state를 `startTransition` 안에서 바꾸면 입력이 끊긴다.
- `startTransition` 안에서 state update를 바로 실행하지 않으면 transition으로 처리되지 않는다.
- `isPending`을 전역 loading처럼 쓰면 unrelated UI까지 불필요하게 막는다.
- `useDeferredValue`는 API 요청 debounce를 대체하지 않는다.
- `useDeferredValue`를 쓰더라도 무거운 계산은 `useMemo`처럼 계산 범위를 줄이는 코드와 함께 봐야 한다.
- `useOptimistic`의 update 함수는 같은 입력에 같은 결과를 돌려줘야 한다.
- optimistic update 실패 시 서버 state를 그대로 두지 않으면 rollback 기준이 사라진다.
- `useActionState`에서 검증 실패와 저장 실패를 state로 돌려주지 않으면 화면에 에러를 보여주기 어렵다.
- 예상하지 못한 런타임 오류까지 action state로 숨기면 Error Boundary가 처리할 수 없다.
- `useId`로 list key를 만들면 항목 정체성을 안정적으로 보장하지 못한다.

## 참고

- [React useTransition](https://react.dev/reference/react/useTransition)
