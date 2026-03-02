import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentSchema, type ContentFormValues } from "../schema";
import { useCallback, useEffect, useMemo, useState } from "react";
import { STEP_QUERY_KEY } from "@/data/constants";
import StepIndicator from "../components/StepIndicator";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumb";
import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import ContentPageSkeleton from "../components/Skeleton/ContentPageSkeleton";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import type { PortfolioContent, UpdatePortfolioContentPayload } from "../types";
import { Spinner } from "@/components/ui/spinner";
import {
  getMaxAllowedStep,
  resolveStepFromUrl,
} from "@/features/builder/utils/resolveContentStep";
import { toast } from "react-hot-toast";
import { BLOCKS_REGISTRY } from "../schema/blocks.registry";
import BlockManager from "../components/BlockManager";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  formValuesToPortfolioContent,
  portfolioContentToFormValues,
} from "../utils/contentconverters";
import { AutoSaveIndicator } from "../components/Autosaveindicator";
import { useAutoSave } from "../hooks/useAutoSave";

const breadcrumbs = [
  { label: "Builder", to: "/builder/start" },
  { label: "Content" },
];
const DEFAULT_SECTION_ORDER = [
  "personalInfo",
  "about",
  "skills",
  "contact",
  "photos",
];

const EMPTY_CONTENT: PortfolioContent = {
  personalInfo: {
    firstname: "",
    lastname: "",
    summary: "",
    cvUrl: "",
    role: "",
  },
  about: "",
  skills: [],
  projects: [],
  experience: [],
  contact: {
    email: "",
    phone: "",
    location: "",
    socials: {},
  },
  avatar: { publicId: "", url: "" },
  education: [],
  certifications: [],
  customSections: [],
  sectionsOrder: DEFAULT_SECTION_ORDER,
};

