const articles = [
  { id: "router", title: "Router 기초", body: "route param" },
  { id: "network", title: "Network 상태", body: "loading" },
];

export const App = () => (
  <main className="app"><section className="panel stack"><p className="eyebrow">Router</p><h1>React Router Detail</h1><ul>{articles.map((article) => <li key={article.id}>{article.title}</li>)}</ul></section></main>
);
