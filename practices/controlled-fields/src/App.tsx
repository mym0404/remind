import { useState } from "react";

const roleOptions = ["frontend", "backend", "designer"] as const;

export const App = () => {
  const [name, setName] = useState("");

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Form</p>
        <h1>Controlled Fields</h1>
        <label htmlFor="name">이름</label>
        <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
        <label htmlFor="email">이메일</label>
        <input id="email" />
        <label htmlFor="role">역할</label>
        <select id="role">
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <label className="row">
          <input type="checkbox" />
          약관에 동의합니다
        </label>
        <p role="status">{name || "이름 없음"}</p>
      </section>
    </main>
  );
};
