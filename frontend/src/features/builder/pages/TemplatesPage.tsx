// src/features/builder/pages/TemplatesPage.tsx
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Template } from "../types";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import { TemplateGallery } from "../templates/components/TemplateGallery";
import Heading from "../components/Heading";
import Breadcrumbs from "../layout/Breadcrumb";
const breadcrumbs = [
  { label: "Builder", to: "/builder/start" },
  { label: "Templates" },
];
function TemplatesPage() {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [updatingTemplateId, setUpdatingTemplateId] = useState<string | null>(
    null,
  );

  // Fetch templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await api.get("/templates");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Fetch current portfolio
  const { data: portfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: async () => {
      const res = await api.get("/portfolios/me");
      return res.data;
    },
  });

  // Update template mutation
  const { mutate: updateTemplate, isPending: isUpdating } = useMutation({
    mutationFn: async (templateId: string) => {
      const res = await api.patch("/portfolios/template", { templateId });
      return res.data;
    },
    onSuccess: () => {
      toast.success("✨ Template updated!");
      // Refresh portfolio data
      queryClient.invalidateQueries({ queryKey: ["portfolio-profile"] });
    },
    onError: () => {
      toast.error("Failed to update template");
    },
    onSettled: () => {
      setUpdatingTemplateId(null); 
    },
  });
  useEffect(() => {
    document.title = "Portify - Templates";
  }, []);
  const isLoading = templatesLoading || portfolioLoading;

  const handleSelectTemplate = (templateId: string) => {
    setUpdatingTemplateId(templateId);
    updateTemplate(templateId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="p-8">
        <Alert>
          <AlertDescription>
            No templates available. Please contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 ">
        <Heading title="Choose Your Template" />
        {/* Templates Gallery */}
        <TemplateGallery
          templates={templates}
          currentTemplateId={portfolio?.templateId || "default"}
          onPreview={(template) => setPreviewTemplate(template)}
          onSelect={handleSelectTemplate}
          updatedTemplate={updatingTemplateId ?? ""}
        />
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <Dialog
          open={!!previewTemplate}
          onOpenChange={() => setPreviewTemplate(null)}
        >
          <DialogContent
            className="z-50 sm:max-w-[95vw] h-[92vh]
                         border shadow-xl outline-none 
                         flex flex-col overflow-hidden"
          >
            <DialogHeader className="p-6 pb-4 border-b ">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl">
                    {previewTemplate.name}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {previewTemplate.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleSelectTemplate(previewTemplate.id);
                      setPreviewTemplate(null);
                    }}
                    disabled={
                      portfolio?.templateId === previewTemplate.id || isUpdating
                    }
                  >
                    {portfolio?.templateId === previewTemplate.id
                      ? "Current Template"
                      : "Use This Template"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewTemplate(null)} >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            {/* Preview Iframe */}
            <div className="flex-1 bg-muted">
              <iframe
                src={`/preview-frame?template=${previewTemplate.id}`}
                className="w-full h-full border-0"
                title={`${previewTemplate.name} Preview`}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default TemplatesPage;
