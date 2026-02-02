import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentSchema, type ContentFormValues } from "../schema";
import PersonalInfoSection from "../components/sections/PersonalInfoSection";
import SummarySection from "../components/sections/SummarySection";
import SkillsSection from "../components/sections/SkillsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SocialLinksSection from "../components/sections/SocialLinksSection";
import PhotosSection from "../components/sections/PhotosSection";
import { useBuilderStore, type BuilderProfile } from "../store/builder.store";
import { clampStep, mapFormToProfile } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import AboutSection from "../components/sections/AboutSection";
import {
  CONTENT_STEPS,
  STEP_QUERY_KEY,
  STEP_STORAGE_KEY,
} from "@/data/constants";
import StepIndicator from "../components/StepIndicator";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../layout/Breadcrumb";
const breadcrumbs = [{ label: "Builder" }, { label: "Content" }];

function ContentPage() {
  const { updateProfile, profile } = useBuilderStore((s) => s);
  const location = useLocation();
  const [step, setStep] = useState(() => {
    const params = new URLSearchParams(location.search);
    const stepFromUrl = params.get(STEP_QUERY_KEY);
    const stepFromStorage = localStorage.getItem(STEP_STORAGE_KEY);
    if (stepFromUrl !== null) {
      return sanitizeStep(Number(stepFromUrl), profile);
    }
    if (stepFromStorage !== null) {
      return sanitizeStep(Number(stepFromStorage), profile);
    }
    return 0;
  });

  const navigate = useNavigate();
  document.title = "Portify - " + "Content";
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    mode: "onBlur",
    defaultValues: {
      firstname: profile.firstname ?? "",
      lastname: profile.lastname ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      cvUrl: profile.cvUrl ?? "",
      role: profile.role ?? "",
      summary: profile.summary ?? "",
      about: profile.about ?? "",
      skills: profile.skills ?? [],
      projects: profile.projects ?? [],
      experience: profile.experience ?? [],
      socials: profile.socials ?? {},
      images: profile.images ?? {},
    },
  });
  const { trigger } = form;

  useEffect(() => {
    const subscription = form.watch((values) => {
      updateProfile(mapFormToProfile(values as ContentFormValues));
    });

    return () => subscription.unsubscribe();
  }, [form, updateProfile]);
  useEffect(() => {
    localStorage.setItem(STEP_STORAGE_KEY, step.toString());
    const params = new URLSearchParams(location.search);
    params.set(STEP_QUERY_KEY, step.toString());

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true },
    );
  }, [step]);

  const completedSteps = useMemo(() => {
    return CONTENT_STEPS.slice(0, step).map((s) => s.id);
  }, [step]);

  async function next() {
    const stepFields = CONTENT_STEPS[step].fields;
    const valid = stepFields.length ? await trigger(stepFields as any) : true;
    if (!valid) return;
    setStep((s) => clampStep(s + 1));
  }

  function prev() {
    setStep((s) => clampStep(s - 1));
  }

  function goToPreview() {
    localStorage.removeItem(STEP_STORAGE_KEY);
    navigate("/builder/preview");
  }
  function getMaxAllowedStep(profile: BuilderProfile) {
    if (
      !profile.firstname ||
      !profile.lastname ||
      !profile.email ||
      !profile.phone ||
      !profile.location ||
      !profile.role
    )
      return 0;
    if (!profile.summary || !profile.about) return 1;
    if (!profile.skills?.length) return 2;
    if (!profile.experience?.length) return 3;
    if (!profile.projects?.length) return 4;
    if (!profile.socials) return 5;

    return CONTENT_STEPS.length - 1;
  }

  function sanitizeStep(requestedStep: number, profile: BuilderProfile) {
    const maxAllowed = getMaxAllowedStep(profile);
    if (Number.isNaN(requestedStep)) return 0;
    return Math.min(Math.max(0, requestedStep), maxAllowed);
  }
console.log(step);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} className="ml-14 lg:ml-0" />
      <div className="py-16 px-4 md:px-10 ">
        <Heading title="Add your information" />
        <Animated variant="flip">
          <p className="text-muted-foreground text-lg mb-10">
            Add your about me summery, contact info (email, mobile number...),
            skills, your projects, education, experiences...
          </p>
        </Animated>
        <FormProvider {...form}>
          <StepIndicator currentStep={step} completedSteps={completedSteps} />
          <form className="space-y-16  mt-10">
            {step === 0 && <PersonalInfoSection />}
            {step === 1 && (
              <>
                <SummarySection />
                <AboutSection />
              </>
            )}
            {step === 2 && <SkillsSection />}

            {step === 3 && <ExperienceSection />}
            {step === 4 && <ProjectsSection />}
            {step === 5 && (
              <>
                <SocialLinksSection />
                <PhotosSection />
              </>
            )}
          </form>
          <div className="flex justify-between mt-12 gap-2">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              Previous
            </Button>

            {step < CONTENT_STEPS.length - 1 ? (
              <Button onClick={next}>Next</Button>
            ) : (
              <Button onClick={goToPreview}>Preview Portfolio</Button>
            )}
          </div>
        </FormProvider>
      </div>
    </>
  );
}

export default ContentPage;
