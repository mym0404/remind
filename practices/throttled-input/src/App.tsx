import { useState } from "react";

export const useThrottle = <Value,>(value: Value, _interval: number) => value;

export const App = () => {
  const [value, setValue] = useState("");
  const throttledValue = useThrottle(value, 500);
  return <main className="app"><section className="panel stack"><p className="eyebrow">Async</p><h1>Throttled Input</h1><label htmlFor="message">메시지</label><input id="message" value={value} onChange={(event) => setValue(event.target.value)} /><p role="status">{throttledValue || "대기"}</p></section></main>;
};
