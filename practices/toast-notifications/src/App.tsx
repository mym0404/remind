import { useState } from "react";

export type Toast = { id: number; message: string };

export const addToast = (toasts: Toast[], message: string): Toast[] => [
  ...toasts,
  { id: toasts.length + 1, message },
];
export const removeToast = (toasts: Toast[], id: number): Toast[] =>
  toasts.filter((toast) => toast.id !== id);

export const App = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Overlay</p>
        <h1>Toast Notifications</h1>
        <button type="button" onClick={() => setToasts(addToast(toasts, "저장했습니다."))}>
          토스트 추가
        </button>
        <div role="status">
          {toasts.map((toast) => (
            <div key={toast.id}>
              <span>{toast.message}</span>
              <button type="button" onClick={() => setToasts(removeToast(toasts, toast.id))}>
                닫기
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
