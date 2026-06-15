import { useState } from "react";

type Product = { id: string; name: string };

export const fetchProducts = async (mode: "success" | "empty" | "error" = "success"): Promise<Product[]> => {
  if (mode === "error") throw new Error("network");
  if (mode === "empty") return [];
  return [{ id: "react", name: "React Handbook" }];
};

export const App = () => {
  const [message] = useState("상품을 불러오지 않았습니다.");
  return <main className="app"><section className="panel stack"><p className="eyebrow">Async</p><h1>Async Load States</h1><p role="status">{message}</p></section></main>;
};
