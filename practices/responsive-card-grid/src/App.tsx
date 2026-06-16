export const cards = ["Dashboard", "Reports", "Alerts", "Settings"];

export const App = () => (
  <main className="app">
    <section className="panel stack">
      <p className="eyebrow">CSS</p>
      <h1>Responsive Card Grid</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <article className="card" key={card}>
            {card}
          </article>
        ))}
      </div>
    </section>
  </main>
);
