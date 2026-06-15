import { useState } from "react";

export const App = () => {
  const [open, setOpen] = useState(false);
  return <main className="app"><section className="panel stack"><p className="eyebrow">Overlay</p><h1>Modal Dialog</h1><button type="button" onClick={() => setOpen(true)}>설정 열기</button>{open ? <div className="backdrop"><section className="modal"><h2>설정</h2><button type="button" onClick={() => setOpen(false)}>닫기</button></section></div> : null}</section></main>;
};
