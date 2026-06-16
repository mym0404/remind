import { useState } from "react";

export const readStorageValue = <T,>(_key: string, defaultValue: T): T => defaultValue;

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => readStorageValue(key, defaultValue));
  return [value, setValue, () => setValue(defaultValue)] as const;
};

export const App = () => {
  const [name, setName, resetName] = useLocalStorage("practice-name", "");

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Hook</p>
        <h1>Local Storage Hook</h1>
        <label htmlFor="name">이름</label>
        <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
        <button type="button" onClick={resetName}>초기화</button>
        <p role="status">{name || "저장된 이름 없음"}</p>
      </section>
    </main>
  );
};
