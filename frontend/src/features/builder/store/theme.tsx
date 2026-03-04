import { createContext, useContext, useEffect, useState } from "react";

type Theme = {
  id: string;
  label: string;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  THEMES: Theme[];
};

const THEMES: Theme[] = [
  { id: "claymorphism", label: "Claymorphism" },
  { id: "amethyst", label: "Amethyst Haze" },
  { id: "bold-tech", label: "Bold Tech" },
  { id: "bubblegum", label: "Bubblegum" },
];

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ?? "default",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES }}> {children}</ThemeContext.Provider>
     
  
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
