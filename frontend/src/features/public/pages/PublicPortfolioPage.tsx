import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import PublicPortfolioRenderer from "../components/PublicPortfolioRenderer";
import PublicPortfolioLayout from "../layout/PublicPortfolioLayout";

function PublicPortfolioPage() {
  const { username } = useParams<{ username: string }>();  
  const {
    data: portfolio,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-portfolio", username],
    queryFn: async () => {
      const res = await api.get(`/portfolios/u/${username}`);
      return res.data;
    },
    retry: false,
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return null
  }
  if (error || !portfolio) {
    return (
      <div
        className="flex items-center justify-center min-h-screen p-4"
      >
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Portfolio not found. This portfolio may be private or doesn't
              exist.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
const { content, templateId, theme } = portfolio;
  return (
    <PublicPortfolioLayout theme={theme}>
      {/* Render Portfolio */}
      <PublicPortfolioRenderer
        content={content}
        theme={theme}
        templateId={templateId}
      />
    </PublicPortfolioLayout>
  );
}

export default PublicPortfolioPage;
