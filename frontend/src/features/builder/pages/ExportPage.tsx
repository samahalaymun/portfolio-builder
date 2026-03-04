import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import PublishOptions from "../export/components/PublishOptions";
import Breadcrumbs from "../layout/Breadcrumb";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
import StatusCard from "../export/components/StatusCard";
import { formatLastUpdated } from "@/lib/utils";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import toast from "react-hot-toast";
const breadcrumbs = [
  { label: "Builder", to: "/builder/start" },
  { label: "Export" },
];
function ExportPage() {
  document.title = "Portify - " + "Export";
  const { data: portfolio, isFetching } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: async () => {
      const res = await api.get("/portfolios/me");
      return res.data;
    },
  });

  // Toggle publish mutation
  const { mutate: togglePublish, isPending } = useMutation({
    mutationFn: async (isPublished: boolean) => {
      const res = await api.patch("/portfolios/publish", { isPublished });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["portfolio-profile"], data);
      toast.success(
        data.isPublished
          ? "Portfolio published successfully!"
          : "Portfolio unpublished",
      );
    },
    onError: () => {
      toast.error("Failed to update publish status");
    },
  });
  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 ">
        <Heading title="Export & Publish" />
        <Animated variant="flip">
          <p className="text-muted-foreground text-lg mb-10">
            Your portfolio is ready. Preview it, export the files, or publish it
            online.
          </p>
        </Animated>
        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-3 gap-6">
            <StatusCard
              title="Portfolio status"
              value={portfolio.status}
              hint="All required sections completed"
            />
            <StatusCard
              title="Theme"
              value={portfolio.theme}
              hint="Applied to preview"
            />
            <StatusCard
              title="Last update"
              value={formatLastUpdated(portfolio.updatedAt)}
              hint="Saved automatically"
            />
          </div>
          <PublishOptions
            portfolio={portfolio}
            onTogglePublish={togglePublish}
            isLoading={isPending}
          />
        </div>
      </div>
    </>
  );
}

export default ExportPage;
