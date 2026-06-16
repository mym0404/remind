import { useEffect, useState } from "react";

export const products = ["React Handbook", "Router Patterns", "Testing Guide", "CSS Layout"];

export const searchProducts = (query: string) =>
  products.filter((product) => product.toLowerCase().includes(query.trim().toLowerCase()));

export const useDebounce = <T,>(value: T, _delay: number) => value;

export const App = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState(products);

  useEffect(() => {
    setResults(searchProducts(debouncedQuery));
  }, [debouncedQuery]);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Async</p>
        <h1>Debounced Search</h1>
        <label htmlFor="query">검색어</label>
        <input id="query" value={query} onChange={(event) => setQuery(event.target.value)} />
        <p role="status">검색 기준: {debouncedQuery || "전체"}</p>
        <ul>{results.map((result) => <li key={result}>{result}</li>)}</ul>
      </section>
    </main>
  );
};
