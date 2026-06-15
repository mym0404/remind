# Context + Provider

## 언제 쓰나

Context는 멀리 떨어진 여러 컴포넌트가 같은 값을 읽거나 같은 action을 호출할 때 쓴다. 한두 단계 props로 전달할 수 있으면 props가 더 단순하다.

Toast, Modal, 로그인 사용자, 테마처럼 앱의 여러 위치에서 함께 쓰는 상태는 Provider에 둔다. Provider는 state와 action을 만들고, 하위 컴포넌트는 `useContext`를 감싼 hook으로 필요한 값만 꺼내 쓴다.

## 바로 쓰는 코드

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ModalState =
  | { type: "confirm"; title: string; message: string }
  | undefined;

type ModalContextValue = {
  modal: ModalState;
  openConfirm: (title: string, message: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>();

  const openConfirm = useCallback((title: string, message: string) => {
    setModal({ type: "confirm", title, message });
  }, []);

  const closeModal = useCallback(() => {
    setModal(undefined);
  }, []);

  const value = useMemo(
    () => ({ modal, openConfirm, closeModal }),
    [modal, openConfirm, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && (
        <div role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <h2 id="confirm-title">{modal.title}</h2>
          <p>{modal.message}</p>
          <button type="button" onClick={closeModal}>
            닫기
          </button>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return context;
};

export const DeleteButton = () => {
  const { openConfirm } = useModal();

  return (
    <button
      type="button"
      onClick={() =>
        openConfirm("삭제 확인", "선택한 항목을 삭제하시겠습니까?")
      }
    >
      삭제
    </button>
  );
};
```

```tsx
import { DeleteButton, ModalProvider } from "./ModalProvider";

export const App = () => {
  return (
    <ModalProvider>
      <DeleteButton />
    </ModalProvider>
  );
};
```

`ToastProvider`도 같은 구조로 만든다. Provider에 toast 배열과 `showToast` action을 두고, `useToast` hook에서 Provider 밖 사용을 막는다.

값을 자주 바꾸는 state와 action을 한 Context에 넣으면 action만 쓰는 컴포넌트도 같이 렌더링될 수 있다. 이런 경우에는 state를 읽는 Context와 action만 담는 Context를 나누거나, 더 가까운 Provider로 범위를 줄인다.

## 실수 포인트

- Provider 밖에서 `useContext`를 직접 쓰면 잘못 감싼 화면을 늦게 발견한다.
- Context 기본값에 빈 함수를 넣으면 Provider 누락을 알아차리기 어렵다.
- Provider hook은 context가 `undefined`일 때 바로 에러를 던진다.
- Provider가 state만 제공하고 action을 빼면 하위 컴포넌트가 다시 props를 받아야 한다.
- `value={{ modal, openConfirm, closeModal }}`처럼 매번 새 객체를 만들면 불필요한 리렌더링이 늘 수 있다.
- Context 하나에 자주 바뀌는 값과 거의 안 바뀌는 값을 모두 넣지 않는다.
- Toast나 Modal처럼 앱 전체에서 쓰는 기능도 필요한 화면 범위까지만 Provider로 감싼다.
- local state로 충분한 값을 Context로 올리면 변경 범위가 커진다.

## 참고

- [React createContext](https://react.dev/reference/react/createContext)
