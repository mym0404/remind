import { useMemo, useState } from "react";

export const makeItems = (count: number) => Array.from({ length: count }, (_, index) => `항목 ${index + 1}`);

export const App = () => {
  const [count, setCount] = useState(10);
  const items = useMemo(() => makeItems(count), [count]);
  return <main className="app"><section className="panel stack"><p className="eyebrow">List</p><h1>Infinite Scroll Sentinel</h1><button type="button" onClick={() => setCount(count + 5)}>더 불러오기</button><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul><div data-testid="sentinel">끝</div></section></main>;
};
