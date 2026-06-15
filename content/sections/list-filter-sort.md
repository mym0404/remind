# 검색 / 필터 / 정렬 리스트

## 언제 쓰나

- 서버에서 받은 원본 배열은 그대로 두고, 화면에 보여줄 목록만 검색하거나 정렬할 때 쓴다.
- 검색어, 필터, 정렬 조건이 바뀔 때마다 표시 목록을 다시 계산해야 할 때 쓴다.
- 결과가 없을 때 빈 화면을 따로 보여줘야 할 때 쓴다.

## 바로 쓰는 코드

원본 데이터는 `tasks`에 그대로 둔다. 화면에 보여줄 데이터만 `visibleTasks`로 계산한다.

```tsx
import { type ChangeEvent, useMemo, useState } from "react";

type TaskStatus = "open" | "done";
type StatusFilter = "all" | TaskStatus;
type SortKey = "recent" | "title";

type Task = {
  id: string;
  title: string;
  owner: string;
  status: TaskStatus;
  updatedAt: string;
};

const tasks: Task[] = [
  {
    id: "task-1",
    title: "검색 input 연결",
    owner: "Mina",
    status: "done",
    updatedAt: "2026-06-01",
  },
  {
    id: "task-2",
    title: "empty state 추가",
    owner: "Joon",
    status: "open",
    updatedAt: "2026-06-07",
  },
  {
    id: "task-3",
    title: "정렬 옵션 정리",
    owner: "Mina",
    status: "open",
    updatedAt: "2026-06-03",
  },
];

const statusFilters: StatusFilter[] = ["all", "open", "done"];
const sortKeys: SortKey[] = ["recent", "title"];

const statusLabels: Record<StatusFilter, string> = {
  all: "전체",
  open: "진행 중",
  done: "완료",
};

const sortLabels: Record<SortKey, string> = {
  recent: "최근 수정순",
  title: "제목순",
};

const isStatusFilter = (value: string): value is StatusFilter =>
  statusFilters.some((filter) => filter === value);

const isSortKey = (value: string): value is SortKey =>
  sortKeys.some((key) => key === value);

const TaskList = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("recent");

  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filteredTasks = tasks.filter((task) => {
      const matchesQuery =
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.owner.toLowerCase().includes(normalizedQuery);
      const matchesStatus = status === "all" || task.status === status;

      return matchesQuery && matchesStatus;
    });

    return [...filteredTasks].sort((left, right) => {
      if (sortKey === "title") {
        return left.title.localeCompare(right.title);
      }

      return (
        new Date(right.updatedAt).getTime() -
        new Date(left.updatedAt).getTime()
      );
    });
  }, [query, status, sortKey]);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value;

    if (isStatusFilter(nextStatus)) {
      setStatus(nextStatus);
    }
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSortKey = event.target.value;

    if (isSortKey(nextSortKey)) {
      setSortKey(nextSortKey);
    }
  };

  return (
    <section>
      <label htmlFor="task-query">검색어</label>
      <input
        id="task-query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="제목 또는 담당자"
      />

      <label htmlFor="task-status">상태</label>
      <select id="task-status" value={status} onChange={handleStatusChange}>
        {statusFilters.map((filter) => (
          <option key={filter} value={filter}>
            {statusLabels[filter]}
          </option>
        ))}
      </select>

      <label htmlFor="task-sort">정렬</label>
      <select id="task-sort" value={sortKey} onChange={handleSortChange}>
        {sortKeys.map((key) => (
          <option key={key} value={key}>
            {sortLabels[key]}
          </option>
        ))}
      </select>

      {visibleTasks.length === 0 ? (
        <p>조건에 맞는 작업이 없습니다.</p>
      ) : (
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <span>
                {task.owner} · {statusLabels[task.status]} · {task.updatedAt}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
```

## 실수 포인트

- 검색어나 필터 조건을 바꿀 때 원본 배열을 state로 덮어쓰지 않는다.
- `sort`는 배열을 직접 바꾸므로 원본 배열이나 공유 배열에 바로 쓰지 않는다.
- 검색어 input은 `value`와 `onChange`를 함께 둔 controlled input으로 만든다.
- 표시 목록은 `useMemo`에서 계산하고, 검색어와 필터와 정렬 조건을 dependency에 넣는다.
- 결과가 없을 때도 빈 `ul`만 렌더링하지 말고 empty state를 보여준다.
- 조건이 많아지면 검색어, 필터, 정렬 조건을 하나의 상태 객체나 reducer로 묶는다.

## 참고

- [React useMemo](https://react.dev/reference/react/useMemo)
