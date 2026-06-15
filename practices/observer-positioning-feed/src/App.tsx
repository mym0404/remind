import { useMemo, useState } from "react";

type Placement = "top" | "bottom";

export const getFloatingStyle = ({
  placement,
  trigger,
  floating,
}: {
  placement: Placement;
  trigger: DOMRect;
  floating: { width: number; height: number };
}) => {
  const top = placement === "top" ? trigger.top - floating.height - 8 : trigger.bottom + 8;

  return {
    top,
    left: trigger.left,
  };
};

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `item-${index + 1}`,
    title: `관찰 항목 ${index + 1}`,
  }));

export const App = () => {
  const [count, setCount] = useState(12);
  const items = useMemo(() => makeItems(count), [count]);

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 07</p>
        <h1>Observer Feed</h1>
        <button type="button" onClick={() => setCount(count + 6)}>
          더 불러오기
        </button>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        <div data-testid="sentinel">끝</div>
      </section>
    </main>
  );
};
