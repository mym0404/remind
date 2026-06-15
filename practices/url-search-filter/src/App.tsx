import { useState } from "react";

const items = ["React", "Router", "Debounce", "Throttle"];

export const App = () => {
  const [query, setQuery] = useState("");
  const filteredItems = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return <main className="app"><section className="panel stack"><p className="eyebrow">Router</p><h1>URL Search Filter</h1><label htmlFor="query">검색어</label><input id="query" value={query} onChange={(event) => setQuery(event.target.value)} /><ul>{filteredItems.map((item) => <li key={item}>{item}</li>)}</ul></section></main>;
};
