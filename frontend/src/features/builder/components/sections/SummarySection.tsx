import { useState } from "react";
import { useFormContext } from "react-hook-form";
import FormSection from "../form/FormSection";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateSummary } from "../../api/generateSummary";
import { Spinner } from "@/components/ui/spinner";
import ErrorAlert from "../form/ErrorAlert";

function SummarySection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const [loading, setLoading] = useState(false);

  const profile = watch();
  
  async function handleGenerate() {
    console.log("genarate");
    
    setLoading(true);
    try {
      const summary = await generateSummary({
        name: profile.firstname,
        role: profile.role,
        skills: profile.skills,
        userText: profile.summary,
      });

      setValue("summary", summary, { shouldDirty: true });
    } finally {
      setLoading(false);
    }
  }
  return (
    <FormSection
      title="Professional Summary"
      description="Write a short introduction or let AI generate one for you."
    >
      <Textarea
        {...register("summary")}
        placeholder="Tell us about yourself, your experience, and what you do best..."
        rows={6}
      />
      <p className="text-xs text-muted-foreground">
        {watch("summary")?.length || 0} / 160 characters
      </p>
      {errors?.summary?.message && (
        <ErrorAlert error={String(errors?.summary?.message)}/>
      )}

      <div className="flex md:justify-end">
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

export default SummarySection;
