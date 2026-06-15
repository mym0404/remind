# Suspense

## 언제 쓰나

Suspense는 자식 컴포넌트가 아직 렌더링할 준비가 안 되었을 때 fallback을 보여주는 loading boundary다. `React.lazy`로 나눈 코드나 Suspense를 지원하는 data source를 기다릴 때 쓴다.

Suspense는 실패를 처리하지 않는다. Promise가 pending이면 Suspense fallback이 보이고, 렌더링 중 에러나 rejected Promise는 가장 가까운 Error Boundary가 처리한다. 둘을 같이 둘 때는 Suspense가 대기 화면을, Error Boundary가 실패 화면을 맡는다.

boundary는 사용자가 기다리는 단위에 맞춘다. 페이지 전체가 같이 보여야 하면 하나로 묶고, 추천 목록이나 사이드 패널만 늦어도 되면 그 부분만 작은 boundary로 분리한다.

일반 loading state는 요청 시작, 완료, 실패를 컴포넌트 state로 직접 관리한다. Suspense data fetching은 렌더링 중 읽은 resource가 준비되지 않았을 때 React에게 기다리라고 알리고, 가장 가까운 boundary가 fallback을 렌더링한다. 그래서 Suspense를 쓰려면 framework, router loader, cache처럼 안정적인 Promise나 resource를 주는 계층이 필요하다.

## 바로 쓰는 코드

아래 예시는 Server Component, router loader, framework cache 같은 바깥 계층에서 만든 Promise를 prop으로 받는 구조다. 컴포넌트 렌더링 중 `fetch()`를 직접 호출해 Promise를 매번 새로 만들지 않는다.

```tsx
import {
  Component,
  Suspense,
  use,
  type ErrorInfo,
  type ReactNode,
} from "react";

type User = {
  email: string;
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
};

type ProfilePageProps = {
  postsPromise: Promise<Post[]>;
  userPromise: Promise<User>;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const ProfileHeader = ({ userPromise }: { userPromise: Promise<User> }) => {
  const user = use(userPromise);

  return (
    <header>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </header>
  );
};

const RecentPosts = ({ postsPromise }: { postsPromise: Promise<Post[]> }) => {
  const posts = use(postsPromise);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export const ProfilePage = ({
  postsPromise,
  userPromise,
}: ProfilePageProps) => (
  <ErrorBoundary
    fallback={<section role="alert">프로필을 불러오지 못했습니다.</section>}
  >
    <Suspense fallback={<p aria-busy="true">프로필을 불러오는 중입니다.</p>}>
      <ProfileHeader userPromise={userPromise} />

      <Suspense fallback={<p aria-busy="true">최근 글을 불러오는 중입니다.</p>}>
        <RecentPosts postsPromise={postsPromise} />
      </Suspense>
    </Suspense>
  </ErrorBoundary>
);
```

## 실수 포인트

- Suspense fallback을 실패 화면처럼 쓰면 안 된다.
- Error Boundary만 두면 pending 상태를 사용자에게 보여줄 수 없다.
- 일반 `useEffect` fetch에 Suspense를 감싸도 자동으로 loading state가 사라지지 않는다.
- Client Component 렌더링 중 Promise를 새로 만들면 매 렌더링마다 다시 suspend될 수 있다.
- 앱 전체를 하나의 Suspense로만 감싸면 작은 지연도 전체 화면을 가린다.
- 너무 작은 단위마다 boundary를 두면 fallback이 여러 곳에서 따로 깜빡인다.
- fallback 크기가 실제 콘텐츠와 너무 다르면 데이터가 준비될 때 layout shift가 커진다.

## 참고

- [React Suspense](https://react.dev/reference/react/Suspense)
