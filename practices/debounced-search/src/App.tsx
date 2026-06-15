import { useState } from "react";

const concepts = ["React Router", "React Query", "Suspense", "Virtualized List"];

export const useDebounce = <Value,>(value: Value, _delay: number) => value;

export const App = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const matches = concepts.filter((item) => item.toLowerCase().includes(debouncedQuery.toLowerCase()));
  return <main className="app"><section className="panel stack"><p className="eyebrow">Async</p><h1>Debounced Search</h1><label htmlFor="query">검색어</label><input id="query" value={query} onChange={(event) => setQuery(event.target.value)} /><p role="status">{debouncedQuery || "대기"}</p><ul>{matches.map((item) => <li key={item}>{item}</li>)}</ul></section></main>;
};
