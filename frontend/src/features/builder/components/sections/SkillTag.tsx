import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  onRemove: () => void;
};
function SkillTag({ label, onRemove }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full",
        "bg-muted px-3 py-1 text-sm font-medium",
        "border border-border",
      )}
    >
      {label}
      <Button
        type="button"
        variant="ghost"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export default SkillTag;
