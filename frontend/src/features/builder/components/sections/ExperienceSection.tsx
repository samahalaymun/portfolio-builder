import { useFieldArray, useFormContext } from "react-hook-form";
import FormSection from "../form/FormSection";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useAIGeneration } from "../../hooks/useAIGeneration";
import toast from "react-hot-toast";
import AiGenerationButton from "@/components/ui/ai-generation-button";

function ExperienceSection() {
  const {
    control,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
     // --- generate project description ---
     const { generate: generateDescription, isPending } = useAIGeneration({
       endpoint: "/ai/experience-description",
       successMessage: "✨ Experience description  generated successfully!",
       errorMessage: "Failed to generate Experience description",
     });

       async function handleGenerateDescription(index: number) {
         const experiences = getValues("experience");
         const currentExperience = experiences[index];
         const role = currentExperience?.role; // ✅ Actual value
         const userText = currentExperience?.description; // ✅ Actual value
         const company = currentExperience?.company;
         // Validate required fields         
         if (!role || role.trim() === "") {
           toast.error("Please enter experience role first");
           return;
         }

         // Call the AI generation
         generateDescription(
           {
             role,
             userText,
             company,
           },
           {
             onSuccess: (text) => {
               setValue(`experience.${index}.description`, text, {
                 shouldDirty: true,
                 shouldValidate: true,
               });
             },
           },
         );
       }
  return (
    <FormSection
      title="Work Experience"
      description="Add your professional experience to strengthen your portfolio."
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
              className="absolute right-0 mb-0  bottom-0 text-muted-foreground hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Company name"
                  {...register(`experience.${index}.company`)}
                />
                {(errors.experience as any)?.[index]?.company?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.experience as any)[index].company.message,
                    )}
                  />
                )}
              </div>
              <div>
                <Input
                  placeholder="Job title"
                  {...register(`experience.${index}.role`)}
                />
                {(errors.experience as any)?.[index]?.role?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.experience as any)[index].role.message,
                    )}
                  />
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="month"
                  {...register(`experience.${index}.startDate`)}
                />
                {(errors.experience as any)?.[index]?.startDate?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.experience as any)[index].startDate.message,
                    )}
                  />
                )}
              </div>
              <Input
                type="month"
                {...register(`experience.${index}.endDate`)}
                placeholder="Present"
              />
            </div>

            <div className="space-y-4">
              <Textarea
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
                {...register(`experience.${index}.description`)}
              />
              <div className="flex justify-end">
                <AiGenerationButton
                  isPending={isPending}
                  onClick={() => handleGenerateDescription(index)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add experience
        </Button>
      </div>
    </FormSection>
  );
}

export default ExperienceSection;
