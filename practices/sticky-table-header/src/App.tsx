export const rows = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

export const App = () => (
  <main className="app">
    <section className="panel stack">
      <p className="eyebrow">CSS</p>
      <h1>Sticky Table Header</h1>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </main>
);
