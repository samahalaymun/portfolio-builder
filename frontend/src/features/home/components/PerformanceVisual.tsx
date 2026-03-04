
function PerformanceVisual() {
  const bars = [40, 65, 55, 80, 70, 95, 88];
  return (
    <div className="w-full rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-end justify-between gap-1.5 h-16">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-primary/20 relative overflow-hidden"
            style={{ height: `${h}%` }}
          >
            <div
              className="absolute inset-x-0 bottom-0 bg-primary rounded-t-sm transition-all"
              style={{
                height: `${i === 6 ? 100 : 40}%`,
                opacity: i === 6 ? 1 : 0.5,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          Performance
        </span>
        <span className="text-xs font-bold text-primary">98 / 100</span>
      </div>
    </div>
  );
}

export default PerformanceVisual
