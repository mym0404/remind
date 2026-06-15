# 성능 최적화 기초

## 언제 쓰나

성능 최적화는 화면이 실제로 느릴 때 적용한다. 먼저 불필요한 state를 줄이고, 계산 가능한 값은 렌더링 중에 계산한다. 계산이 무겁거나 리스트가 클 때만 `useMemo`로 비용을 줄인다.

자식 컴포넌트가 `memo`로 감싸져 있거나 callback이 다른 hook의 dependency로 들어갈 때는 `useCallback`으로 함수 참조를 안정화한다. 리스트를 렌더링할 때는 서버 id처럼 바뀌지 않는 값을 `key`로 쓴다.

한 화면에 수백 개 이상 item을 렌더링해서 스크롤이나 입력이 끊기면 virtualization을 검토한다. `scroll`과 `resize`처럼 자주 발생하는 이벤트는 화면 반응이 중요하면 throttle, 마지막 값만 중요하면 debounce를 쓴다.

DOM 크기를 읽은 직후 style을 바꾸는 코드는 layout thrashing을 만들 수 있다. `getBoundingClientRect()` 같은 layout read와 style 변경 같은 layout write는 단계로 나눈다.

## 바로 쓰는 코드

계산 가능한 `doneCount`는 state로 두지 않는다. 화면에 보여줄 목록은 `useMemo`로 계산하고, 자식에 넘기는 이벤트는 `useCallback`으로 고정한다.

```tsx
import { memo, useCallback, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  done: boolean;
};

const initialTasks: Task[] = [
  { id: "task-1", title: "느린 계산 찾기", done: true },
  { id: "task-2", title: "리스트 key 확인", done: false },
  { id: "task-3", title: "이벤트 빈도 줄이기", done: false },
];

export const PerformanceTaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showDone, setShowDone] = useState(true);

  const visibleTasks = useMemo(
    () => tasks.filter((task) => showDone || !task.done),
    [showDone, tasks],
  );

  const doneCount = tasks.filter((task) => task.done).length;

  const toggleTask = useCallback((id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }, []);

  return (
    <section>
      <p>
        완료 {doneCount}개 / 전체 {tasks.length}개
      </p>

      <label>
        <input
          type="checkbox"
          checked={showDone}
          onChange={(event) => setShowDone(event.target.checked)}
        />
        완료한 작업 보기
      </label>

      <ul>
        {visibleTasks.map((task) => (
          <TaskRow key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ul>
    </section>
  );
};

const TaskRow = memo(
  ({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) => (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
    </li>
  ),
);
```

자주 발생하는 이벤트는 빈도를 줄인다. 크기 측정처럼 layout을 읽고 쓰는 작업은 한 번에 섞지 않는다.

```tsx
import { useEffect, useRef, useState } from "react";

export const MeasuredPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const measure = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const rect = panelRef.current?.getBoundingClientRect();

        if (rect) {
          setWidth(rect.width);
        }
      });
    };

    const throttledMeasure = throttle(measure, 100);

    window.addEventListener("resize", throttledMeasure);
    measure();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", throttledMeasure);
    };
  }, []);

  return (
    <section ref={panelRef} style={{ inlineSize: "100%" }}>
      <p>패널 너비: {Math.round(width)}px</p>
    </section>
  );
};

const throttle = (callback: () => void, wait: number) => {
  let lastRunAt = 0;
  let timerId: number | undefined;

  return () => {
    const now = Date.now();
    const remaining = wait - (now - lastRunAt);

    if (remaining <= 0) {
      lastRunAt = now;
      callback();
      return;
    }

    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      lastRunAt = Date.now();
      callback();
    }, remaining);
  };
};
```

## 실수 포인트

- `useMemo`와 `useCallback`은 모든 값에 붙이지 않는다.
- 값이 빠르게 계산되면 `useMemo`보다 그냥 계산하는 편이 읽기 쉽다.
- `useCallback`을 써도 자식이 매번 렌더링되면 효과가 거의 없다.
- 계산 가능한 값은 state로 두지 않는다.
- 리스트 `key`에 배열 index나 `Math.random()`을 쓰지 않는다.
- virtualization은 item이 많아 스크롤, 입력, 필터가 끊길 때 적용한다.
- 검색 요청처럼 마지막 입력만 중요하면 debounce를 쓴다.
- 스크롤 위치 계산처럼 주기적으로 반응해야 하면 throttle을 쓴다.
- layout read와 layout write를 반복해서 섞으면 layout thrashing이 생긴다.
- DOM 크기 읽기와 style 변경은 한 프레임 안에서 단계가 섞이지 않게 나눈다.

## 참고

- [React useCallback](https://react.dev/reference/react/useCallback)
