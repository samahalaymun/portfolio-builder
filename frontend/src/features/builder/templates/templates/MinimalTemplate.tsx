import { cn, resolveTheme } from "@/lib/utils";
import { PREVIEW_SECTIONS } from "../../schema/preview.registry";
import { useThemeStore } from "../../store/builder.store";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface MinimalTemplateProps {
  content: any;
  theme: string;
  templateId?: string;
}

/**
 * Minimal Template
 * Clean, centered, narrow layout without header/footer
 * Perfect for writers, consultants, and professionals who prefer simplicity
 */
function MinimalTemplate({
  content,
  theme,
  templateId = "minimal",
}: MinimalTemplateProps) {
  const { themeMode } = useThemeStore((s) => s);
  const profile = content;
  const order: string[] = profile?.sectionsOrder ?? [];
  const resolved = resolveTheme(themeMode);
  useDocumentMeta({
    title: `${profile?.personalInfo?.firstname} ${profile?.personalInfo?.lastname} - Portfolio`,
    description:
      profile.personalInfo.summary ||
      `${profile?.personalInfo?.firstname} ${profile?.personalInfo?.lastname}'s professional portfolio`,
    image: content?.avatar?.url,
  });
  // Filter sections based on both sectionsToShow AND order
  const resolvedSections = PREVIEW_SECTIONS.filter(
    (section) =>
      section.blocks.some((blockId) => order.includes(blockId)),
  )
    .map((section) => {
      const orderIndex = Math.min(
        ...section.blocks
          .map((blockId) => order.indexOf(blockId))
          .filter((i) => i !== -1),
      );
      return {
        ...section,
        orderIndex,
      };
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div
      data-theme={theme || "default"}
      className={cn("min-h-screen bg-background text-foreground", resolved)}
    >
      {/* No Header for minimal template */}

      {/* Centered, narrow main content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        {resolvedSections.map((section) => {
          const Section = section.component;
          if (!Section) return null;
          return (
            <Section
              variant={templateId}
              id={section.id}
              key={section.id}
              themeId={theme}
              profile={profile}
              order={order}
            />
          );
        })}
      </main>

      {/* No Footer for minimal template */}
    </div>
  );
}

export default MinimalTemplate;
