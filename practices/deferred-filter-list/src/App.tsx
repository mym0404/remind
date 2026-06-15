import { useMemo, useState } from "react";

const metrics = Array.from({ length: 2000 }, (_, index) => `Metric ${index}`);

export const App = () => {
  const [query, setQuery] = useState("");
  const filteredMetrics = useMemo(() => metrics.filter((metric) => metric.toLowerCase().includes(query.toLowerCase())), [query]);
  return <main className="app"><section className="panel stack"><p className="eyebrow">List</p><h1>Deferred Filter List</h1><label htmlFor="query">Metric 검색</label><input id="query" value={query} onChange={(event) => setQuery(event.target.value)} /><p role="status">{filteredMetrics.length}개 표시</p><ul>{filteredMetrics.slice(0, 20).map((metric) => <li key={metric}>{metric}</li>)}</ul></section></main>;
};
