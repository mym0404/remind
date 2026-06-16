import { createContext, useContext, useMemo, useState } from "react";

export type ThemeContextValue = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme(theme === "light" ? "dark" : "light") }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const ThemePanel = () => {
  const theme = useTheme();
  return (
    <section className="panel stack">
      <p className="eyebrow">State</p>
      <h1>Context Provider Guard</h1>
      <p role="status">{theme?.theme}</p>
      <button type="button" onClick={theme?.toggleTheme}>테마 변경</button>
    </section>
  );
};

export const App = () => (
  <main className="app">
    <ThemeProvider>
      <ThemePanel />
    </ThemeProvider>
  </main>
);
