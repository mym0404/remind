import { FormEvent, useState } from "react";

export const validateProfile = (values: { name: string; email: string }) => {
  return {};
};

export const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("아직 제출하지 않았습니다.");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`${name || "이름 없음"} 저장`);
  };

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Form</p>
        <h1>Form Validation Errors</h1>
        <form className="stack" aria-label="프로필 폼" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">이름</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
          <label htmlFor="email">이메일</label>
          <input id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button type="submit">저장</button>
        </form>
        <p role="status">{message}</p>
      </section>
    </main>
  );
};
