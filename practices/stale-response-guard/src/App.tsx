import { useEffect, useState } from "react";

export const searchProducts = async (query: string, delay = 0) =>
  new Promise<string[]>((resolve) => {
    window.setTimeout(() => resolve([`${query} result`]), delay);
  });

export const shouldApplyResponse = (responseId: number, latestId: number) => responseId === latestId;

export const App = () => {
  const [query, setQuery] = useState("react");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchProducts(query).then((nextResults) => {
      setResults(nextResults);
      setLoading(false);
    });
  }, [query]);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Async</p>
        <h1>Stale Response Guard</h1>
        <label htmlFor="query">검색어</label>
        <input id="query" value={query} onChange={(event) => setQuery(event.target.value)} />
        <p role="status">{loading ? "검색 중" : "검색 완료"}</p>
        <ul>{results.map((result) => <li key={result}>{result}</li>)}</ul>
      </section>
    </main>
  );
};
