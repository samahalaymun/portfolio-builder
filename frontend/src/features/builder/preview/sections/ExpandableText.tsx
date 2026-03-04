import { useState } from "react";
import { cn } from "@/lib/utils";

function ExpandableText({ text }: { text?: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  return (
    <div className="text-sm text-muted-foreground">
      <p
        className={cn(
          "leading-relaxed transition-all",
          !expanded && "line-clamp-3",
        )}
      >
        {text}
      </p>

      {text.length > 150 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs text-primary hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default ExpandableText
