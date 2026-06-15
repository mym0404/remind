import { useState } from "react";

export const useLocalStorage = <Value,>(_key: string, initialValue: Value) => useState(initialValue);

export const App = () => {
  const [name, setName] = useLocalStorage("practice-name", "");
  return <main className="app"><section className="panel stack"><p className="eyebrow">Hooks</p><h1>Local Storage Hook</h1><label htmlFor="name">이름</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} /><p role="status">{name || "비어 있음"}</p></section></main>;
};
