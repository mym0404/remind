import { useMemo, useState, type ReactNode } from "react";
import { sections, type DocSection } from "./content/sections";

const matchesQuery = (section: DocSection, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    section.title,
    section.raw,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
};

const renderInline = (text: string) => {
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^)]+)\)|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a href={match[3]} key={`${match.index}-link`} rel="noreferrer" target="_blank">
          {match[2]}
        </a>,
      );
    } else {
      nodes.push(<code key={`${match.index}-code`}>{match[4]}</code>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

function App() {
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(
    () => sections.filter((section) => matchesQuery(section, query)),
    [query],
  );

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="문서 목차">
        <a className="brand" href="#top">
          React 문법 실전 압축
        </a>
        <label className="search-label" htmlFor="section-search">
          검색
        </label>
        <input
          id="section-search"
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="hook, form, aria"
          type="search"
        />
        <nav className="toc" aria-label="섹션 목록">
          {sections.map((section) => (
            <a key={section.title} href={`#${section.slug}`}>
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      <main className="content" id="top">
        <header className="page-header">
          <h1>React 문법 실전 압축</h1>
        </header>

        <div className="result-count" aria-live="polite">
          {filteredSections.length}개 섹션
        </div>

        <div className="section-list">
          {filteredSections.map((section) => (
            <article className="doc-section" id={section.slug} key={section.title}>
              <h2>{section.title}</h2>
              {section.blocks.map((block, index) => {
                const key = `${section.slug}-${index}`;

                if (block.type === "heading") {
                  const Heading = `h${block.level}` as "h2" | "h3" | "h4";
                  return <Heading key={key}>{block.text}</Heading>;
                }

                if (block.type === "list") {
                  return (
                    <ul key={key}>
                      {block.items.map((item) => (
                        <li key={item}>{renderInline(item)}</li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "code") {
                  return (
                    <pre key={key}>
                      <code>{block.code}</code>
                    </pre>
                  );
                }

                return <p key={key}>{renderInline(block.text)}</p>;
              })}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