function ContentPage() {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  document.title = "Portify - " + "Content";
  // Fetch portfolio
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
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  // Update portfolio mutation
  const {
    mutate: updatePortfolioMutation,
    isPending,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationFn: async (data: UpdatePortfolioContentPayload) => {
      const res = await api.patch("/portfolios", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["portfolio-profile"], data);
    },
  });

  //Memoized content merge
  const portfolioContent = useMemo<PortfolioContent>(() => {
    if (!portfolio?.content) return EMPTY_CONTENT;

    return {
      ...EMPTY_CONTENT,
      ...portfolio.content,
      personalInfo: {
        ...EMPTY_CONTENT.personalInfo,
        ...portfolio.content.personalInfo,
      },
      contact: {
        ...EMPTY_CONTENT.contact,
        ...portfolio.content.contact,
      },
    };
  }, [portfolio?.content]);

  const formValues = useMemo(
    () => portfolioContentToFormValues(portfolioContent),
    [portfolioContent],
  );

  //Derive sectionOrder from portfolio (no separate state)
  const sectionOrder = useMemo(
    () => portfolio?.content?.sectionsOrder ?? DEFAULT_SECTION_ORDER,
    [portfolio?.content?.sectionsOrder],
  );

  // Form setup
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    mode: "onBlur",
    values: formValues,
  });

  const {
    trigger,
    getValues,
    formState: { isDirty },
    reset,
  } = form;

  const handleAutoSave = useCallback(
    async (formData: ContentFormValues) => {
      const content = formValuesToPortfolioContent(formData);
      return new Promise<void>((resolve, reject) => {
        updatePortfolioMutation(
          {
            content: {
              ...content,
              sectionsOrder: sectionOrder,
            },
          },
          {
            onSuccess: () => {
              resolve();
            },
            onError: (error) => {
              console.error("Auto-save error:", error);
              reject(error);
            },
          },
        );
      });
    },
    [updatePortfolioMutation, sectionOrder],
  );

  const {
    isSaving: isAutoSaving,
    lastSaved, //Get it from hook
    forceSave,
    skipSave
  } = useAutoSave({
    form,
    onSave: handleAutoSave,
    debounceMs: 2000, // 2 seconds after user stops typing
    enabled: true,
    validateBeforeSave: true,
  });
  //Sync step from URL
  useEffect(() => {
    if (!portfolio) return;
    const { step: resolvedStep, shouldSyncUrl } = resolveStepFromUrl(
      location.search,
      portfolio.content,
      sectionOrder,
    );

    setStep(resolvedStep);
    if (shouldSyncUrl) {
      navigate(`?${STEP_QUERY_KEY}=${resolvedStep}`, { replace: true });
    }
  }, [portfolio, location.search, navigate, sectionOrder]);

  //Calculate completed steps
  const completedSteps = useMemo(() => {
    if (!portfolio?.content) return [];
    return sectionOrder.filter((id: any) =>
      BLOCKS_REGISTRY[id]?.isComplete(portfolio.content),
    );
  }, [portfolio?.content, sectionOrder, portfolio?.id]);

  //Current block
  const currentBlockId = sectionOrder[step];
  const currentBlock = useMemo(
    () => BLOCKS_REGISTRY[currentBlockId],
    [currentBlockId],
  );
  const BlockForm = useMemo(() => currentBlock?.form, [currentBlock]);
  //Manual save (for Next button)
  const updatePortfolio = useCallback(async (): Promise<void> => {
    // Force save any pending changes
    await forceSave();
  }, [forceSave]);
  //Navigate to next step
  const handleNext = useCallback(async () => {
    // Validate current block fields
    const isValid = await trigger(currentBlock.fields as any);

    if (!isValid) {
      toast.error("Please fix validation errors");
      return;
    }

    // Check block completion
    const formValues = getValues();
    const content = formValuesToPortfolioContent(formValues);
    const isComplete = currentBlock.isComplete(content);

    if (!isComplete) {
      toast.error("Please complete or remove this section");
      return;
    }

    // Save and navigate
    try {
      await updatePortfolio();

      const nextStep = step + 1;
      const maxStep = getMaxAllowedStep(content, sectionOrder);
      const safeStep = Math.min(nextStep, maxStep);

      navigate(`?${STEP_QUERY_KEY}=${safeStep}`, { replace: true });
    } catch (error) {
      toast.error("Failed to save. Please try again.");
    }
  }, [
    trigger,
    currentBlock,
    getValues,
    step,
    sectionOrder,
    navigate,
    updatePortfolio,
  ]);

  //Navigate to previous step
  const handlePrev = useCallback(() => {
    const prevStep = Math.max(0, step - 1);
    navigate(`?${STEP_QUERY_KEY}=${prevStep}`, { replace: true });
  }, [step, navigate]);

  const handleGoToTemplates = useCallback(async () => {
    try {
      await updatePortfolio();
      navigate("/builder/templates");
    } catch (error) {
      toast.error("Failed to save. Please try again.");
    }
  }, [updatePortfolio, navigate]);
  // Section order management
  const saveSectionsOrder = useCallback(
    (newOrder: string[]) => {
      const formData = getValues();
      const content = formValuesToPortfolioContent(formData);

      updatePortfolioMutation(
        {
          content: {
            ...content,
            sectionsOrder: newOrder,
          },
        },
        {
          onSuccess: () => toast.success("Sections updated"),
          onError: () => toast.error("Failed to update sections"),
        },
      );
    },
    [updatePortfolioMutation, getValues],
  );

  const handleAddSection = useCallback(
    (id: string) => {
      const newOrder = [...sectionOrder, id];
      saveSectionsOrder(newOrder);
    },
    [sectionOrder, saveSectionsOrder],
  );
  const handleRemoveSection = useCallback(
    (id: string) => {
      const newOrder = sectionOrder.filter((x: any) => x !== id);

      // Adjust step if needed
      if (step >= newOrder.length) {
        const newStep = Math.max(0, newOrder.length - 1);
        setStep(newStep);
        navigate(`?${STEP_QUERY_KEY}=${newStep}`, { replace: true });
      }

      saveSectionsOrder(newOrder);
    },
    [sectionOrder, step, navigate, saveSectionsOrder],
  );
  const handleReorderSections = useCallback(
    (newOrder: string[]) => {
      saveSectionsOrder(newOrder);
    },
    [saveSectionsOrder],
  );

  if (isFetching && !portfolio) {
    return <ContentPageSkeleton />;
  }

  // ✅ Error handling for missing block
  if (!currentBlock || !BlockForm) {
    return (
      <>
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-16 px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Block configuration error. Please refresh the page.
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
  }
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Animated variant="flip" delay={0}>
            <Heading
              title="Add your information"
              className="text-3xl sm:text-4xl mb-3"
            />
            <p className="text-muted-foreground text-lg mb-2">
              Fill in your details section by section. You can skip optional
              sections or add them later.
            </p>
          </Animated>
          {/* ✅ Auto-save indicator */}
          <AutoSaveIndicator
            isSaving={isAutoSaving}
            isDirty={isDirty}
            lastSaved={lastSaved}
            skipSave={skipSave}
          />
        </div>

        {/* Error alert */}
        {(isQueryError || isMutationError) && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {(queryError || mutationError)?.message || "An error occurred"}
            </AlertDescription>
          </Alert>
        )}
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <BlockManager
            order={sectionOrder}
            onReorder={handleReorderSections}
            onAdd={handleAddSection}
            onRemove={handleRemoveSection}
          />
          <div>
            <FormProvider {...form}>
              <StepIndicator
                contentSteps={sectionOrder}
                currentStep={step}
                completedSteps={completedSteps}
              />

              <Alert>
                <AlertDescription className="text-sm flex">
                  <strong>💡Tip:</strong> Complete each section or remove it to
                  proceed. Your progress is automatically saved.
                </AlertDescription>
              </Alert>

              {/* ✅ Disable form during save */}
              <fieldset disabled={isPending}>
                <form className="space-y-8 mt-10">
                  <BlockForm />
                </form>
              </fieldset>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-12 gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={step === 0 || isPending}
                >
                  Previous
                </Button>

                {step < sectionOrder.length - 1 ? (
                  <Button disabled={isPending} onClick={handleNext}>
                    {isPending && <Spinner className="mr-2" />}
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleGoToTemplates} disabled={isPending}>
                    {isPending && <Spinner className="mr-2" />}
                    Choose Template
                  </Button>
                )}
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentPage;
