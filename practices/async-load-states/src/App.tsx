export type Product = { id: string; name: string };
export type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };

export const fetchProducts = async (): Promise<Product[]> => [{ id: "react", name: "React Handbook" }];

export const toLoadState = (_products: Product[]): LoadState => ({ status: "idle" });

export const productLoader = {
  fetchProducts,
};

export const App = () => {
  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Async</p>
        <h1>Async Load States</h1>
        <p role="status">상품을 불러오지 않았습니다.</p>
      </section>
    </main>
  );
};
