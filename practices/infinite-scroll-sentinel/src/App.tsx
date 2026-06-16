import { useEffect, useRef, useState } from "react";

export const getNextItems = (page: number, pageSize: number) =>
  Array.from({ length: pageSize }, (_, index) => `Item ${page * pageSize + index + 1}`);

export const canLoadNext = (loading: boolean, hasMore: boolean) => !loading && hasMore;

export const App = () => {
  const [items, setItems] = useState(() => getNextItems(0, 5));
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(() => undefined);
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">List</p>
        <h1>Infinite Scroll Sentinel</h1>
        <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
        <div ref={sentinelRef} data-testid="sentinel" />
        <button type="button" onClick={() => setItems([...items, ...getNextItems(1, 5)])}>더 보기</button>
      </section>
    </main>
  );
};
