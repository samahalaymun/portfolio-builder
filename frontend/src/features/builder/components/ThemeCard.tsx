import type { theme } from "@/types";
import { Button } from "../../../components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
type themeCardProp = {
  theme: theme;
  setTheme: (theme: string) => void;
  active?: boolean;
  isLoading?: boolean;
  disabled?:boolean;
};
function ThemeCard({
  theme,
  setTheme,
  active,
  isLoading,
  disabled,
}: themeCardProp) {
  const { theme: themeMode } = useTheme();

  return (
    <div
      data-theme={theme.id}
      className={cn(
        "rounded-xl border bg-background p-6 transition hover:scale-[1.02]",
        themeMode,
        active && "border-2 border-primary",
      )}
    >
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">{theme.label}</h3>
        <p className="text-muted-foreground min-h-10">
          This is a preview of the {theme.label} theme.
        </p>

        <div className="flex gap-2 w-full">
          <div className="w-8 h-8 rounded-lg border-2 border-muted bg-primary" />
          <div className="w-8 h-8 rounded-lg border border-muted bg-accent" />
          <div className="w-8 h-8 rounded-lg border border-muted bg-secondary" />
          <div className="w-8 h-8 rounded-lg border border-muted bg-border" />
        </div>

        <Button
          disabled={disabled}
          className="mt-4 w-full flex gap-2"
          onClick={() => setTheme(theme.id)}
        >
          {isLoading && <Spinner />}
          Use this theme
        </Button>
      </div>
    </div>
  );
}

export default ThemeCard;
