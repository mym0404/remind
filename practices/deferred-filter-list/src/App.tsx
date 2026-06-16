import { useDeferredValue, useState } from "react";

export const items = ["React Handbook", "Router Patterns", "Testing Guide", "CSS Layout"];

export const filterItems = (allItems: string[], query: string) =>
	allItems;

export const App = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = filterItems(items, deferredQuery);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">List</p>
        <h1>Deferred Filter List</h1>
        <label htmlFor="query">검색어</label>
        <input id="query" value={query} onChange={(event) => setQuery(event.target.value)} />
        <p role="status">{query !== deferredQuery ? "목록 갱신 중" : "목록 준비"}</p>
        <ul>{filtered.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </main>
  );
};
