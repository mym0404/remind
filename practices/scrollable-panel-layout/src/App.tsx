const messages = Array.from({ length: 30 }, (_, index) => `메시지 ${index + 1}`);

export const App = () => <main className="app"><section className="workspace"><header className="workspace-header"><h1>Scrollable Panel Layout</h1></header><div className="workspace-body"><aside>필터</aside><section className="message-list">{messages.map((message) => <p key={message}>{message}</p>)}</section></div></section></main>;
