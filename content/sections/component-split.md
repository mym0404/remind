# 컴포넌트 분리

## 언제 쓰나

컴포넌트가 데이터 계산, 상태 변경, 이벤트 처리, 마크업을 한 번에 담기 시작하면 역할을 나눈다. 화면을 읽을 때 "무엇을 보여주는지"와 "상태를 어떻게 바꾸는지"가 섞이지 않아야 한다.

- 한 컴포넌트의 JSX가 길어져 흐름을 따라가기 어렵다.
- 같은 UI 조각이 두 번 이상 나오거나 이름 붙일 만큼 의미가 있다.
- 상태 로직이 UI보다 더 많은 줄을 차지한다.
- 여러 형제 컴포넌트가 같은 state를 함께 쓴다.
- 멀리 떨어진 컴포넌트가 같은 값을 읽거나 바꾼다.

state는 사용하는 곳에 최대한 가깝게 둔다. 여러 형제가 같은 state를 쓰면 가장 가까운 공통 부모로 올린다. 여러 단계 아래의 컴포넌트가 같은 값을 계속 전달받으면 Context를 검토한다. 한두 단계 props 전달만으로 충분하면 Context보다 props가 더 읽기 쉽다.

## 바로 쓰는 코드

```tsx
import { useMemo, useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type TodoFilter = "all" | "active" | "done";

const initialTodos: Todo[] = [
  { id: "todo-1", title: "컴포넌트 경계 정하기", done: true },
  { id: "todo-2", title: "hook으로 상태 로직 빼기", done: false },
];

const useTodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const visibleTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.done);
    }

    if (filter === "done") {
      return todos.filter((todo) => todo.done);
    }

    return todos;
  }, [filter, todos]);

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return {
    filter,
    visibleTodos,
    setFilter,
    toggleTodo,
    removeTodo,
  };
};

export const TodoPage = () => {
  const { filter, visibleTodos, setFilter, toggleTodo, removeTodo } =
    useTodoList();

  return (
    <section>
      <h2>할 일</h2>
      <TodoFilterTabs value={filter} onChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
      />
    </section>
  );
};

const TodoFilterTabs = ({
  value,
  onChange,
}: {
  value: TodoFilter;
  onChange: (value: TodoFilter) => void;
}) => {
  const filters: TodoFilter[] = ["all", "active", "done"];

  return (
    <div>
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const TodoList = ({
  todos,
  onToggle,
  onRemove,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  if (todos.length === 0) {
    return <p>표시할 일이 없습니다.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) => (
  <li>
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.title}
    </label>
    <button type="button" onClick={() => onRemove(todo.id)}>
      삭제
    </button>
  </li>
);
```

`TodoPage`는 컴포넌트를 조립한다. `useTodoList`는 state와 변경 함수를 가진다. `TodoFilterTabs`, `TodoList`, `TodoItem`은 받은 props로만 화면을 그린다.

Props 이름은 바깥에서 보는 동작을 기준으로 정한다. 값은 `value`, 목록은 `todos`, 이벤트는 `onChange`, `onToggle`, `onRemove`처럼 쓴다. 열림 상태처럼 controlled API가 필요한 컴포넌트는 `open`, `defaultOpen`, `onOpenChange`를 함께 설계한다.

## 실수 포인트

- 컴포넌트가 작다는 이유만으로 파일부터 나누지 않는다.
- state는 사용하는 곳 가까이에 둔다.
- 여러 형제가 같은 state를 쓰면 가장 가까운 공통 부모로 올린다.
- 한두 단계 전달되는 props는 Context로 옮기지 않는다.
- Context에는 멀리 떨어진 여러 컴포넌트가 함께 쓰는 값만 둔다.
- callback props는 `handleClick`보다 `onSelect`, `onSubmit`, `onClose`, `onOpenChange`처럼 외부 이벤트 이름으로 만든다.
- 리스트 `key`에 배열 index를 쓰지 않는다.
- 서버에서 받은 고유 id나 직접 만든 안정적인 id를 `key`로 쓴다.
- 재사용 컴포넌트 props는 값, 이벤트, 표시 옵션만 남긴다.
- 내부 구현에 맞춘 props 이름은 피한다.

## 참고

- [React Thinking in React](https://react.dev/learn/thinking-in-react)
