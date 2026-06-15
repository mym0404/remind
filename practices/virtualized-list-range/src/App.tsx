export const items = Array.from({ length: 2000 }, (_, index) => ({ id: `item-${index}`, label: `Row ${index}` }));

export const getVisibleRange = (_params: { scrollTop: number; viewportHeight: number; rowHeight: number; itemCount: number; overscan: number }) => ({ start: 0, end: items.length });

export const App = () => {
  const visibleItems = items;
  return <main className="app"><section className="panel stack"><p className="eyebrow">List</p><h1>Virtualized List Range</h1><p role="status">{visibleItems.length}개 렌더링</p><ul>{visibleItems.map((item) => <li key={item.id}>{item.label}</li>)}</ul></section></main>;
};
