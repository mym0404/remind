export const messages = Array.from({ length: 30 }, (_, index) => `Message ${index + 1}`);

export const App = () => (
  <main className="app-shell">
    <header className="app-header">Scrollable Panel Layout</header>
    <section className="content-panel">
      <div className="panel-header">Inbox</div>
      <div className="panel-body">
        {messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </div>
    </section>
  </main>
);
