import { useState } from "react";

export type VisibleRange = {
  start: number;
  end: number;
  beforeHeight: number;
  afterHeight: number;
};

export const getVisibleRange = (_options: {
  scrollTop: number;
  viewportHeight: number;
  rowHeight: number;
  itemCount: number;
  overscan: number;
}): VisibleRange => ({ start: 0, end: 0, beforeHeight: 0, afterHeight: 0 });

const items = Array.from({ length: 1000 }, (_, index) => `Row ${index + 1}`);

export const App = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const range = getVisibleRange({
    scrollTop,
    viewportHeight: 120,
    rowHeight: 30,
    itemCount: items.length,
    overscan: 2,
  });
  const visibleItems = items.slice(range.start, range.end);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">List</p>
        <h1>Virtualized List Range</h1>
        <div
          style={{ height: 120, overflow: "auto" }}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <div data-testid="before-spacer" style={{ height: range.beforeHeight }} />
          {visibleItems.map((item) => (
            <div key={item} style={{ height: 30 }}>
              {item}
            </div>
          ))}
          <div data-testid="after-spacer" style={{ height: range.afterHeight }} />
        </div>
      </section>
    </main>
  );
};
