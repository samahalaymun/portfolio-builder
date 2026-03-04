import type { Template } from "../../types";
import { TemplateCard } from "./TemplateCard";

interface TemplateGalleryProps {
  templates: Template[];
  currentTemplateId: string;
  onPreview: (template: Template) => void;
  onSelect: (templateId: string) => void;
  updatedTemplate?: string;
}

export function TemplateGallery({
  templates,
  currentTemplateId,
  onPreview,
  onSelect,
  updatedTemplate,
}: TemplateGalleryProps) {
  // Separate free and premium templates
  const freeTemplates = templates.filter((t) => !t.isPremium);
  const premiumTemplates = templates.filter((t) => t.isPremium);

  return (
    <div className="space-y-12">
      {/* Free Templates */}
      {freeTemplates.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Free Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={template.id === currentTemplateId}
                onPreview={() => onPreview(template)}
                onSelect={() => onSelect(template.id)}
                isSelecting={updatedTemplate === template.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Premium Templates */}
      {premiumTemplates.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Premium Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={template.id === currentTemplateId}
                onPreview={() => onPreview(template)}
                onSelect={() => onSelect(template.id)}
                isSelecting={updatedTemplate === template.id}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
