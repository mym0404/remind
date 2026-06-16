import { useEffect, useRef, useState } from "react";

export const getNextItems = (page: number, pageSize: number) =>
  Array.from({ length: pageSize }, (_, index) => `Item ${page * pageSize + index + 1}`);

export const canLoadNext = (loading: boolean, hasMore: boolean) => !loading && hasMore;

export const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  _onIntersect: () => void,
) => {
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(() => undefined);
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [targetRef]);
};

export const App = () => {
  const [items, setItems] = useState(() => getNextItems(0, 5));
  const sentinelRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(sentinelRef, () => {
    setItems((currentItems) => [...currentItems, ...getNextItems(1, 5)]);
  });

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">List</p>
        <h1>Infinite Scroll Sentinel</h1>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div ref={sentinelRef} data-testid="sentinel" />
      </section>
    </main>
  );
};
