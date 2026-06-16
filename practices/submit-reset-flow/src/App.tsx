import { FormEvent, useState } from "react";

export const submitMessage = async (message: string) => {
  if (message.trim() === "fail") throw new Error("submit failed");
  return { savedMessage: message.trim() };
};

export const App = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("작성 중");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await submitMessage(message);
    setStatus("저장 완료");
  };

  return (
    <main className="app">
      <form className="panel stack" onSubmit={submit}>
        <p className="eyebrow">Form</p>
        <h1>Submit Reset Flow</h1>
        <label htmlFor="message">메시지</label>
        <input id="message" value={message} onChange={(event) => setMessage(event.target.value)} />
        <div className="row">
          <button type="submit">저장</button>
          <button type="button">초기화</button>
        </div>
        <p role="status">{status}</p>
      </form>
    </main>
  );
};
