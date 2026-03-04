import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentSchema, type ContentFormValues } from "../schema";
import { useCallback, useEffect, useMemo, useRef, memo } from "react";
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
import type { UseFormReturn } from "react-hook-form";

// ✅ Isolated — useFormState only re-renders this small component, not ContentPage
const AutoSaveIndicatorWrapper = memo(
  ({
    form,
    isSaving,
    lastSaved,
  }: {
    form: UseFormReturn<ContentFormValues>;
    isSaving: boolean;
    lastSaved: Date | undefined;
  }) => {
    const { isDirty } = useFormState({ control: form.control });
    return (
      <AutoSaveIndicator
        isSaving={isSaving}
        isDirty={isDirty}
        lastSaved={lastSaved}
      />
    );
  },
);

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
  contact: { email: "", phone: "", location: "", socials: {} },
  avatar: { publicId: "", url: "" },
  education: [],
  certifications: [],
  customSections: [],
  sectionsOrder: DEFAULT_SECTION_ORDER,
};

function ContentPage() {
  document.title = "Portify - Content";

  const location = useLocation();
  const navigate = useNavigate();

  // ─── Fetch portfolio ─────────────────────────────────────────────────────────
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
    staleTime: 2 * 60 * 1000,
  });

  // ─── Update mutation ─────────────────────────────────────────────────────────
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

  // ✅ Stable ref for mutate — useMutation returns new reference every render
  // Without this, handleAutoSave recreates → useAutoSave effect re-runs → extra render
  const mutateRef = useRef(updatePortfolioMutation);
  useEffect(() => {
    mutateRef.current = updatePortfolioMutation;
  }, [updatePortfolioMutation]);

  // ─── Derived data ────────────────────────────────────────────────────────────
  const portfolioContent = useMemo<PortfolioContent>(() => {
    if (!portfolio?.content) return EMPTY_CONTENT;
    return {
      ...EMPTY_CONTENT,
      ...portfolio.content,
      personalInfo: {
        ...EMPTY_CONTENT.personalInfo,
        ...portfolio.content.personalInfo,
      },
      contact: { ...EMPTY_CONTENT.contact, ...portfolio.content.contact },
    };
  }, [portfolio?.content]);

  const sectionOrder = useMemo(
    () => portfolio?.content?.sectionsOrder ?? DEFAULT_SECTION_ORDER,
    [portfolio?.content?.sectionsOrder],
  );

  const formValues = useMemo(
    () => portfolioContentToFormValues(portfolioContent),
    [portfolioContent],
  );

  // ─── Step derived from URL ───────────────────────────────────────────────────
  const step = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const raw = parseInt(params.get(STEP_QUERY_KEY) ?? "0", 10);
    const parsed = isNaN(raw) || raw < 0 ? 0 : raw;
    if (!portfolio) return parsed;
    const { step: resolvedStep } = resolveStepFromUrl(
      location.search,
      portfolio.content,
      sectionOrder,
    );
    return resolvedStep;
  }, [location.search, portfolio, sectionOrder]);

  // ✅ Sync URL once after portfolio loads — places step in URL if missing
  // and clamps invalid steps (e.g. ?step=9 when only 3 sections done)
  const didSyncUrlRef = useRef(false);
  useEffect(() => {
    if (!portfolio || didSyncUrlRef.current) return;
    didSyncUrlRef.current = true;
    const { step: resolvedStep, shouldSyncUrl } = resolveStepFromUrl(
      location.search,
      portfolio.content,
      sectionOrder,
    );
    if (shouldSyncUrl) {
      navigate(`?${STEP_QUERY_KEY}=${resolvedStep}`, { replace: true });
    }
  }, [portfolio]);

  // ─── Form ────────────────────────────────────────────────────────────────────
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    mode: "onBlur",
    values: formValues,
  });

  const { trigger, getValues } = form;

  // ─── Auto-save ───────────────────────────────────────────────────────────────
  const sectionOrderRef = useRef(sectionOrder);
  useEffect(() => {
    sectionOrderRef.current = sectionOrder;
  }, [sectionOrder]);

  // ✅ handleAutoSave has NO deps — reads everything via refs
  const handleAutoSave = useCallback(async (formData: ContentFormValues) => {
    const content = formValuesToPortfolioContent(formData);
    return new Promise<void>((resolve, reject) => {
      mutateRef.current(
        { content: { ...content, sectionsOrder: sectionOrderRef.current } },
        { onSuccess: () => resolve(), onError: reject },
      );
    });
  }, []); // ✅ truly stable — never recreated



  // ─── Completed steps ─────────────────────────────────────────────────────────
  const completedSteps = useMemo(() => {
    if (!portfolio?.content) return [];
    return sectionOrder.filter((id: string) =>
      BLOCKS_REGISTRY[id]?.isComplete(portfolio.content),
    );
  }, [portfolio?.content, sectionOrder]);

  // ─── Current block ───────────────────────────────────────────────────────────
  const currentBlockId = sectionOrder[step];
  const currentBlock = useMemo(
    () => BLOCKS_REGISTRY[currentBlockId],
    [currentBlockId],
  );
  const BlockForm = useMemo(() => currentBlock?.form, [currentBlock]);
  const {
    isSaving: isAutoSaving,
    lastSaved,
    forceSave,
  } = useAutoSave({
    form,
    onSave: handleAutoSave,
    debounceMs: 2000,
    enabled: !!portfolio,
    // ✅ Only validate current block's fields before auto-saving
    // e.g. for "about" block: ["about"] — won't block save due to unrelated empty fields
    fieldsToValidate: currentBlock?.fields,
  });
  // ─── Section management ──────────────────────────────────────────────────────
  const saveSectionsOrder = useCallback(
    (newOrder: string[]) => {
      const content = formValuesToPortfolioContent(getValues());
      mutateRef.current(
        { content: { ...content, sectionsOrder: newOrder } },
        {
          onSuccess: () => toast.success("Sections updated"),
          onError: () => toast.error("Failed to update sections"),
        },
      );
    },
    [getValues],
  );

  const handleAddSection = useCallback(
    (id: string) => saveSectionsOrder([...sectionOrder, id]),
    [sectionOrder, saveSectionsOrder],
  );

  const handleRemoveSection = useCallback(
    (id: string) => {
      const newOrder = sectionOrder.filter((x: string) => x !== id);
      const newStep =
        step >= newOrder.length ? Math.max(0, newOrder.length - 1) : step;
      if (newStep !== step)
        navigate(`?${STEP_QUERY_KEY}=${newStep}`, { replace: true });
      saveSectionsOrder(newOrder);
    },
    [sectionOrder, step, navigate, saveSectionsOrder],
  );

  const handleReorderSections = useCallback(
    (newOrder: string[]) => saveSectionsOrder(newOrder),
    [saveSectionsOrder],
  );

  // ─── Navigation ──────────────────────────────────────────────────────────────
  const handleNext = useCallback(async () => {
    const isValid = await trigger(currentBlock.fields as any);
    if (!isValid) {
      toast.error("Please fix validation errors before continuing.");
      return;
    }

    const content = formValuesToPortfolioContent(getValues());
    const isComplete = currentBlock.isComplete(content);
    if (!isComplete) {
      toast.error("Please complete all required fields in this section.");
      return;
    }

    try {
      await forceSave();
      const maxStep = getMaxAllowedStep(content, sectionOrder);
      navigate(`?${STEP_QUERY_KEY}=${Math.min(step + 1, maxStep)}`, {
        replace: true,
      });
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  }, [
    trigger,
    currentBlock,
    getValues,
    step,
    sectionOrder,
    navigate,
    forceSave,
  ]);

  const handlePrev = useCallback(
    () =>
      navigate(`?${STEP_QUERY_KEY}=${Math.max(0, step - 1)}`, {
        replace: true,
      }),
    [step, navigate],
  );

  const handleGoToTemplates = useCallback(async () => {
    try {
      await forceSave();
      navigate("/builder/templates");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  }, [forceSave, navigate]);
console.log("content page render");

  // ─── Guards ──────────────────────────────────────────────────────────────────
  if (isFetching && !portfolio) return <ContentPageSkeleton />;

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

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
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
          <AutoSaveIndicatorWrapper
            form={form}
            isSaving={isAutoSaving}
            lastSaved={lastSaved}
          />
        </div>

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

              <fieldset disabled={isPending}>
                <form className="space-y-8 mt-10">
                  <BlockForm />
                </form>
              </fieldset>

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
