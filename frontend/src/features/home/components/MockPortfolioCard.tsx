
function MockPortfolioCard() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] animate-[float_6s_ease-in-out_infinite]">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-2.5 border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <div className="ml-2 flex-1 h-4 rounded bg-border/60" />
      </div>

      {/* Card body */}
      <div className="p-5 space-y-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3 w-28 rounded bg-foreground/15" />
            <div className="h-2.5 w-20 rounded bg-foreground/7" />
          </div>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1.5">
          {["React", "Design", "Node.js"].map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold
                         border border-primary/30 bg-primary/8 text-primary"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded-xl bg-linear-to-b from-primary/10 to-secondary/10 border border-border relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded bg-foreground/8" />
          </div>
          <div className="h-16 rounded-xl bg-linear-to-br from-secondary/10 to-primary/5 border border-border relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded bg-foreground/8" />
          </div>
          <div className="h-16 rounded-xl bg-linear-to-br from-primary/8 to-secondary/12 border border-border relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded bg-foreground/8" />
          </div>
          <div className="h-16 rounded-xl bg-linear-to-br from-secondary/8 to-primary/8 border border-border relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded bg-foreground/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockPortfolioCard
