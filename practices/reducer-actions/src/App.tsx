import { FormEvent, useReducer, useState } from "react";

type Todo = { id: string; title: string; done: boolean };
type Action = { type: "add"; title: string };

export const todoReducer = (todos: Todo[], action: Action) => {
  if (action.type === "add") return [...todos, { id: action.title, title: action.title, done: false }];
  return todos;
};

export const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, [{ id: "learn", title: "Reducer 복습", done: false }]);
  const [title, setTitle] = useState("");
  const addTodo = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (title) dispatch({ type: "add", title }); };
  return <main className="app"><section className="panel stack"><p className="eyebrow">Hooks</p><h1>Reducer Actions</h1><form onSubmit={addTodo}><label htmlFor="title">할 일</label><input id="title" value={title} onChange={(event) => setTitle(event.target.value)} /><button type="submit">추가</button></form><ul>{todos.map((todo) => <li key={todo.id}>{todo.title}<button type="button">완료</button><button type="button">삭제</button></li>)}</ul></section></main>;
};
