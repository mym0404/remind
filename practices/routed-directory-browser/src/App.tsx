import { useMemo, useState } from "react";

export type FileRecord = {
  path: string;
  contents: string;
};

export type TreeNode = {
  name: string;
  path: string;
  type: "folder" | "file";
  children?: TreeNode[];
};

const files: FileRecord[] = [
  { path: "app/src/App.tsx", contents: "export const App = () => null" },
  { path: "app/src/WidgetList/WidgetList.tsx", contents: "export const WidgetList = () => null" },
  { path: "app/data/featuredWidgets.js", contents: "export default []" },
  { path: "README.md", contents: "# Widgets R Us" },
];

export const buildFileTree = (records: FileRecord[]): TreeNode[] =>
  records.map((record) => ({
    name: record.path,
    path: record.path,
    type: "file",
  }));

export const App = () => {
  const [activePath, setActivePath] = useState(files[0]?.path);
  const tree = useMemo(() => buildFileTree(files), []);
  const activeFile = files.find((file) => file.path === activePath) ?? files[0];

  return (
    <main className="workspace">
      <aside className="file-pane" aria-label="파일 탐색기">
        <h1>Files</h1>
        <ul>
          {tree.map((node) => (
            <li key={node.path}>
              <button type="button" onClick={() => setActivePath(node.path)}>
                {node.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="editor" aria-label="파일 내용">
        <p className="path">{activeFile?.path}</p>
        <pre>{activeFile?.contents}</pre>
      </section>
    </main>
  );
};
