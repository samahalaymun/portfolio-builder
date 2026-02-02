import { useFieldArray, useFormContext } from "react-hook-form";
import FormSection from "../form/FormSection";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


function ExperienceSection() {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name: "experience",
    });
    
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
              <Input
                placeholder="Company name"
                {...register(`experience.${index}.company`)}
              />
              <Input
                placeholder="Job title"
                {...register(`experience.${index}.role`)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="month"
                {...register(`experience.${index}.startDate`)}
              />
              <Input
                type="month"
                {...register(`experience.${index}.endDate`)}
                placeholder="Present"
              />
            </div>

            <Textarea
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              {...register(`experience.${index}.description`)}
            />
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

export default ExperienceSection
