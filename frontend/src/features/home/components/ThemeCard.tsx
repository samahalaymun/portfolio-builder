import { cn } from "@/lib/utils";

function ColorDot({ className }: { className: string }) {
  return <div className={cn("h-4 w-4 rounded-full border", className)} />;
}

function ThemeCard({
  theme,
  themeMode,
}: {
  theme: { id: string; label: string };
  themeMode?:string;
}) {
  return (
    <div
      data-theme={theme.id}
      className={cn(
        themeMode,
        "group relative overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      )}
    >
      {/* Header */}
      <div className="h-20 px-4 flex items-center bg-primary text-primary-foreground">
        <div className="text-sm font-semibold">Portfolio</div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Content preview */}
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="h-3 w-24 rounded bg-muted-foreground/30" />
          <div className="h-2 w-full rounded bg-muted-foreground/20" />
          <div className="h-2 w-5/6 rounded bg-muted-foreground/20" />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <div className="h-8 flex-1 rounded-md bg-primary" />
          <div className="h-8 flex-1 rounded-md bg-secondary" />
        </div>

        {/* Color palette */}
        <div className="flex gap-2">
          <ColorDot className="bg-primary" />
          <ColorDot className="bg-secondary" />
          <ColorDot className="bg-accent" />
          <ColorDot className="bg-muted" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <p className="font-medium">{theme.label}</p>
      </div>
    </div>
  );
}

export default ThemeCard
