import { Link, Route, Routes, useParams } from "react-router-dom";

export const articles = [
  { id: "react", title: "React Handbook", body: "상태와 렌더링을 다룹니다." },
  { id: "router", title: "Router Patterns", body: "URL과 화면을 연결합니다." },
];

export const findArticle = (_id: string | undefined) => undefined;

const ListPage = () => (
  <section className="panel stack">
    <p className="eyebrow">Router</p>
    <h1>React Router Detail</h1>
    {articles.map((article) => <Link key={article.id} to={`/articles/${article.id}`}>{article.title}</Link>)}
  </section>
);

const DetailPage = () => {
  const { id } = useParams();
  const article = findArticle(id);
  if (!article) return <p role="alert">문서를 찾을 수 없습니다.</p>;
  return <article><h2>{article.title}</h2><p>{article.body}</p></article>;
};

export const App = () => (
  <main className="app">
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/articles/:id" element={<DetailPage />} />
    </Routes>
  </main>
);
