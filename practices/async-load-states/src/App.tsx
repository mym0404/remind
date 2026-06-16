import { useEffect, useState } from "react";

export type Product = { id: string; name: string };
export type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };

export const fetchProducts = async (): Promise<Product[]> => [{ id: "react", name: "React Handbook" }];

export const toLoadState = (_products: Product[]): LoadState => ({ status: "loading" });

export const App = () => {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    setState({ status: "loading" });
    fetchProducts()
      .then((products) => setState(toLoadState(products)))
      .catch(() => setState({ status: "error", message: "상품을 불러오지 못했습니다." }));
  }, []);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Async</p>
        <h1>Async Load States</h1>
        <p role="status">
          {state.status === "loading" ? "불러오는 중" : state.status === "error" ? state.message : ""}
        </p>
        {state.status === "success" ? <ul>{state.data.map((product) => <li key={product.id}>{product.name}</li>)}</ul> : null}
        {state.status === "empty" ? <p>상품이 없습니다.</p> : null}
      </section>
    </main>
  );
};
