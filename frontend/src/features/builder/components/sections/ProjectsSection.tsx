import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Plus, Trash } from "lucide-react";

import FormSection from "../form/FormSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TechStackInput from "./TechStackInput";
import ImageUpload from "../form/ImageUpload";
import { imageFileToBase64 } from "@/lib/utils";

export default function ProjectsSection() {
  const { control, register, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <FormSection
      title="Projects"
      description="Showcase the projects you've worked on."
    >
      <div className="space-y-10">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-sm border p-2 md:p-6 space-y-4"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="absolute right-0 mb-0  bottom-0"
            >
              <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>

            <Input
              placeholder="Project title"
              {...register(`projects.${index}.title`)}
            />

            <Textarea
              rows={3}
              placeholder="What is this project about?"
              {...register(`projects.${index}.description`)}
            />

            <Controller
              control={control}
              name={`projects.${index}.technologies`}
              render={({ field }) => (
                <TechStackInput value={field.value} onChange={field.onChange} />
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Source code URL"
                {...register(`projects.${index}.sourceCode`)}
              />
              <Input
                placeholder="Live demo URL"
                {...register(`projects.${index}.liveDemo`)}
              />
            </div>
            <Controller
              control={control}
              name={`projects.${index}.image`}
              render={({ field }) => (
                <ImageUpload
                  label="Project Photo"
                  preview={field.value}
                  onChange={async (file) => {
                    const base64 = await imageFileToBase64(file, {
                      maxWidth: 1200,
                      maxHeight: 800,
                      quality: 0.75,
                    });

                    setValue(`projects.${index}.image`, base64, {
                      shouldDirty: true,
                    });
                  }}
                />
              )}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              title: "",
              description: "",
              technologies: [],
              sourceCode: "",
              liveDemo: "",
            })
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add project
        </Button>
      </div>
    </FormSection>
  );
}
