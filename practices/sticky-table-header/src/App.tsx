const rows = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, name: `사용자 ${index + 1}`, role: "member" }));

export const App = () => <main className="app"><section className="panel stack"><p className="eyebrow">CSS</p><h1>Sticky Table Header</h1><div className="table-shell"><table><thead><tr><th>이름</th><th>역할</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td>{row.name}</td><td>{row.role}</td></tr>)}</tbody></table></div></section></main>;
