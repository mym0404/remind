import { FormEvent, useState } from "react";

export const App = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("대기 중");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`${title || "제목 없음"} 저장됨`);
  };

  return (
    <main className="app"><section className="panel stack">
      <p className="eyebrow">Form</p><h1>Submit Reset Flow</h1>
      <form className="stack" aria-label="할 일 저장" onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>
        <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        <div className="row"><button type="submit">저장</button><button type="button">초기화</button></div>
      </form>
      <p role="status">{message}</p>
    </section></main>
  );
};
