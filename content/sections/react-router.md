# React Router

## 언제 쓰나

- URL에 따라 다른 화면을 보여줘야 할 때 쓴다.
- 목록 화면과 상세 화면을 `/projects`와 `/projects/:projectId`처럼 나눌 때 쓴다.
- 상세 화면에서 route param으로 데이터를 찾아야 할 때 쓴다.
- 공통 레이아웃 안에 하위 화면을 바꿔 끼워야 할 때 nested route를 쓴다.
- 없는 주소를 404 화면으로 보내야 할 때 fallback route를 둔다.

## 바로 쓰는 코드

`Routes` 안에서 list route와 detail route를 나눈다. detail route의 `:projectId`는 `useParams`로 읽고, 버튼 이동은 `useNavigate`로 처리한다.

```tsx
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router";

type Project = {
  id: string;
  owner: string;
  title: string;
};

const projects: Project[] = [
  { id: "router", owner: "Mina", title: "라우팅 구조 정리" },
  { id: "search", owner: "Joon", title: "검색 URL 연동" },
];

const findProject = (projectId: string | undefined) =>
  projects.find((project) => project.id === projectId);

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/projects" element={<ProjectsLayout />}>
        <Route index element={<ProjectList />} />
        <Route path=":projectId" element={<ProjectDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const ProjectsLayout = () => (
  <main>
    <h1>프로젝트</h1>
    <Outlet />
  </main>
);

const ProjectList = () => {
  const navigate = useNavigate();

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <strong>{project.title}</strong>
          <span>{project.owner}</span>
          <button
            type="button"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            상세 보기
          </button>
        </li>
      ))}
    </ul>
  );
};

const ProjectDetail = () => {
  const { projectId } = useParams<"projectId">();
  const navigate = useNavigate();
  const project = findProject(projectId);

  if (!project) {
    return <NotFound />;
  }

  return (
    <article>
      <h2>{project.title}</h2>
      <p>담당자: {project.owner}</p>
      <button type="button" onClick={() => navigate("/projects")}>
        목록으로
      </button>
    </article>
  );
};

const NotFound = () => (
  <section>
    <h1>페이지를 찾을 수 없습니다.</h1>
    <p>주소를 확인하고 다시 이동하세요.</p>
  </section>
);
```

## 실수 포인트

- `:projectId`처럼 선언한 이름과 `useParams`에서 읽는 이름을 다르게 쓰지 않는다.
- route param은 없을 수 있으므로 상세 데이터를 찾기 전에 `undefined`를 처리한다.
- param 값만 믿고 바로 렌더링하지 말고 실제 데이터가 있는지 확인한다.
- nested route의 부모 element에는 자식 화면이 들어갈 위치에 `Outlet`을 둔다.
- `path="*"` fallback route는 더 구체적인 route보다 뒤에 둔다.
- 단순 링크는 `Link`를 쓰고, 저장 후 이동이나 뒤로 가기 같은 명령형 이동에만 `useNavigate`를 쓴다.
- route param은 문자열이므로 숫자 id가 필요하면 변환과 실패 처리를 같이 둔다.

## 참고

- [React Router Routing](https://reactrouter.com/start/declarative/routing)
