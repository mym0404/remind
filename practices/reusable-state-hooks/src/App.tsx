import { FormEvent, useState } from "react";

type Note = {
  id: string;
  title: string;
  pinned: boolean;
};

const initialNotes: Note[] = [
  { id: "routing", title: "Route params 복습", pinned: false },
  { id: "forms", title: "Form validation 정리", pinned: true },
];

export const App = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");

  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    setNotes([...notes, { id: crypto.randomUUID(), title, pinned: false }]);
    setTitle("");
  };

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Practice 03</p>
        <h1>Reusable Notes Workspace</h1>
        <form aria-label="노트 추가" onSubmit={addNote}>
          <label htmlFor="title">노트 제목</label>
          <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
          <button type="submit">추가</button>
        </form>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>
              <button type="button" onClick={() => setNotes(notes.filter((item) => item.id !== note.id))}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
