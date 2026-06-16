import { useEffect, useState } from "react";

export const loadReport = async (shouldFail = true) => {
  if (shouldFail) throw new Error("보고서를 불러오지 못했습니다.");
  return { title: "주간 리포트" };
};

export const App = () => {
  const [status, setStatus] = useState("idle");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setStatus("loading");
    loadReport()
      .then((report) => {
        setTitle(report.title);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Async</p>
        <h1>Retryable Fetch</h1>
        <p role="status">{status === "loading" ? "불러오는 중" : status === "error" ? "불러오기 실패" : ""}</p>
        {title ? <p>{title}</p> : null}
        {status === "error" ? <button type="button">다시 시도</button> : null}
      </section>
    </main>
  );
};
