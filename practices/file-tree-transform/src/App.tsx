export type FileNode = {
  type: "file" | "folder";
  name: string;
  children?: FileNode[];
};

export const buildFileTree = (_paths: string[]): FileNode[] => [];

export const App = () => {
  const tree = buildFileTree(["src/App.tsx", "src/components/Button.tsx", "README.md"]);

  return (
    <main className="app">
      <section className="panel stack">
        <p className="eyebrow">Tree</p>
        <h1>File Tree Transform</h1>
        <pre>{JSON.stringify(tree, null, 2)}</pre>
      </section>
    </main>
  );
};
