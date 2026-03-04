import { cn, formatLastUpdated } from "@/lib/utils";
import { CheckCircle2, Cloud, CloudOff, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  isDirty: boolean;

  lastSaved?: Date;
  className?: string;
}

export function AutoSaveIndicator({
  isSaving,
  isDirty,
  lastSaved,
  className,
}: AutoSaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  // Show "Saved" message briefly after saving
  useEffect(() => {
    if (!isSaving && !isDirty && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, isDirty, lastSaved]);

  if (isSaving) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm text-muted-foreground",
          className,
        )}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Saving...</span>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm text-green-600 dark:text-green-400",
          className,
        )}
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Saved at {formatLastUpdated(lastSaved ?? new Date())}</span>
      </div>
    );
  }
    if (isDirty) {
      return (
        <div
          className={cn(
            "flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400",
            className,
          )}
        >
          <CloudOff className="w-4 h-4" />
          <span>Unsaved changes</span>
        </div>
      );
    }

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        className,
      )}
    >
      <Cloud className="w-4 h-4" />
      <span>All changes saved</span>
    </div>
  );
}
