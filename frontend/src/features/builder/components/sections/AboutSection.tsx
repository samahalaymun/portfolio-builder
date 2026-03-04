import FormSection from "../form/FormSection";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useAIGeneration } from "../../hooks/useAIGeneration";
import toast from "react-hot-toast";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

function AboutSection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const profile = watch();
  const { generate: generateAbout, isPending } = useAIGeneration({
    endpoint: "/ai/about",
    onSuccess: (text) => {
      // Convert plain text to HTML (wrap paragraphs)
      const paragraphs = text
        .split("\n\n")
        .filter((p) => p.trim())
        .map((p) => `<p>${p}</p>`)
        .join("");

      setValue("about", paragraphs, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    successMessage: "✨ About section  generated!",
    errorMessage: "Failed to generate about",
  });
  async function handleGenerate() {
    // Validate required fields
    if (!profile.role) {
      toast.error("Please enter your role in Personal Info first");
      return;
    }

    // Call the AI generation
    generateAbout({
      userText: profile.about,
      role: profile.role,
      skills: profile.skills || [],
    });
  }
  return (
    <FormSection
      title="Professional About"
      description="Write a brief professional story about yourself, your experience, and what makes you unique. You can also generate one using AI."
    >
      <div className="space-y-2">
        <RichTextEditor
          value={profile.about || ""}
          onChange={(value) => setValue("about", value, { shouldDirty: true })}
          placeholder="I'm a frontend developer with experience in building modern, responsive web applications using React, TypeScript, and Tailwind..."
          disabled={isPending}
          maxLength={800}
        />

        {errors?.about?.message && (
          <ErrorAlert error={String(errors.about.message)} />
        )}
      </div>
      <div className="flex md:flex-row flex-col gap-2 md:items-center md:justify-between text-sm text-muted-foreground">
        <span>Tell your story in 1–2 short paragraphs.</span>

        <Button
          type="button"
          variant="outline"
          onClick={handleGenerate}
          disabled={isPending}
          className="gap-2"
        >
          {isPending ? (
            <>
              <Spinner className="h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
    </FormSection>
  );
}

export default AboutSection;
