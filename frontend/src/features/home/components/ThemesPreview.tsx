import { Animated } from "@/components/ui/animated";
import { THEMES } from "@/data/constants";
import { useTheme } from "next-themes";
import ThemeCard from "./ThemeCard";



function ThemesPreview() {
      const { theme: themeMode } = useTheme();

  return (
    <section id="themes" className="relative mt-40 space-y-16">
      <div className="text-center space-y-4">
        <Animated delay={0} variant="flip">
          <h2 className="font-semibold">Beautiful themes out of the box</h2>
        </Animated>
        <Animated delay={0} variant="flip">
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professionally crafted themes designed for developers, designers,
            and creators.
          </p>
        </Animated>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {THEMES.slice(0,6).map((theme, i) => (
          <Animated key={theme.id} delay={i * 80} variant="flip">
            <ThemeCard themeMode={themeMode} theme={theme} />
          </Animated>
        ))}
      </div>
    </section>
  );
}

export default ThemesPreview;
