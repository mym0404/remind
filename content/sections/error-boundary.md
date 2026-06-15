# Error Boundary

## 언제 쓰나

Error Boundary는 자식 컴포넌트가 렌더링 중에 던진 에러를 잡고, 화면 전체가 비는 대신 fallback UI를 보여줄 때 쓴다. 보통 route, page, 중요한 panel처럼 사용자가 다시 시도할 수 있는 화면 단위에 둔다.

이벤트 핸들러나 async 작업에서 난 에러는 Error Boundary가 직접 잡지 못한다. 버튼 클릭, `setTimeout`, `fetch` 실패는 해당 코드에서 `try/catch`로 처리하고, 필요하면 state를 바꿔 에러 화면을 렌더링한다.

## 바로 쓰는 코드

`getDerivedStateFromError`로 fallback 상태를 만들고, `componentDidCatch`에서 로깅한다. 다시 시도할 때는 부모에서 `key`를 바꿔 Error Boundary를 새로 mount한다.

```tsx
import { Component, useState, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ onRetry }: { onRetry: () => void }) => (
  <section role="alert">
    <h2>이 화면을 불러오지 못했습니다.</h2>
    <p>잠시 후 다시 시도해 주세요.</p>
    <button type="button" onClick={onRetry}>
      다시 시도
    </button>
  </section>
);

const ProfilePanel = ({ shouldFail }: { shouldFail: boolean }) => {
  if (shouldFail) {
    throw new Error("Profile render failed");
  }

  return <section>프로필 화면</section>;
};

export const ProfileRoute = () => {
  const [boundaryKey, setBoundaryKey] = useState(0);
  const [shouldFail, setShouldFail] = useState(false);

  const resetBoundary = () => {
    setShouldFail(false);
    setBoundaryKey((key) => key + 1);
  };

  return (
    <ErrorBoundary
      key={boundaryKey}
      fallback={<ErrorFallback onRetry={resetBoundary} />}
      onError={(error, info) => {
        console.error(error.message, info.componentStack);
      }}
    >
      <button type="button" onClick={() => setShouldFail(true)}>
        렌더링 에러 만들기
      </button>
      <ProfilePanel shouldFail={shouldFail} />
    </ErrorBoundary>
  );
};
```

## 실수 포인트

- Error Boundary를 함수 컴포넌트로 만들 수 있다고 생각하면 안 된다. 현재는 class component에 `getDerivedStateFromError`나 `componentDidCatch`를 둔다.
- fallback UI 없이 로깅만 하면 사용자는 깨진 화면을 보게 된다.
- 앱 전체를 하나의 Error Boundary로만 감싸면 작은 화면 오류도 전체 장애처럼 보인다.
- 너무 작은 컴포넌트마다 감싸면 fallback이 여러 곳에 흩어져 흐름을 읽기 어렵다.
- 이벤트 핸들러에서 던진 에러는 Error Boundary가 직접 잡지 못한다.
- async callback에서 던진 에러는 Error Boundary가 직접 잡지 못한다.
- 다시 시도 버튼에서 내부 state만 바꾸면 이미 실패한 Error Boundary state가 남을 수 있다.
- reset이 필요하면 부모에서 `key`를 바꿔 Error Boundary를 remount한다.

## 참고

- [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
