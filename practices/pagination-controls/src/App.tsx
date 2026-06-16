import { useState } from "react";

export const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);

export const getPageItems = <T,>(allItems: T[], page: number, pageSize: number) =>
  allItems.slice((page - 1) * pageSize, page * pageSize);

export const getTotalPages = (totalItems: number, pageSize: number) =>
  Math.ceil(totalItems / pageSize);

export const clampPage = (page: number, totalPages: number) => Math.min(page, totalPages);

export const App = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const visibleItems = getPageItems(items, page, pageSize);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">List</p>
        <h1>Pagination Controls</h1>
        <label htmlFor="page-size">페이지 크기</label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(event) => setPageSize(Number(event.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <ul>
          {visibleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button type="button" onClick={() => setPage(page - 1)}>
          이전
        </button>
        <button type="button" onClick={() => setPage(page + 1)}>
          다음
        </button>
        <p role="status">
          {page} / {getTotalPages(items.length, pageSize)}
        </p>
      </section>
    </main>
  );
};
