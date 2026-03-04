import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import FormSection from "../form/FormSection";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useAIGeneration } from "../../hooks/useAIGeneration";
import toast from "react-hot-toast";
import AiGenerationButton from "@/components/ui/ai-generation-button";

function EductionSection() {
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const { generate: generateDescription, isPending } = useAIGeneration({
    endpoint: "/ai/education-description",
    successMessage: "✨ Education description generated!",
    errorMessage: "Failed to generate education description",
  });

  async function handleGenerateDescription(index: number) {
    // Get current values from form
    const education = getValues("education");
    const currentEducation = education[index];

    const institution = currentEducation?.institution;
    const degree = currentEducation?.degree;
    const field = currentEducation?.field;
    const userText = currentEducation?.description || "";
     console.log("data", { institution, degree });
     
    // Validate required fields
    if (!institution || institution.trim() === "") {
      toast.error("Please enter institution name first");
      return;
    }

    if (!degree || degree.trim() === "") {
      toast.error("Please enter degree first");
      return;
    }

    if (!field || field.trim() === "") {
      toast.error("Please enter field of study first");
      return;
    }

    // Call AI generation
    generateDescription(
      {
        institution,
        degree,
        field,
        userText,
      },
      {
        onSuccess: (text) => {
          // Set the generated description
          setValue(`education.${index}.description`, text, {
            shouldDirty: true,
            shouldValidate: true,
          });
        },
      },
    );
  }

  return (
    <FormSection
      title="Education"
      description="Add your educational background to showcase your qualifications."
    >
      <div className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-sm border p-2 md:p-6 space-y-4"
          >
            {/* Remove */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="absolute right-0 mb-0 bottom-0 text-muted-foreground hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Institution"
                  {...register(`education.${index}.institution`)}
                />
                {(errors.education as any)?.[index]?.institution?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.education as any)[index].institution.message,
                    )}
                  />
                )}
              </div>

              <div>
                <Input
                  placeholder="Degree (optional)"
                  {...register(`education.${index}.degree`)}
                />
                {(errors.education as any)?.[index]?.degree?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.education as any)[index].degree.message,
                    )}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Field of Study (optional)"
                  {...register(`education.${index}.field`)}
                />
                {(errors.education as any)?.[index]?.field?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.education as any)[index].field.message,
                    )}
                  />
                )}
              </div>

              <div>
                <Input
                  type="month"
                  {...register(`education.${index}.startDate`)}
                />
                {(errors.education as any)?.[index]?.startDate?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.education as any)[index].startDate.message,
                    )}
                  />
                )}
              </div>
            </div>

            <div>
              <Input
                type="month"
                {...register(`education.${index}.endDate`)}
                placeholder="End Date (optional)"
              />
            </div>

            <Textarea
              rows={4}
              placeholder="Description (optional)"
              {...register(`education.${index}.description`)}
            />
            <div className="flex justify-end">
              <AiGenerationButton
                isPending={isPending}
                onClick={() => handleGenerateDescription(index)}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              institution: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>
    </FormSection>
  );
}

export default EductionSection;
