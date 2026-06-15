# IntersectionObserver

## 언제 쓰나

`IntersectionObserver`는 element가 viewport나 scroll container 안에 들어왔는지 감지할 때 쓴다. `scroll event`를 직접 듣고 매번 좌표를 계산하는 방식보다 단순하고, 브라우저가 관찰 시점을 조절할 수 있다.

자주 쓰는 곳은 infinite scroll의 sentinel, 이미지 lazy loading, 카드나 광고 노출 감지다. popover나 dropdown의 trigger가 화면 밖으로 나갔을 때 floating element를 닫거나 숨기는 데도 쓸 수 있다.

`root`는 관찰 기준 영역이다. 값을 주지 않으면 viewport가 기준이다. `rootMargin`은 기준 영역을 미리 넓히거나 줄인다. `threshold`는 target이 얼마나 보였을 때 callback을 받을지 정한다.

## 바로 쓰는 코드

observer 생성과 cleanup은 hook으로 모아 둔다. callback은 `ref`에 저장해 stale closure를 피하고, observer를 불필요하게 다시 만들지 않는다.

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

type UseIntersectionObserverArgs<T extends Element> = {
  enabled?: boolean;
  onChange: (entry: IntersectionObserverEntry) => void;
  rootMargin?: string;
  rootRef?: RefObject<Element | null>;
  targetRef: RefObject<T | null>;
  threshold?: number | number[];
};

export const useIntersectionObserver = <T extends Element>({
  enabled = true,
  onChange,
  rootMargin = "0px",
  rootRef,
  targetRef,
  threshold = 0,
}: UseIntersectionObserverArgs<T>) => {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const target = targetRef.current;

    if (!enabled || !target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          onChangeRef.current(entry);
        }
      },
      {
        root: rootRef?.current ?? null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, rootMargin, rootRef, targetRef, threshold]);
};
```

infinite scroll에서는 목록 끝에 빈 sentinel을 둔다. loading 중이거나 더 불러올 데이터가 없으면 요청하지 않아야 같은 page를 여러 번 붙이지 않는다.

```tsx
type Product = {
  id: string;
  name: string;
};

type ProductPage = {
  hasMore: boolean;
  items: Product[];
};

const fetchProductsPage = async ({
  page,
  signal,
}: {
  page: number;
  signal: AbortSignal;
}) => {
  const response = await fetch(`/api/products?page=${page}`, { signal });

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  const body: ProductPage = await response.json();

  return body;
};

export const ProductList = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | undefined>(undefined);
  const hasMoreRef = useRef(true);
  const isLoadingRef = useRef(false);
  const nextPageRef = useRef(1);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const loadNextPage = async () => {
    if (isLoadingRef.current || !hasMoreRef.current) {
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    isLoadingRef.current = true;
    setErrorMessage(undefined);
    setIsLoading(true);

    try {
      const page = await fetchProductsPage({
        page: nextPageRef.current,
        signal: controller.signal,
      });

      setProducts((current) => [...current, ...page.items]);
      nextPageRef.current += 1;
      hasMoreRef.current = page.hasMore;
      setHasMore(page.hasMore);
    } catch (error) {
      if (!controller.signal.aborted) {
        setErrorMessage(
          error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    }
  };

  useIntersectionObserver({
    enabled: hasMore,
    onChange: (entry) => {
      if (entry.isIntersecting) {
        void loadNextPage();
      }
    },
    rootMargin: "160px 0px",
    rootRef,
    targetRef: sentinelRef,
    threshold: 0,
  });

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <section>
      {errorMessage ? <p role="alert">{errorMessage}</p> : undefined}

      <div ref={rootRef} style={{ maxHeight: 360, overflowY: "auto" }}>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>

        {hasMore ? <div ref={sentinelRef} aria-hidden="true" /> : undefined}
      </div>

      {isLoading ? <p>불러오는 중입니다.</p> : undefined}
    </section>
  );
};
```

이미지는 화면 근처에 왔을 때만 실제 `src`를 넣는다. native `loading="lazy"`로 충분하지 않고, 미리 fetch하거나 analytics를 함께 처리해야 할 때 이 방식이 유용하다.

```tsx
export const LazyProfileImage = ({
  alt,
  src,
}: {
  alt: string;
  src: string;
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useIntersectionObserver({
    enabled: !shouldLoad,
    onChange: (entry) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
      }
    },
    rootMargin: "320px 0px",
    targetRef: imageRef,
    threshold: 0,
  });

  return <img ref={imageRef} src={shouldLoad ? src : undefined} alt={alt} />;
};
```

popover는 trigger가 화면 밖으로 나가면 닫는다. 화면에 남은 floating element가 엉뚱한 위치에 떠 있는 상태를 막을 수 있다.

```tsx
export const AccountMenu = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useIntersectionObserver({
    enabled: isOpen,
    onChange: (entry) => {
      if (!entry.isIntersecting) {
        setIsOpen(false);
      }
    },
    targetRef: triggerRef,
    threshold: 0,
  });

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        계정
      </button>

      {isOpen ? (
        <div>
          <button type="button">설정</button>
        </div>
      ) : undefined}
    </div>
  );
};
```

## 실수 포인트

- `scroll event`는 자주 실행되므로 좌표 계산, throttle, cleanup을 직접 챙겨야 한다.
- 단순 진입 감지는 `IntersectionObserver`가 더 잘 맞는다.
- scroll container가 기준이면 `root`에 container element를 넘긴다.
- viewport보다 먼저 감지하려면 `rootMargin`을 양수로 넓힌다.
- 절반 이상 보였을 때만 처리하려면 `threshold`를 `0.5`처럼 올린다.
- observer callback에서는 `isLoading`과 `hasMore`를 확인해 중복 요청을 막는다.
- 리스트가 짧아 sentinel이 바로 보여도 같은 page를 다시 요청하지 않게 막는다.
- unmount 때 `disconnect()`로 observer를 정리한다.
- fetch를 함께 쓴다면 unmount 때 `AbortController`로 진행 중인 요청도 중단한다.
- `threshold`에 배열을 넘길 때는 매 렌더마다 새 배열을 만들지 않는다.
- popover trigger가 화면 밖으로 나가면 위치만 다시 계산할지, 닫거나 숨길지도 함께 정한다.

## 참고

- [MDN IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
