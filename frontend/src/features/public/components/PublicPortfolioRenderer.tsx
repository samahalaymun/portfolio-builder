import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useThemeStore } from "@/features/builder/store/builder.store";
import { cn, resolveTheme } from "@/lib/utils";

//Lazy load templates
const DefaultTemplate = lazy(
  () => import("@/features/builder/templates/templates/DefaultTemplate"),
);

interface PublicPortfolioRendererProps {
  content: any;
  theme: string;
  templateId: string;
}

/**
 * PublicPortfolioRenderer - For public pages ONLY
 * Simple component that just renders a template with provided data
 * NO authentication, NO API calls, NO query params
 */
function PublicPortfolioRenderer({
  content,
  theme,
  templateId,
}: PublicPortfolioRendererProps) {
  // Get template component
    const { themeMode } = useThemeStore((s) => s);
    const resolved = resolveTheme(themeMode);
  
  return (
    <Suspense
      fallback={
        <div
          data-theme={theme || "default"}
          className={cn(
            "flex items-center bg-background justify-center h-screen",
            resolved,
          )}
        >
          <Spinner className="size-8 text-primary" />
        </div>
      }
    >
      <DefaultTemplate
        content={content}
        theme={theme}
        templateId={templateId}
      />
    </Suspense>
  );
}

export default PublicPortfolioRenderer;
