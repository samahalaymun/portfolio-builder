import { useEffect } from "react";
import { resolveTheme } from "@/lib/utils";

export function usePreviewHtmlTheme(mode: "light" | "dark" | "system") {
  useEffect(() => {
    const html = document.documentElement;
    const resolved = resolveTheme(mode);

    html.classList.remove("light", "dark");
    html.classList.add(resolved ?? "");
    return () => {
      html.classList.remove("light", "dark");
    };
  }, [mode]);
}
