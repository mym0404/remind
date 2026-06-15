# Optimistic Update

## 언제 쓰나

사용자가 좋아요, 저장, 삭제, 댓글 작성처럼 결과를 바로 기대하는 액션을 했을 때 쓴다. 서버 응답을 기다린 뒤에만 화면을 바꾸면 UI가 늦게 반응한다.

Optimistic update는 먼저 화면 상태를 바꾸고, 요청이 성공하면 서버 응답으로 상태를 확정한다. 요청이 실패하면 이전 상태로 rollback하고 toast나 inline error로 실패를 알려준다.

React 19에서는 `useOptimistic`으로 임시 상태를 만들 수 있다. 서버 상태 라이브러리 없이 직접 구현할 때는 이전 값을 따로 보관하고, 같은 항목에 대한 중복 요청을 막아야 한다.

## 바로 쓰는 코드

`useOptimistic`을 쓰면 pending Action 동안만 임시 상태가 보인다. 실패해서 원본 state를 바꾸지 않으면 optimistic state는 사라지고, 성공하면 서버 응답으로 원본 state를 갱신한다.

```tsx
import { useOptimistic, useRef, useState } from "react";

type Comment = {
  id: string;
  status?: "sending";
  text: string;
};

const createComment = async (text: string) => {
  const response = await fetch("/api/comments", {
    body: JSON.stringify({ text }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("댓글을 저장하지 못했습니다.");
  }

  return (await response.json()) as Comment;
};

export const CommentForm = ({
  initialComments,
}: {
  initialComments: Comment[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmittingRef = useRef(false);
  const [comments, setComments] = useState(initialComments);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, comment: Comment) => [...currentComments, comment],
  );

  const formAction = async (formData: FormData) => {
    if (isSubmittingRef.current) {
      return;
    }

    const text = String(formData.get("comment") ?? "").trim();

    if (!text) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage(undefined);
    addOptimisticComment({
      id: crypto.randomUUID(),
      status: "sending",
      text,
    });
    formRef.current?.reset();

    try {
      const savedComment = await createComment(text);
      setComments((currentComments) => [...currentComments, savedComment]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "댓글 저장 중 문제가 생겼습니다.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id}>
            <span>{comment.text}</span>
            {comment.status === "sending" && <small>저장 중</small>}
          </li>
        ))}
      </ul>

      <form action={formAction} ref={formRef}>
        <label htmlFor="comment">댓글</label>
        <input id="comment" name="comment" />
        <button type="submit" disabled={isSubmitting}>
          등록
        </button>
      </form>

      {errorMessage && <p role="alert">{errorMessage}</p>}
    </section>
  );
};
```

직접 구현할 때는 변경 전 항목을 보관한다. 요청이 실패하면 그 항목만 되돌리고, 성공하면 서버가 내려준 값으로 확정한다.

```tsx
import { useRef, useState } from "react";

type Todo = {
  done: boolean;
  id: string;
  title: string;
};

type ToastVariant = "error" | "success";

const updateTodoDone = async ({
  done,
  id,
}: {
  done: boolean;
  id: string;
}) => {
  const response = await fetch(`/api/todos/${id}`, {
    body: JSON.stringify({ done }),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("할 일을 저장하지 못했습니다.");
  }

  return (await response.json()) as Todo;
};

export const TodoList = ({
  initialTodos,
  showToast,
}: {
  initialTodos: Todo[];
  showToast: (message: string, variant: ToastVariant) => void;
}) => {
  const pendingIdsRef = useRef<Record<string, boolean>>({});
  const [todos, setTodos] = useState(initialTodos);
  const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string>();

  const setTodoPending = (id: string, isPending: boolean) => {
    const nextPendingIds = { ...pendingIdsRef.current };

    if (isPending) {
      nextPendingIds[id] = true;
    } else {
      delete nextPendingIds[id];
    }

    pendingIdsRef.current = nextPendingIds;
    setPendingIds(nextPendingIds);
  };

  const toggleTodo = async (todo: Todo) => {
    if (pendingIdsRef.current[todo.id]) {
      return;
    }

    const previousTodo = todo;
    const nextDone = !todo.done;

    setTodoPending(todo.id, true);
    setErrorMessage(undefined);
    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        item.id === todo.id ? { ...item, done: nextDone } : item,
      ),
    );

    try {
      const savedTodo = await updateTodoDone({
        done: nextDone,
        id: todo.id,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === savedTodo.id ? savedTodo : item,
        ),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "할 일 저장 중 문제가 생겼습니다.";

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === previousTodo.id ? previousTodo : item,
        ),
      );
      setErrorMessage(message);
      showToast(message, "error");
    } finally {
      setTodoPending(todo.id, false);
    }
  };

  return (
    <section>
      <ul>
        {todos.map((todo) => {
          const isPending = Boolean(pendingIds[todo.id]);

          return (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button
                type="button"
                aria-pressed={todo.done}
                disabled={isPending}
                onClick={() => void toggleTodo(todo)}
              >
                {todo.done ? "완료 취소" : "완료"}
              </button>
              {isPending && <small>저장 중</small>}
            </li>
          );
        })}
      </ul>

      {errorMessage && <p role="alert">{errorMessage}</p>}
    </section>
  );
};
```

## 실수 포인트

- 서버 응답을 받기 전에 원본 데이터까지 확정값처럼 바꾸면 실패 rollback이 어렵다.
- 실패했는데 화면만 되돌리고 에러를 숨기면 사용자는 액션이 왜 사라졌는지 알 수 없다.
- 성공 응답을 무시하고 낙관적으로 만든 값만 남기면 서버가 정한 `id`, 정렬, 권한 결과와 어긋날 수 있다.
- 같은 항목에 대한 요청을 막지 않으면 빠른 연속 클릭으로 상태가 두 번 뒤집힐 수 있다.
- `useOptimistic`의 update 함수에서 `crypto.randomUUID()` 같은 부수 효과를 만들면 같은 입력의 결과가 매번 달라진다.
- 직접 구현할 때 전체 목록 snapshot만 되돌리면 다른 항목의 최신 변경까지 덮어쓸 수 있다.
- toast만 띄우고 inline error를 빼면 사용자가 화면에 남은 실패 위치를 놓칠 수 있다.

## 참고

- [React useOptimistic](https://react.dev/reference/react/useOptimistic)
