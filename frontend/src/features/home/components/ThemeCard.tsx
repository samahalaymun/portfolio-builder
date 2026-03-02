import { cn } from "@/lib/utils";

function ColorDot({ className }: { className: string }) {
  return <div className={cn("h-4 w-4 rounded-full border", className)} />;
}

function ThemeCard({
  theme,
  themeMode,
}: {
  theme: { id: string; label: string };
  themeMode?: string;

}) {
  return (
    <div
      data-theme={theme.id}
      className={cn(
        themeMode,
        "group relative overflow-hidden rounded-2xl border border-border bg-background",
        "transition-all duration-300 hover:-translate-y-2",
        "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
      )}
    >
      {/* ── Top browser bar ── */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/60 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-2 flex-1 h-3 rounded-full bg-border/80" />
      </div>

      {/* ── Hero banner ── */}
      <div className="relative h-24 px-5 flex items-center bg-primary overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex items-center gap-3">
          {/* Mini avatar */}
          <div className="w-9 h-9 rounded-full bg-primary-foreground/20 border border-primary-foreground/30 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
            {theme.label.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-primary-foreground">
              My Portfolio
            </div>
            <div className="text-[10px] text-primary-foreground/60 uppercase tracking-wider">
              Developer · Designer
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-4 space-y-3">
        {/* Content skeleton */}
        <div className="rounded-xl border border-border bg-card p-3.5 space-y-2">
          <div className="h-2.5 w-20 rounded-full bg-foreground/20" />
          <div className="h-2 w-full rounded-full bg-foreground/10" />
          <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
        </div>

        {/* Project tiles */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 rounded-lg bg-secondary/60 border border-border relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded-full bg-foreground/8" />
          </div>
          <div className="h-12 rounded-lg bg-muted border border-border relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded-full bg-foreground/8" />
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2">
          <div className="h-7 flex-1 rounded-lg bg-primary opacity-90" />
          <div className="h-7 flex-1 rounded-lg bg-secondary opacity-70" />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="font-semibold text-sm text-foreground">{theme.label}</p>
        </div>
        {/* Color palette dots */}
        <div className="flex items-center gap-1.5">
          <ColorDot className="bg-primary" />
          <ColorDot className="bg-secondary" />
          <ColorDot className="bg-accent" />
          <ColorDot className="bg-muted" />
        </div>
      </div>

      {/* ── Hover overlay CTA ── */}
      <div
        className="absolute inset-0 flex items-center justify-center
                      bg-background/80 backdrop-blur-sm opacity-0
                      group-hover:opacity-100 transition-all duration-300 rounded-2xl"
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground
                           text-sm font-semibold shadow-lg shadow-primary/30
                           translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
          >
            Preview theme →
          </span>
          <span
            className="text-xs text-muted-foreground
                           translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75"
          >
            {theme.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ThemeCard
