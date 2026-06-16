import { useState } from "react";

export type Role = "frontend" | "backend" | "designer";

export type FormState = {
  name: string;
  email: string;
  role: Role;
  agreed: boolean;
};

export const initialForm: FormState = {
  name: "",
  email: "",
  role: "frontend",
  agreed: false,
};

export const formatPreview = (form: FormState) =>
  form.name || form.email || form.agreed
    ? `${form.name || "이름 없음"} / ${form.email || "이메일 없음"} / ${form.role} / ${form.agreed ? "동의" : "미동의"}`
    : "입력 대기";

const roleOptions: Role[] = ["frontend", "backend", "designer"];

export const App = () => {
  const [form, setForm] = useState(initialForm);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Form</p>
        <h1>Controlled Fields</h1>
        <label htmlFor="name">이름</label>
        <input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <label htmlFor="email">이메일</label>
        <input id="email" />
        <label htmlFor="role">역할</label>
        <select id="role" value={form.role}>
          {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
        </select>
        <label className="row">
          <input type="checkbox" />
          약관에 동의합니다
        </label>
        <button type="button">초기화</button>
        <p role="status">{formatPreview(form)}</p>
      </section>
    </main>
  );
};
