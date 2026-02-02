import { Textarea } from "@/components/ui/textarea";
import FormSection from "../form/FormSection";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { generateSummary } from "../../api/generateSummary";
import ErrorAlert from "../form/ErrorAlert";

function AboutSection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const [loading, setLoading] = useState(false);
  const profile = watch();
  async function handleGenerate() {
    setLoading(true);
    try {
      const about = await generateSummary({
        name: profile.name,
        title: profile.title,
        skills: profile.skills,
        experiences: profile.experiences,
      });

      setValue("about", about, { shouldDirty: true });
    } finally {
      setLoading(false);
    }
  }
  return (
    <FormSection
      title="Professional About"
      description="Write a brief professional story about yourself, your experience, and what makes you unique. You can also generate one using AI."
    >
      <Textarea
        {...register("about")}
        placeholder="I’m a frontend developer with experience in building modern, responsive web applications using React, TypeScript, and Tailwind. I focus on creating clean, accessible, and user-friendly interfaces..."
        rows={10}
      />
      <p className="text-xs text-muted-foreground">
        {watch("about")?.length || 0} / 600 characters
      </p>
      {errors?.about?.message && (
        <ErrorAlert error={String(errors.about.message)} />
      )}
      <div className="flex md:flex-row flex-col gap-2 md:items-center md:justify-between text-sm text-muted-foreground">
        <span>Tell your story in 1–2 short paragraphs.</span>

        <Button
          type="button"
          variant="outline"
          onClick={handleGenerate}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Generate with AI
        </Button>
      </div>
    </FormSection>
  );
}

export default AboutSection;
