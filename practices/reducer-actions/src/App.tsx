import { useReducer, useState } from "react";

export type Todo = { id: string; title: string; done: boolean };
export type TodoAction =
  | { type: "add"; title: string }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string };

export const todoReducer = (todos: Todo[], _action: TodoAction): Todo[] => todos;

export const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [title, setTitle] = useState("");

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">State</p>
        <h1>Reducer Actions</h1>
        <label htmlFor="todo">할 일</label>
        <input id="todo" value={title} onChange={(event) => setTitle(event.target.value)} />
        <button type="button" onClick={() => dispatch({ type: "add", title })}>추가</button>
        <ul>{todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      </section>
    </main>
  );
};
