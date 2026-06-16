import { useState } from "react";

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Overlay</p>
        <h1>Modal Dialog</h1>
        <button type="button" onClick={() => setOpen(true)}>모달 열기</button>
        {open ? (
          <div className="modal-backdrop" data-testid="modal-backdrop">
            <section role="dialog" aria-label="초대 확인">
              <p>초대장을 보낼까요?</p>
              <button type="button" onClick={() => setOpen(false)}>닫기</button>
            </section>
          </div>
        ) : null}
      </section>
    </main>
  );
};
