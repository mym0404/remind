import { useState } from "react";

type Toast = {
  id: string;
  message: string;
};

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = () => {
    setToasts([...toasts, { id: crypto.randomUUID(), message: "저장했습니다." }]);
  };

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 06</p>
        <h1>Overlay Workbench</h1>
        <div className="actions">
          <button type="button" onClick={() => setIsModalOpen(true)}>
            설정 열기
          </button>
          <button type="button" onClick={showToast}>
            토스트 표시
          </button>
        </div>
      </section>

      {isModalOpen ? (
        <div className="backdrop">
          <section className="modal">
            <h2>설정</h2>
            <p>닫기 동작과 focus 처리를 완성하세요.</p>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </section>
        </div>
      ) : null}

      <div className="toast-region">
        {toasts.map((toast) => (
          <div key={toast.id}>{toast.message}</div>
        ))}
      </div>
    </main>
  );
};
