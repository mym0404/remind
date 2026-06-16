import { useSearchParams } from "react-router-dom";

export const products = ["React Handbook", "Router Patterns", "Testing Guide", "CSS Layout"];

export const filterProducts = (items: string[], query: string) =>
  items.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));

export const App = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const filtered = filterProducts(products, query);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Router</p>
        <h1>URL Search Filter</h1>
        <label htmlFor="query">검색어</label>
        <input id="query" defaultValue={query} />
        <ul>{filtered.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </main>
  );
};
