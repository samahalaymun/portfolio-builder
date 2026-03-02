import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface BuilderState {
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
  
}

export const useThemeStore = create<BuilderState>()(
  persist(
    (set) => ({
      themeMode: "system",

      setThemeMode: (theme) =>
        set({
          themeMode: theme,
        }),
    }),
    {
      name: "theme-mode", // 🔥 key في localStorage
    },
  ),
);
