import { FormEvent, useState } from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
};

const products: Product[] = [
  { id: "react-handbook", name: "React Handbook", category: "book" },
  { id: "typescript-map", name: "TypeScript Map", category: "book" },
  { id: "query-kit", name: "Query Kit", category: "tool" },
  { id: "router-lab", name: "Router Lab", category: "tool" },
];

export const App = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(products);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItems(products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 02</p>
        <h1>Async Product Search</h1>
        <form aria-label="상품 검색" onSubmit={handleSubmit}>
          <label htmlFor="query">검색어</label>
          <input id="query" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit">검색</button>
        </form>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <span>{item.category}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
