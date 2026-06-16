import { useState } from "react";

export type Rect = { top: number; left: number; width: number; height: number };
export type Position = { top: number; left: number; placement: "bottom" | "top" };

export const computePopoverPosition = (_trigger: Rect, _popover: Rect, _viewport: { width: number; height: number }): Position => ({
  top: 0,
  left: 0,
  placement: "bottom",
});

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Overlay</p>
        <h1>Popover Positioning</h1>
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>필터</button>
        {open ? <div role="dialog">상태 필터</div> : null}
      </section>
    </main>
  );
};
