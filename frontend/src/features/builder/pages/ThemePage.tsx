import { THEMES } from "@/data/constants";
import ThemeCard from "../components/ThemeCard";
import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import Breadcrumbs from "../layout/Breadcrumb";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { UpdatePortfolioThemePayload } from "../types";
import { api } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import toast from "react-hot-toast";
import ThemePageSkeleton from "../components/Skeleton/ThemePageSkeleton";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
const breadcrumbs = [
  { label: "Builder", to: "/builder/start" },
  { label: "Theme" },
];
const ANIMATION_STAGGER = 80;

function ThemePage() {
  const navigate = useNavigate();
const [updatingThemeId, setUpdatingThemeId] = useState<string | null>(null);

  // Fetch portfolio from DB
  const {
    data: portfolio,
    isFetching,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: async () => {
      const res = await api.get("/portfolios/me");
      return res.data;
    },
  });
  const {
    mutate: updatePortfolioTheme,
    isPending: isUpdating,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationFn: async (theme: UpdatePortfolioThemePayload) => {
      const res = await api.patch("/portfolios/theme", theme);
      return res.data;
    },
    onSuccess: (data) => {
      // Update cache
      queryClient.setQueryData(["portfolio-profile"], data);

      // Show success message
      toast.success("Theme saved successfully!");

      // Navigate after brief delay for better UX
      setTimeout(() => {
        navigate("/builder/preview");
      }, 800);
    },
    onError: (error) => {
      toast.error("Failed to save theme. Please try again.");
      console.error("Theme update error:", error);
    },
  });
  useEffect(() => {
    document.title = "Portify - Themes";
  }, []);
const handleSelectTheme = (themeId: string) => {
  setUpdatingThemeId(themeId); 
  updatePortfolioTheme({ theme: themeId });
};


   if (isFetching && !portfolio) {
     return <ThemePageSkeleton />;
   }
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 ">
        <Heading title="Choose your portfolio theme" />
        {/* Error Alert */}
        {(isQueryError || isMutationError) && (
          <Animated variant="flip" delay={60}>
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {(queryError || mutationError)?.message ||
                  "An error occurred. Please try again."}
              </AlertDescription>
            </Alert>
          </Animated>
        )}
        <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3">
          {THEMES.map((t, index) => (
            <Animated delay={index * ANIMATION_STAGGER + 100} variant="flip">
              <ThemeCard
                theme={t}
                setTheme={handleSelectTheme}
                active={portfolio?.theme === t.id}
                isLoading={updatingThemeId === t.id}
                disabled={isUpdating}
              />
            </Animated>
          ))}
        </div>
        {THEMES.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No themes available at the moment.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ThemePage;
