# Toast

## 언제 쓰나

Toast는 저장 완료, 삭제 실패, 네트워크 오류처럼 사용자가 방금 한 일의 결과를 짧게 알려줄 때 쓴다. 화면 흐름을 막지 않아야 하므로 확인이 꼭 필요한 일에는 modal이나 inline error가 더 낫다.

여러 곳에서 toast를 띄운다면 `ToastProvider`에 배열 상태를 두고 `useToast`로 `showToast(message)`를 꺼내 쓴다. 각 toast는 고유한 `id`, 화면에 보일 `message`, 의미를 나타내는 `variant`를 가진 item으로 관리한다.

## 바로 쓰는 코드

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);
const TOAST_DURATION = 3000;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const removeToast = useCallback((id: string) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = crypto.randomUUID();
      const toast: ToastItem = { id, message, variant };

      setToasts((currentToasts) => [...currentToasts, toast]);
      timersRef.current[id] = setTimeout(() => {
        removeToast(id);
      }, TOAST_DURATION);
    },
    [removeToast],
  );

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-area" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div className={`toast toast-${toast.variant}`} key={toast.id}>
            <span>{toast.message}</span>
            <button type="button" onClick={() => removeToast(toast.id)}>
              닫기
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};

export const SaveButton = () => {
  const { showToast } = useToast();

  return (
    <button
      type="button"
      onClick={() => showToast("저장했어요.", "success")}
    >
      저장
    </button>
  );
};
```

```tsx
import { SaveButton, ToastProvider } from "./ToastProvider";

export const App = () => {
  return (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  );
};
```

## 실수 포인트

- Toast를 하나의 객체 상태로 두면 새 toast가 이전 toast를 덮어쓴다.
- `setToasts([...toasts, toast])`처럼 현재 렌더의 값을 직접 쓰면 빠르게 여러 번 호출할 때 누락될 수 있다.
- 자동 제거 timer를 cleanup하지 않으면 Provider가 사라진 뒤에도 callback이 실행될 수 있다.
- 수동 닫기에서 timer를 지우지 않으면 이미 닫힌 toast를 다시 제거하려고 한다.
- 실패 toast와 성공 toast를 같은 style로만 보여주면 사용자가 결과를 구분하기 어렵다.
- `aria-live` 영역이 없으면 화면 읽기 프로그램이 새 toast를 놓칠 수 있다.

## 참고

- [MDN aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live)
