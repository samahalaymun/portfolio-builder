import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Template } from "../../types";


interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onPreview: () => void;
  onSelect: () => void;
  isSelecting?: boolean;
}

export function TemplateCard({
  template,
  isSelected,
  onPreview,
  onSelect,
  isSelecting = false,
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        "group relative border rounded-lg overflow-hidden transition-all hover:shadow-lg",
        isSelected && "ring-2 ring-primary",
      )}
    >
      {/* Preview Image */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={template.previewUrl}
          alt={template.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
             const target = e.currentTarget;
             target.onerror = null;
            // Fallback if image fails to load
            e.currentTarget.src =
              "";
          }}
        />

        {/* Premium badge */}
        {template.isPremium && (
          <Badge className="absolute top-2 right-2 bg-amber-500">
            <Crown className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        )}

        {/* Selected badge */}
        {isSelected && (
          <Badge className="absolute top-2 left-2 bg-primary">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )}

        {/* Hover overlay with preview button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={onPreview}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Action Button */}
        <Button
          onClick={onSelect}
          disabled={isSelected || isSelecting}
          variant={isSelected ? "outline" : "default"}
          className="w-full"
        >
          {isSelecting ? (
            "Applying..."
          ) : isSelected ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Current Template
            </>
          ) : (
            "Use Template"
          )}
        </Button>
      </div>
    </div>
  );
}
