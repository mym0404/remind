import { useState } from "react";

const options = ["React Router", "React Query", "React Suspense", "ResizeObserver", "IntersectionObserver"];

export const App = () => {
  const [value, setValue] = useState("");
  const matches = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 05</p>
        <h1>Concept Autocomplete</h1>
        <label htmlFor="concept">개념 검색</label>
        <input id="concept" value={value} onChange={(event) => setValue(event.target.value)} />
        {value ? (
          <ul>
            {matches.map((option) => (
              <li key={option}>
                <button type="button" onClick={() => setValue(option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
};
