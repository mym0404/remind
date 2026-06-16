import { useState } from "react";

export type Role = "frontend" | "backend" | "designer";

export type FormState = {
  name: string;
  email: string;
  role: Role;
  terms: boolean;
};

export const initialForm: FormState = {
  name: "",
  email: "",
  role: "frontend",
  terms: false,
};

export const roleOptions: Role[] = ["frontend", "backend", "designer"];

export const formatPreview = (_form: FormState) => "입력 대기";

export const updateFormField = <Key extends keyof FormState>(
  form: FormState,
  _field: Key,
  _value: FormState[Key],
) => form;

export const resetForm = (form: FormState) => form;

export const App = () => {
  const [form, setForm] = useState(initialForm);

  const handleFieldChange = <Key extends keyof FormState>(field: Key, value: FormState[Key]) => {
    setForm((currentForm) => updateFormField(currentForm, field, value));
  };

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Form</p>
        <h1>Controlled Fields</h1>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          value={form.name}
          onChange={(event) => handleFieldChange("name", event.target.value)}
        />
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          value={form.email}
          onChange={(event) => handleFieldChange("email", event.target.value)}
        />
        <label htmlFor="role">역할</label>
        <select
          id="role"
          value={form.role}
          onChange={(event) => handleFieldChange("role", event.target.value as Role)}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <label className="row">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(event) => handleFieldChange("terms", event.target.checked)}
          />
          약관에 동의합니다
        </label>
        <button type="button" onClick={() => setForm((currentForm) => resetForm(currentForm))}>
          초기화
        </button>
        <p className="preview" role="status">
          {formatPreview(form)}
        </p>
      </section>
    </main>
  );
};
