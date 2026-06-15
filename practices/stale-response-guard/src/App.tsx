import { useState } from "react";

export const searchProducts = async (query: string) => {
  await new Promise((resolve) => window.setTimeout(resolve, query === "slow" ? 400 : 50));
  return [`${query} result`];
};

export const App = () => {
  const [query, setQuery] = useState("");
  const [results] = useState<string[]>([]);
  return <main className="app"><section className="panel stack"><p className="eyebrow">Async</p><h1>Stale Response Guard</h1><label htmlFor="query">검색어</label><input id="query" value={query} onChange={(event) => setQuery(event.target.value)} /><ul>{results.map((result) => <li key={result}>{result}</li>)}</ul></section></main>;
};
