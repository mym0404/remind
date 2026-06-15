# Pagination

## 언제 쓰나

목록이 길어서 한 화면에 모두 보여주기 어렵다면 pagination을 쓴다. 사용자는 현재 page를 보고, 이전 page나 다음 page로 이동한다.

이미 받은 배열을 나눠 보여줄 때는 page state와 page size로 `slice`한다. 전체 데이터를 한 번에 가져오기 어렵다면 page와 page size를 서버에 보내고, 응답으로 현재 page의 데이터와 다음 page 여부를 받는다.

## 바로 쓰는 코드

클라이언트에 이미 있는 배열은 `page`와 `pageSize`로 잘라서 보여준다. `hasPrev`, `hasNext`는 버튼의 `disabled` 상태에 그대로 연결한다.

```tsx
import { useMemo, useState } from "react";

type Order = {
  id: string;
  status: string;
  title: string;
};

const pageSize = 10;

export const LocalOrderList = ({ orders }: { orders: Order[] }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(orders.length / pageSize));
  const currentPage = Math.min(page, pageCount);

  const visibleOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return orders.slice(startIndex, startIndex + pageSize);
  }, [currentPage, orders]);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < pageCount;

  return (
    <section>
      <ul>
        {visibleOrders.map((order) => (
          <li key={order.id}>
            <strong>{order.title}</strong>
            <span>{order.status}</span>
          </li>
        ))}
      </ul>

      <nav aria-label="주문 목록 페이지">
        <button
          type="button"
          onClick={() => setPage(currentPage - 1)}
          disabled={!hasPrev}
        >
          이전
        </button>
        <span>
          {currentPage} / {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setPage(currentPage + 1)}
          disabled={!hasNext}
        >
          다음
        </button>
      </nav>
    </section>
  );
};
```

서버 pagination은 page가 바뀔 때마다 다시 요청한다. loading 중에는 버튼을 막고, 같은 요청이 겹치지 않게 handler에서도 한 번 더 막는다.

```tsx
import { useEffect, useRef, useState } from "react";

type Order = {
  id: string;
  status: string;
  title: string;
};

type OrdersPage = {
  hasNext: boolean;
  items: Order[];
};

const pageSize = 20;

const fetchOrdersPage = async ({
  page,
  signal,
}: {
  page: number;
  signal: AbortSignal;
}) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  const response = await fetch(`/api/orders?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error("주문 목록을 불러오지 못했습니다.");
  }

  const body: OrdersPage = await response.json();

  return body;
};

export const ServerOrderList = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const listTopRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadOrders = async () => {
      isLoadingRef.current = true;
      setIsLoading(true);
      setErrorMessage(undefined);

      try {
        const body = await fetchOrdersPage({
          page,
          signal: controller.signal,
        });

        setOrders(body.items);
        setHasNext(body.hasNext);
        listTopRef.current?.scrollIntoView({ block: "start" });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setOrders([]);
        setHasNext(false);
        setErrorMessage(
          error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        );
      } finally {
        if (!controller.signal.aborted) {
          isLoadingRef.current = false;
          setIsLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      controller.abort();
    };
  }, [page]);

  const hasPrev = page > 1;

  const changePage = (nextPage: number) => {
    if (isLoadingRef.current || nextPage < 1 || nextPage === page) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    setPage(nextPage);
  };

  return (
    <section>
      <div ref={listTopRef} />

      {isLoading && <p>불러오는 중입니다.</p>}
      {errorMessage && <p role="alert">{errorMessage}</p>}

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.title}</strong>
            <span>{order.status}</span>
          </li>
        ))}
      </ul>

      <nav aria-label="주문 목록 페이지">
        <button
          type="button"
          onClick={() => changePage(page - 1)}
          disabled={!hasPrev || isLoading}
        >
          이전
        </button>
        <span>{page}</span>
        <button
          type="button"
          onClick={() => changePage(page + 1)}
          disabled={!hasNext || isLoading}
        >
          다음
        </button>
      </nav>
    </section>
  );
};
```

## 실수 포인트

- page를 state로 두지 않으면 현재 위치와 버튼 상태를 같이 맞추기 어렵다.
- page size 없이 임의 숫자로 `slice`하면 page 계산이 흩어진다.
- 서버 pagination에서 전체 개수를 모른다면 `hasNext`를 응답으로 받는다.
- `hasPrev`는 보통 `page > 1`로 계산한다.
- loading 중에도 버튼을 열어두면 같은 page 요청이 여러 번 나갈 수 있다.
- page를 바꿨는데 fetch dependency에 page를 넣지 않으면 이전 page 데이터가 남는다.
- page 변경 후 스크롤 위치를 옮기지 않으면 사용자가 목록 중간에 남을 수 있다.
- disabled button은 클릭을 막을 뿐 아니라 지금 가능한 이동 방향을 보여준다.

## 참고

- [MDN button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
