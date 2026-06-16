import { FormEvent, useRef, useState } from "react";

export type FormValues = {
  name: string;
  email: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const validateForm = (_values: FormValues): FormErrors => ({});

export const App = () => {
  const [values, setValues] = useState<FormValues>({ name: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
  };

  return (
    <main className="app">
      <form className="panel stack" onSubmit={submit} noValidate>
        <p className="eyebrow">Form</p>
        <h1>Form Validation Errors</h1>
        <label htmlFor="name">이름</label>
        <input id="name" ref={nameRef} value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} />
        {errors.name ? <p id="name-error">{errors.name}</p> : null}
        <label htmlFor="email">이메일</label>
        <input id="email" ref={emailRef} value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
        {errors.email ? <p id="email-error">{errors.email}</p> : null}
        <button type="submit">제출</button>
      </form>
    </main>
  );
};
