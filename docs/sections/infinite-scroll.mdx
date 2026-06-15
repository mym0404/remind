# Infinite Scroll

## 언제 쓰나

- 사용자가 목록 끝에 가까워졌을 때 다음 page를 자동으로 붙여야 할 때 쓴다.
- 검색 결과, 피드, 알림처럼 사용자가 계속 아래로 내려가며 보는 화면에 잘 맞는다.
- 한 번에 모든 데이터를 불러오면 응답이 느려지거나 렌더링 비용이 커질 때 쓴다.
- footer나 중요한 하단 버튼을 사용자가 반드시 봐야 하는 화면에는 pagination이나 더 보기 버튼이 더 낫다.

## 바로 쓰는 코드

sentinel element를 목록 끝에 두고 `IntersectionObserver`로 감지한다. observer callback은 오래된 state를 잡기 쉬우므로 `loading`, `hasMore`, 다음 page 값은 ref로 함께 관리한다.

```tsx
import { useCallback, useEffect, useRef, useState } from "react";

type FeedItem = {
  id: string;
  summary: string;
  title: string;
};

type FeedPage = {
  items: FeedItem[];
  nextPage: number | undefined;
};

const fetchFeedPage = async (page: number, signal: AbortSignal) => {
  const response = await fetch(`/api/feed?page=${page}`, { signal });

  if (!response.ok) {
    throw new Error("목록을 불러오지 못했습니다.");
  }

  const body: FeedPage = await response.json();

  return body;
};

export const FeedList = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | undefined>(undefined);
  const nextPageRef = useRef(1);
  const requestedPageRef = useRef<number | undefined>(undefined);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const canLoadOnIntersectRef = useRef(true);

  const [items, setItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const updateLoading = useCallback((value: boolean) => {
    isLoadingRef.current = value;
    setIsLoading(value);
  }, []);

  const updateHasMore = useCallback((value: boolean) => {
    hasMoreRef.current = value;
    setHasMore(value);
  }, []);

  const loadNextPage = useCallback(async () => {
    const page = nextPageRef.current;

    if (
      isLoadingRef.current ||
      !hasMoreRef.current ||
      requestedPageRef.current === page
    ) {
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    requestedPageRef.current = page;
    updateLoading(true);
    setErrorMessage(undefined);

    try {
      const feedPage = await fetchFeedPage(page, controller.signal);

      if (controller.signal.aborted) {
        return;
      }

      setItems((currentItems) => [...currentItems, ...feedPage.items]);

      if (feedPage.nextPage === undefined) {
        updateHasMore(false);
        return;
      }

      nextPageRef.current = feedPage.nextPage;
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      requestedPageRef.current = undefined;
      setErrorMessage(
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      );
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = undefined;
        updateLoading(false);
      }
    }
  }, [updateHasMore, updateLoading]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (!entry.isIntersecting) {
          canLoadOnIntersectRef.current = true;
          return;
        }

        if (!canLoadOnIntersectRef.current) {
          return;
        }

        canLoadOnIntersectRef.current = false;
        void loadNextPage();
      },
      {
        root: rootRef.current,
        rootMargin: "240px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      abortControllerRef.current?.abort();
    };
  }, [loadNextPage]);

  const retry = () => {
    canLoadOnIntersectRef.current = true;
    void loadNextPage();
  };

  return (
    <section>
      <div ref={rootRef} style={{ maxHeight: 480, overflowY: "auto" }}>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
        <div ref={sentinelRef} aria-hidden="true" />
      </div>

      {isLoading && <p>불러오는 중입니다.</p>}

      {errorMessage && (
        <div role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={retry}>
            다시 시도
          </button>
        </div>
      )}

      {!hasMore && <p>마지막 항목입니다.</p>}
    </section>
  );
};
```

## 실수 포인트

- sentinel ref를 목록 끝에 두지 않으면 사용자가 끝에 닿기 전에 요청이 나가거나 아예 요청이 나가지 않는다.
- observer callback에서 state를 바로 읽으면 stale closure 때문에 이미 `loading`인데도 다시 요청할 수 있다.
- `loading` 중 요청을 막지 않으면 같은 page가 여러 번 append될 수 있다.
- 요청한 page 번호를 ref에 기록하지 않으면 observer가 같은 intersection을 여러 번 알려줄 때 중복 호출이 생긴다.
- `hasMore`가 false가 된 뒤에도 요청하면 마지막 page를 계속 다시 불러온다.
- `observer.disconnect()`를 cleanup에 넣지 않으면 unmount 뒤에도 callback이 남을 수 있다.
- `root`는 감시 기준 scroll container이고, `rootMargin`은 미리 불러올 거리이며, `threshold`는 얼마나 보여야 감지할지 정하는 값이다.
- 리스트가 짧아 sentinel이 계속 보이면 다음 page를 연속으로 당겨올 수 있다. sentinel이 화면 밖으로 나갔다가 다시 들어올 때만 요청하도록 잠근다.

## 참고

- [MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
