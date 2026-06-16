import { useState } from "react";

export const useThrottle = <T,>(value: T, _interval: number) => value;

export const App = () => {
  const [value, setValue] = useState("");
  const throttledValue = useThrottle(value, 500);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Async</p>
        <h1>Throttled Input</h1>
        <label htmlFor="message">메시지</label>
        <input id="message" value={value} onChange={(event) => setValue(event.target.value)} />
        <p role="status">처리 값: {throttledValue || "없음"}</p>
      </section>
    </main>
  );
};
