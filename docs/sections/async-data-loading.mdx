# 비동기 데이터 로딩

## 언제 쓰나

- 화면이 API 응답을 기다리는 동안 `loading`, `error`, `data`를 따로 보여줘야 할 때 쓴다.
- 검색어, 필터, 페이지 같은 요청 파라미터가 바뀔 때 데이터를 다시 불러와야 할 때 쓴다.
- 느린 요청이 늦게 끝나도 최신 요청 결과만 화면에 남겨야 할 때 쓴다.
- API 응답 모양과 화면에서 쓰는 데이터 모양이 다를 때 변환 레이어를 둔다.

## 바로 쓰는 코드

요청 조건을 state로 두고, `useEffect`에서 `fetch`를 실행한다. cleanup에서는 `AbortController`로 이전 요청을 취소한다.

```tsx
import { useEffect, useRef, useState } from "react";

type ApiUser = {
  email: string;
  id: string;
  lastLoginAt: string | undefined;
  name: string;
};

type UsersResponse = {
  users: ApiUser[];
};

type UserRow = {
  detail: string;
  id: string;
  lastLoginDate: string | undefined;
  lastLoginText: string;
  title: string;
};

const buildUsersUrl = (query: string) => {
  const params = new URLSearchParams();
  const keyword = query.trim();

  if (keyword) {
    params.set("q", keyword);
  }

  const queryString = params.toString();

  return queryString ? `/api/users?${queryString}` : "/api/users";
};

const toUserRow = (user: ApiUser): UserRow => ({
  detail: user.email,
  id: user.id,
  lastLoginDate: user.lastLoginAt,
  lastLoginText: user.lastLoginAt
    ? new Intl.DateTimeFormat("ko-KR").format(new Date(user.lastLoginAt))
    : "로그인 기록 없음",
  title: user.name,
});

export const UserList = () => {
  const [query, setQuery] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const requestIdRef = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    const loadUsers = async () => {
      setIsLoading(true);
      setErrorMessage(undefined);

      try {
        const response = await fetch(buildUsersUrl(query), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("사용자 목록을 불러오지 못했습니다.");
        }

        const body: UsersResponse = await response.json();

        if (!isActive || requestIdRef.current !== requestId) {
          return;
        }

        setUsers(body.users.map(toUserRow));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (!isActive || requestIdRef.current !== requestId) {
          return;
        }

        setUsers([]);
        setErrorMessage(
          error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        );
      } finally {
        if (isActive && requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [query, retryCount]);

  const retry = () => {
    setRetryCount((count) => count + 1);
  };

  const hasEmptyResult = !isLoading && !errorMessage && users.length === 0;

  return (
    <section>
      <label htmlFor="user-query">사용자 검색</label>
      <input
        id="user-query"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />

      {isLoading && <p>불러오는 중입니다.</p>}

      {errorMessage && (
        <div role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={retry}>
            다시 시도
          </button>
        </div>
      )}

      {hasEmptyResult && <p>검색 결과가 없습니다.</p>}

      {!isLoading && !errorMessage && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.title}</strong>
              <span>{user.detail}</span>
              {user.lastLoginDate ? (
                <time dateTime={user.lastLoginDate}>{user.lastLoginText}</time>
              ) : (
                <span>{user.lastLoginText}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
```

## 실수 포인트

- `loading`, `error`, `data`를 한 state에 섞으면 렌더링 조건이 금방 복잡해진다.
- `response.ok`를 확인하지 않으면 실패 응답도 성공처럼 처리될 수 있다.
- 빈 배열은 실패가 아니라 결과 없음 상태로 보여준다.
- cleanup에서 요청을 취소하지 않으면 unmount 후 state 업데이트가 생길 수 있다.
- 요청 파라미터를 effect dependency에서 빼면 오래된 조건으로 데이터를 불러온다.
- 이전 요청이 늦게 끝나는 상황을 막지 않으면 race condition으로 낡은 데이터가 화면에 남는다.
- retry는 별도 로직을 만들지 말고 같은 요청 흐름을 다시 실행하게 만든다.
- API 응답을 그대로 렌더링하지 말고 화면에 필요한 UI 모델로 바꾼다.

## 참고

- [MDN Using fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
