import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSection from "../form/FormSection";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Sparkles } from "lucide-react";
import { useAIGeneration } from "../../hooks/useAIGeneration";
import toast from "react-hot-toast";

function PersonalInfoSection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const profile = watch();
  //Use the reusable AI hook
  const { generate: generateSummary, isPending } = useAIGeneration({
    endpoint: "/ai/summary",
    onSuccess: (text) => {
      setValue("summary", text, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    successMessage: "✨ Summary generated!",
    errorMessage: "Failed to generate summary",
  });
  async function handleGenerate() {
    // Validate required fields
    if (!profile.role) {
      toast.error("Please enter your role first");
      return;
    }

    // Call the AI generation
    generateSummary({
      userText: profile.summary,
      role: profile.role,
      skills: profile.skills || [],
    });
  }
  return (
    <FormSection
      title="Personal Information"
      description="Basic information that will appear on your portfolio."
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">First name</Label>
          <Input id="name" {...register("firstname")} placeholder="John" />
          {errors?.firstname?.message && (
            <ErrorAlert error={String(errors.firstname.message)} />
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Last name</Label>
          <Input id="name" {...register("lastname")} placeholder="Doe" />
          {errors?.lastname?.message && (
            <ErrorAlert error={String(errors.lastname.message)} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvUrl">CV URL</Label>
          <Input
            id="cvUrl"
            placeholder="CV URL (Google Drive, Dropbox, etc...)"
            {...register("cvUrl")}
          />
          {errors?.cvUrl?.message && (
            <ErrorAlert error={String(errors.cvUrl.message)} />
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            placeholder="Frontend developer"
            {...register("role")}
          />
          {errors?.role?.message && (
            <ErrorAlert error={String(errors.role.message)} />
          )}
        </div>
      </div>
      <div>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            {...register("summary")}
            placeholder="Tell us about yourself, your experience, and what you do best..."
            rows={6}
            disabled={isPending}
          />
          {errors?.summary?.message && (
            <ErrorAlert error={String(errors?.summary?.message)} />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {watch("summary")?.length || 0} / 160 characters
        </p>

        <div className="flex md:justify-end">
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
      </div>
    </FormSection>
  );
}

export default PersonalInfoSection;
