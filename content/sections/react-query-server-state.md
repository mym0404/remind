# React Query / Server State

## 언제 쓰나

server state는 서버가 원본을 가진 데이터다. Todo 목록, 사용자 정보, 결제 내역처럼 네트워크로 가져오고 다른 화면이나 다른 사용자가 바꿀 수 있는 값이 여기에 속한다.

client state는 브라우저 안에서만 의미가 있는 값이다. 입력값, 열린 modal, 선택된 tab처럼 서버 원본이 없는 값은 `useState`나 `useReducer`로 두는 편이 단순하다.

React Query는 server state의 `loading`, `error`, `cache`, `refetch`, mutation 후 동기화를 한 곳에서 다룰 때 쓴다. 같은 데이터를 여러 컴포넌트에서 읽거나, 화면 복귀 시 오래된 데이터를 다시 받아야 한다면 직접 `useEffect`를 쓰는 것보다 안전하다.

## 바로 쓰는 코드

앱을 `QueryClientProvider`로 감싸고, 데이터를 구분하는 값을 `queryKey`에 넣는다. `staleTime` 동안은 cache를 신선한 데이터로 보고, 그 시간이 지나면 다시 가져올 수 있는 상태로 본다.

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type TodoStatus = "all" | "open" | "done";

const TODO_STALE_TIME = 30_000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TODO_STALE_TIME,
    },
  },
});

const todoKeys = {
  all: ["todos"] as const,
  list: (status: TodoStatus) => [...todoKeys.all, { status }] as const,
};

const fetchTodos = async (status: TodoStatus) => {
  const response = await fetch(`/api/todos?status=${status}`);

  if (!response.ok) {
    throw new Error("Todo 목록을 불러오지 못했습니다.");
  }

  return (await response.json()) as Todo[];
};

const createTodo = async (title: string) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Todo를 저장하지 못했습니다.");
  }

  return (await response.json()) as Todo;
};

const toggleTodo = async (todo: Todo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !todo.done }),
  });

  if (!response.ok) {
    throw new Error("Todo를 수정하지 못했습니다.");
  }

  return (await response.json()) as Todo;
};

const TodoList = ({ status }: { status: TodoStatus }) => {
  const queryClient = useQueryClient();
  const queryKey = todoKeys.list(status);

  const todosQuery = useQuery({
    queryKey,
    queryFn: () => fetchTodos(status),
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey);

      queryClient.setQueryData<Todo[]>(queryKey, (oldTodos = []) =>
        oldTodos.map((item) =>
          item.id === todo.id ? { ...item, done: !item.done } : item,
        ),
      );

      return { previousTodos };
    },
    onError: (_error, _todo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(queryKey, context.previousTodos);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });

  if (todosQuery.isPending) {
    return <p>불러오는 중</p>;
  }

  if (todosQuery.isError) {
    return <p>{todosQuery.error.message}</p>;
  }

  return (
    <section>
      <button
        disabled={createTodoMutation.isPending}
        onClick={() => createTodoMutation.mutate("새 할 일")}
      >
        추가
      </button>

      <ul>
        {todosQuery.data.map((todo) => (
          <li key={todo.id}>
            <button
              disabled={toggleTodoMutation.isPending}
              onClick={() => toggleTodoMutation.mutate(todo)}
            >
              {todo.done ? "완료" : "미완료"}
            </button>
            {todo.title}
          </li>
        ))}
      </ul>
    </section>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TodoList status="all" />
  </QueryClientProvider>
);
```

라이브러리 없이도 같은 개념을 작게 만들 수 있다. 핵심은 cache key, 저장 시각, stale 판단, 강제 refetch를 분리하는 것이다.

```ts
type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type TodoStatus = "all" | "open" | "done";

type TodoCacheEntry = {
  data: Todo[];
  updatedAt: number;
};

const TODO_STALE_TIME = 30_000;
const todoStatuses: TodoStatus[] = ["all", "open", "done"];
const todoCache: Partial<Record<TodoStatus, TodoCacheEntry>> = {};

const fetchTodos = async (status: TodoStatus) => {
  const response = await fetch(`/api/todos?status=${status}`);

  if (!response.ok) {
    throw new Error("Todo 목록을 불러오지 못했습니다.");
  }

  return (await response.json()) as Todo[];
};

export const getCachedTodos = async ({
  status,
  refetch = false,
}: {
  status: TodoStatus;
  refetch?: boolean;
}) => {
  const cached = todoCache[status];
  const isFresh =
    cached !== undefined && Date.now() - cached.updatedAt < TODO_STALE_TIME;

  if (!refetch && isFresh) {
    return cached.data;
  }

  const data = await fetchTodos(status);
  todoCache[status] = { data, updatedAt: Date.now() };

  return data;
};

export const invalidateTodos = (status?: TodoStatus) => {
  if (status !== undefined) {
    delete todoCache[status];
    return;
  }

  todoStatuses.forEach((cachedStatus) => {
    delete todoCache[cachedStatus];
  });
};
```

## 실수 포인트

- server state를 `useState`에 복사해 오래 들고 있으면 cache와 화면이 쉽게 어긋난다.
- `queryFn`이 `status`, `userId`, `page`를 쓰면 그 값은 `queryKey`에도 들어가야 한다.
- `staleTime`이 짧을수록 refetch가 자주 일어나고, 길수록 오래된 화면을 볼 수 있다.
- mutation 성공 후 `invalidateQueries`를 하지 않으면 기존 cache가 계속 보일 수 있다.
- optimistic update는 실패 시 되돌릴 이전 cache를 먼저 저장해야 한다.
- 직접 만든 cache는 요청 중복 제거, retry, window focus refetch까지 맡기 어렵다.

## 참고

- [TanStack Query React Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
