import { useMemo, useState } from "react";

type Metric = {
  id: string;
  label: string;
  value: number;
};

const metrics: Metric[] = Array.from({ length: 2000 }, (_, index) => ({
  id: `metric-${index + 1}`,
  label: `Metric ${index + 1}`,
  value: (index * 37) % 100,
}));

export const getVisibleRange = ({
  scrollTop,
  rowHeight,
  viewportHeight,
  total,
  overscan,
}: {
  scrollTop: number;
  rowHeight: number;
  viewportHeight: number;
  total: number;
  overscan: number;
}) => {
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end = Math.min(total, Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan);

  return { start, end };
};

export const App = () => {
  const [query, setQuery] = useState("");
  const filteredMetrics = useMemo(
    () => metrics.filter((metric) => metric.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 08</p>
        <h1>Performance Dashboard</h1>
        <label htmlFor="metric-query">Metric 검색</label>
        <input id="metric-query" value={query} onChange={(event) => setQuery(event.target.value)} />
        <p role="status">{filteredMetrics.length}개 표시</p>
        <ul>
          {filteredMetrics.slice(0, 80).map((metric) => (
            <li key={metric.id}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
