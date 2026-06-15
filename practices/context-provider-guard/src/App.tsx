import { createContext, useContext, useState } from "react";

type ThemeContextValue = { theme: string; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue>({ theme: "light", toggleTheme: () => undefined });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((current) => (current === "light" ? "dark" : "light"));
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  return <main className="app"><section className="panel stack"><p className="eyebrow">Hooks</p><h1>Context Provider Guard</h1><p role="status">{theme}</p><button type="button" onClick={toggleTheme}>테마 변경</button></section></main>;
};
