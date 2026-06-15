import { useState } from "react";

export const fetchReport = async (shouldFail = false) => {
  if (shouldFail) throw new Error("보고서를 불러오지 못했습니다.");
  return "6월 리포트";
};

export const App = () => {
  const [message] = useState("대기 중");
  return <main className="app"><section className="panel stack"><p className="eyebrow">Async</p><h1>Retryable Fetch</h1><p role="status">{message}</p><button type="button">불러오기</button></section></main>;
};
