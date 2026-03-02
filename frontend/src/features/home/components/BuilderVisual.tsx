
function BuilderVisual() {
 return (
   <div className="w-full rounded-xl border border-border bg-background/60 overflow-hidden shadow-lg">
     {/* toolbar */}
     <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/40">
       <span className="w-2 h-2 rounded-full bg-red-400/70" />
       <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
       <span className="w-2 h-2 rounded-full bg-green-400/70" />
       <div className="ml-2 h-2.5 flex-1 rounded-full bg-border" />
     </div>
     <div className="flex gap-2 p-3">
       {/* sidebar */}
       <div className="w-16 shrink-0 space-y-1.5">
         {[70, 50, 85, 60].map((w, i) => (
           <div
             key={i}
             className="h-2 rounded-full bg-primary/20"
             style={{ width: `${w}%` }}
           />
         ))}
       </div>
       {/* canvas */}
       <div className="flex-1 rounded-lg border border-border bg-muted/30 p-2 space-y-2">
         <div className="h-10 rounded-md bg-primary/15 border border-primary/20 flex items-center px-2 gap-1.5">
           <div className="w-2 h-2 rounded-full bg-primary/50" />
           <div className="h-1.5 w-16 rounded-full bg-primary/30" />
         </div>
         <div className="grid grid-cols-2 gap-1.5">
           <div className="h-8 rounded-md bg-secondary/40 border border-border" />
           <div className="h-8 rounded-md bg-muted border border-border" />
         </div>
         <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
         <div className="h-2 w-1/2 rounded-full bg-foreground/7" />
       </div>
     </div>
   </div>
 );
}

export default BuilderVisual
