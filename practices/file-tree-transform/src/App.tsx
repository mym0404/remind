type FileEntry = { path: string; contents: string };
type TreeNode = { name: string; path: string; type: "file" | "folder"; children?: TreeNode[] };

export const files: FileEntry[] = [
  { path: "app/src/App.tsx", contents: "export const App = () => null;" },
  { path: "app/README.md", contents: "문서" },
];

export const buildFileTree = (entries: FileEntry[]): TreeNode[] => entries.map((entry) => ({ name: entry.path, path: entry.path, type: "file" }));

export const App = () => <main className="app"><section className="panel stack"><p className="eyebrow">Router</p><h1>File Tree Transform</h1><ul>{buildFileTree(files).map((node) => <li key={node.path}>{node.name}</li>)}</ul></section></main>;
