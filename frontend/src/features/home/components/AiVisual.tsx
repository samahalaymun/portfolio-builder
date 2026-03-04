function AiVisual() {
  return (
    <div className="w-full rounded-xl border border-border bg-background/60 p-3 space-y-2">
      {/* user message */}
      <div className="flex justify-end ">
        <div className="bg-primary/15 border border-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]">
          <p className="text-[10px] text-primary/80">
            Write my bio based on my resume
          </p>
        </div>
      </div>
      {/* AI response */}
      <div className="flex gap-2 items-start">
        <div className="w-5 h-5 rounded-full bg-linear-to-br from-primary to-secondary shrink-0 mt-0.5" />
        <div className="bg-muted/60 border border-border rounded-xl rounded-tl-sm px-3 py-2 flex-1">
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-foreground/15" />
            <div className="h-1.5 w-5/6 rounded-full bg-foreground/12" />
            <div className="h-1.5 w-4/6 rounded-full bg-foreground/10" />
          </div>
          {/* typing cursor */}
          <span className="inline-block w-0.5 h-3 bg-primary mt-1 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}
export default AiVisual;