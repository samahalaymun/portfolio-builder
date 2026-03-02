import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Plus, Trash } from "lucide-react";
import FormSection from "../form/FormSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TechStackInput from "./TechStackInput";
import ImageUpload from "../form/ImageUpload";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAIGeneration } from "../../hooks/useAIGeneration";
import toast from "react-hot-toast";
import ErrorAlert from "@/components/shared/ErrorAlert";
import AiGenerationButton from "@/components/ui/ai-generation-button";

export default function ProjectsSection() {
  const {
    control,
    register,
    setValue,
    getValues,
    formState:{errors}
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // --- generate project description ---
  const { generate: generateDescription, isPending } = useAIGeneration({
    endpoint: "/ai/project-description",
    successMessage: "✨ Project description  generated successfully!",
    errorMessage: "Failed to generate Project description",
  });

  // --- Upload Mutation ---
  const {
    mutateAsync: uploadMutation,
    isPending: uploadingImage,
    isError: isUploadError,
    error: uploadError,
  } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data as { url: string; publicId: string };
    },
  });

  // --- Delete Mutation ---
  const {
    mutateAsync: deleteMutation,
    isPending: deletingImage,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: async (publicId: string) => {
      await api.delete("/upload/image", { data: { publicId } });
    },
  });
  // --- Handlers ---
  async function handleUpload(file: File, index: number, currentImage?: any) {
    if (currentImage?.publicId) {
      await deleteMutation(currentImage.publicId);
    }

    const uploaded = await uploadMutation(file);

    setValue(`projects.${index}.image`, uploaded, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function handleRemove(index: number, currentImage?: any) {
    if (!currentImage?.publicId) return;

    await deleteMutation(currentImage.publicId);

    setValue(`projects.${index}.image`, undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  async function handleGenerateDescription(index: number) {
    const projects = getValues("projects");
    const currentProject = projects[index];
    const title = currentProject?.title; // ✅ Actual value
    const userText = currentProject?.description; // ✅ Actual value
    const technologies = currentProject?.technologies;
    // Validate required fields
    if (!title || title.trim() === "") {
      toast.error("Please enter project title first");
      return;
    }

    // Call the AI generation
    generateDescription(
      {
        title,
        userText,
        technologies,
      },
      {
        onSuccess: (text) => {
          setValue(`projects.${index}.description`, text, {
            shouldDirty: true,
            shouldValidate: true,
          });
        },
      },
    );
  }

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

            <div>
              <Input
                placeholder="Project title"
                {...register(`projects.${index}.title`)}
              />
              {(errors.projects as any)?.[index]?.title?.message && (
                <ErrorAlert
                  className="mt-2"
                  error={String((errors.projects as any)[index].title.message)}
                />
              )}
            </div>
            <div className="space-y-4">
              <Textarea
                rows={3}
                placeholder="What is this project about?"
                {...register(`projects.${index}.description`)}
              />
              {(errors.projects as any)?.[index]?.description?.message && (
                <ErrorAlert
                  className="mt-2"
                  error={String(
                    (errors.projects as any)[index].description.message,
                  )}
                />
              )}
              <div className="flex justify-end">
                <AiGenerationButton
                  isPending={isPending}
                  onClick={() => handleGenerateDescription(index)}
                />
              </div>
            </div>

            <div>
              <Controller
                control={control}
                name={`projects.${index}.technologies`}
                render={({ field }) => (
                  <TechStackInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {(errors.projects as any)?.[index]?.technologies?.message && (
                <ErrorAlert
                  className="mt-2"
                  error={String(
                    (errors.projects as any)[index].technologies.message,
                  )}
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                {" "}
                <Input
                  placeholder="Source code URL"
                  {...register(`projects.${index}.sourceCode`)}
                />
                {(errors.projects as any)?.[index]?.sourceCode?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.projects as any)[index].sourceCode.message,
                    )}
                  />
                )}
              </div>
              <div>
                <Input
                  placeholder="Live demo URL"
                  {...register(`projects.${index}.liveDemo`)}
                />
                {(errors.projects as any)?.[index]?.liveDemo?.message && (
                  <ErrorAlert
                    className="mt-2"
                    error={String(
                      (errors.projects as any)[index].liveDemo.message,
                    )}
                  />
                )}
              </div>
            </div>
            <Controller
              control={control}
              name={`projects.${index}.image`}
              render={({ field }) => (
                <ImageUpload
                  label="Project Photo"
                  preview={field.value?.url || ""}
                  uploadLoading={uploadingImage}
                  deleteLoading={deletingImage}
                  onChange={(file) => handleUpload(file, index, field.value)}
                  onRemove={() => handleRemove(index, field.value)}
                />
              )}
            />
            {(errors.projects as any)?.[index]?.image?.message && (
              <ErrorAlert
                className="mt-2"
                error={String((errors.projects as any)[index].image.message)}
              />
            )}
            {isUploadError && <ErrorAlert className="mt-2" error={String(uploadError.message)} />}
            {isDeleteError && <ErrorAlert className="mt-2" error={String(deleteError.message)} />}
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
