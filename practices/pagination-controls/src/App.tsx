import { useState } from "react";

const items = Array.from({ length: 12 }, (_, index) => `항목 ${index + 1}`);

export const getPageItems = <Item,>(allItems: Item[], page: number, pageSize: number) => allItems.slice(0, pageSize);

export const App = () => {
  const [page, setPage] = useState(1);
  const pageItems = getPageItems(items, page, 5);
  return <main className="app"><section className="panel stack"><p className="eyebrow">List</p><h1>Pagination Controls</h1><ul>{pageItems.map((item) => <li key={item}>{item}</li>)}</ul><p role="status">{page} / 3</p><button type="button" onClick={() => setPage(page - 1)}>이전</button><button type="button" onClick={() => setPage(page + 1)}>다음</button></section></main>;
};
