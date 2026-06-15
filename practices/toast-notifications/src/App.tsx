import { useState } from "react";

type Toast = { id: string; message: string };

export const App = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = () => setToasts([{ id: "saved", message: "저장했습니다." }]);
  return <main className="app"><section className="panel stack"><p className="eyebrow">Overlay</p><h1>Toast Notifications</h1><button type="button" onClick={showToast}>토스트 표시</button><div>{toasts.map((toast) => <p key={toast.id}>{toast.message}</p>)}</div></section></main>;
};
