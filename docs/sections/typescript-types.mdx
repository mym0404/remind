# TypeScript 타입 설계

## 언제 쓰나

API 응답, 리스트 항목, 컴포넌트 props, 이벤트 핸들러처럼 데이터가 어디서 오고 어디로 가는지 명확해야 할 때 쓴다.

값이 없을 수 있는 필드는 optional과 nullable을 나눠 적는다. 서버가 필드를 아예 안 줄 수 있으면 `?`, 값은 오지만 비어 있음을 뜻하면 `null`을 쓴다.

상태가 몇 가지로만 나뉘면 union type을 쓴다. 상태마다 필요한 값이 달라지면 discriminated union으로 나눠서 렌더링 분기를 안전하게 만든다.

## 바로 쓰는 코드

```tsx
import {
  useEffect,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

type ApiResponse<T> = {
  data: T;
  meta: {
    page: number;
    total: number;
  };
};

type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  deletedAt: string | null;
  role: "admin" | "member";
};

type UserListItem = Pick<User, "id" | "name" | "role">;
type UserCreateInput = Omit<User, "id" | "deletedAt">;
type UserPatchInput = Partial<Pick<User, "name" | "avatarUrl" | "role">>;

type UserCardProps = {
  user: UserListItem;
  selected?: boolean;
  onSelect: (id: string) => void;
  children?: ReactNode;
};

type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

const roleLabel: Record<User["role"], string> = {
  admin: "관리자",
  member: "멤버",
};

const useRemoteData = <T,>(load: () => Promise<ApiResponse<T>>) => {
  const [state, setState] = useState<AsyncState<T>>({ status: "idle" });

  useEffect(() => {
    let ignored = false;

    const run = async () => {
      setState({ status: "loading" });

      try {
        const response = await load();

        if (!ignored) {
          setState({ status: "success", data: response.data });
        }
      } catch (error) {
        if (!ignored) {
          const message =
            error instanceof Error ? error.message : "데이터를 불러오지 못했어요.";
          setState({ status: "error", message });
        }
      }
    };

    void run();

    return () => {
      ignored = true;
    };
  }, [load]);

  return state;
};

const UserCard = ({
  user,
  selected = false,
  onSelect,
  children,
}: UserCardProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    onSelect(user.id);
  };

  return (
    <li aria-selected={selected}>
      <button type="button" onClick={handleClick}>
        {user.name} · {roleLabel[user.role]}
      </button>
      {children}
    </li>
  );
};

const UserSearch = () => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  return <input value={keyword} onChange={handleChange} />;
};

const focusElement = (element: HTMLElement) => {
  element.focus();
};

const readInputValue = (input: HTMLInputElement) => {
  return input.value.trim();
};

const disableButton = (button: HTMLButtonElement) => {
  button.disabled = true;
};

const measurePanel = (panel: HTMLDivElement) => {
  return panel.getBoundingClientRect().height;
};
```

`ApiResponse<T>`는 서버 응답의 공통 모양을 잡고, `UserListItem`은 리스트에 필요한 필드만 남긴다. `UserCardProps`처럼 props 타입은 컴포넌트 바로 위에 두면 사용 지점과 함께 읽기 쉽다.

`Record<User["role"], string>`은 모든 role에 라벨이 있는지 검사한다. `Pick`, `Omit`, `Partial`은 기존 타입에서 입력값이나 수정값 타입을 만들 때 쓰면 중복을 줄일 수 있다.

`useRemoteData<T>`처럼 hook이 데이터 모양을 몰라도 되면 generic을 쓴다. 컴포넌트는 `status` 값으로 분기하고, TypeScript는 그 분기 안에서 `data`나 `message`가 있는 상태만 허용한다.

## 실수 포인트

- optional인 `avatarUrl?: string`은 값이 없으면 `undefined`다.
- nullable인 `deletedAt: string | null`은 서버가 명시적으로 `null`을 보낸다는 뜻이다.
- `string | null | undefined`를 습관적으로 쓰면 데이터 의미가 흐려진다.
- 이벤트에서는 `event.target`보다 `event.currentTarget`을 먼저 본다.
- `HTMLElement`는 공통 DOM 메서드만 필요할 때 쓴다.
- `HTMLInputElement`는 `value`, `checked`, `files`처럼 input 전용 속성이 필요할 때 쓴다.
- `HTMLButtonElement`는 `disabled`, `form`, `type`처럼 button 전용 속성이 필요할 때 쓴다.
- `HTMLDivElement`는 컨테이너 크기 측정이나 스크롤 계산처럼 div 자체를 다룰 때 쓴다.
- union type은 값을 쓰기 전에 좁혀야 한다.
- discriminated union은 `status`, `type`, `kind`처럼 공통 판별 필드가 있어야 편하다.

## 참고

- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
