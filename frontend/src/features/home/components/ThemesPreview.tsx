import { Animated } from "@/components/ui/animated";
import { THEMES } from "@/data/constants";
import { useTheme } from "next-themes";
import ThemeCard from "./ThemeCard";

function ThemesPreview() {
      const { theme: themeMode } = useTheme();

  return (
    <section id="themes" className="relative space-y-14 overflow-hidden">
      {/* ── Subtle background glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 -z-10
               w-[min(600px,100%)] h-64 rounded-full bg-primary/5 blur-[100px]"
      />

      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-3 text-center">
        <Animated delay={0} variant="flip">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-primary/30
                           bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Themes
          </span>
        </Animated>

        <Animated delay={60} variant="flip">
          <h2 className="font-bold tracking-tight text-foreground">
            Beautiful{" "}
            <span className="text-primary relative inline-block">
              out of the box.
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.75 rounded-full
                               bg-linear-to-r from-primary to-transparent"
              />
            </span>
          </h2>
        </Animated>

        <Animated delay={120} variant="flip">
          <p className="text-muted-foreground max-w-md mx-auto">
            Professionally crafted themes designed for developers, designers,
            and creators. Every theme is fully customizable.
          </p>
        </Animated>
      </div>

      {/* ── Theme grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {THEMES.slice(0, 6).map((theme, i) => (
          <Animated key={theme.id} delay={i * 80} variant="flip">
            <ThemeCard themeMode={themeMode} theme={theme} />
          </Animated>
        ))}
      </div>
    </section>
  );
}

export default ThemesPreview;
