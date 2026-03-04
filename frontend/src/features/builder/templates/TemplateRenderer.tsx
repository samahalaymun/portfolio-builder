import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { api } from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
import { lazy, Suspense } from "react";
const DefaultTemplate = lazy(() => import("./templates/DefaultTemplate"));

function TemplateRenderer() {
  const [searchParams] = useSearchParams();
  // Fetch portfolio data
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: async () => {
      const res = await api.get("/portfolios/me");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        <p>Portfolio not found</p>
      </div>
    );
  }

  // Get template from URL param OR portfolio data
  const templateIdFromUrl = searchParams.get("template");
  const templateId = templateIdFromUrl || portfolio.templateId || "default";
  // Load the correct template component
  return (
    <Suspense
      fallback={
        <div
          data-theme={portfolio.theme || "default"}
          className="flex items-center bg-background justify-center h-screen"
        >
          <Spinner className="size-8 text-primary" />
        </div>
      }
    >
      <DefaultTemplate
        content={portfolio.content}
        theme={portfolio.theme}
        templateId={templateId}
      />
    </Suspense>
  );
}



export default TemplateRenderer;
