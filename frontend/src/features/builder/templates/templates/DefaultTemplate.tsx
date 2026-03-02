import { cn, resolveTheme } from "@/lib/utils";
import Header from "../../preview/layout/Header";
import Footer from "../../preview/layout/Footer";
import { PREVIEW_SECTIONS } from "../../schema/preview.registry";
import { useThemeStore } from "../../store/builder.store";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface DefaultTemplateProps {
  content: any;
  theme: string;
  templateId?: string;

}

function DefaultTemplate({
  content,
  theme,
  templateId,
}: DefaultTemplateProps) {
  const { themeMode } = useThemeStore((s) => s);
  const profile = content;

  const order: string[] = profile?.sectionsOrder ?? [];
  const resolved = resolveTheme(themeMode); // Use theme mode if needed
  useDocumentMeta({
    title: `${profile?.personalInfo?.firstname} ${profile?.personalInfo?.lastname} - Portfolio`,
    description:
      profile.personalInfo.summary ||
      `${profile?.personalInfo?.firstname} ${profile?.personalInfo?.lastname}'s professional portfolio`,
    image: content?.avatar?.url,
  });

  // Resolve sections based on order
  const resolvedSections = PREVIEW_SECTIONS.filter((section) =>
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
        href: `#${section.id}`,
        label: section.label,
      };
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const headerNavItems = resolvedSections.map((section) => ({
    id: section.id,
    label: section.label,
    href: section.href,
  }));

  return (
    <div
      data-theme={theme || "default"}
      className={cn(
        "h-full bg-background text-foreground ",
        resolved,
      )}
    >
      <Header
        navItems={headerNavItems}
        themeId={theme}
        title={profile?.personalInfo?.firstname}
        variant={templateId}
      />

      <main className="flex bg-background  flex-col items-center w-full pb-16">
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

      <Footer
        role={profile?.personalInfo?.role}
        firstname={profile?.personalInfo?.firstname}
        lastname={profile?.personalInfo?.lastname}
        socials={profile?.contact?.socials}
        navLinks={headerNavItems.slice(0, 4)}
        variant={templateId}
      />
    </div>
  );
}

export default DefaultTemplate;
