import { Controller, useFormContext } from "react-hook-form";
import FormSection from "../form/FormSection";
import ImageUpload from "../form/ImageUpload";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export default function PhotosSection() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
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
  const {
    mutateAsync: deleteMutation,
    isPending: deletingImage,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: async (publicId: string) => {
      await api.delete("/upload/image", {
        data: { publicId },
      });
    },
  });
  async function handleUpload(file: File, currentAvatar?: any) {
    if (currentAvatar?.publicId) {
      await deleteMutation(currentAvatar.publicId);
    }
    const image = await uploadMutation(file);
    setValue("avatar", image, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  async function handleRemove(currentAvatar?: any) {
    if (!currentAvatar?.publicId) return;

    await deleteMutation(currentAvatar.publicId);
    setValue("avatar", undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  return (
    <FormSection
      title="Profile Images"
      description="Upload your profile photo and cover image."
    >
      <div>
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <ImageUpload
              label="Profile Photo"
              preview={field.value?.url || ""}
              uploadLoading={uploadingImage}
              deleteLoading={deletingImage}
              onChange={(file) => handleUpload(file, field.value)}
              onRemove={() => handleRemove(field.value)}
            />
          )}
        />
        {errors?.avatar?.message && (
          <ErrorAlert
            className="mt-2"
            error={String(errors?.avatar?.message)}
          />
        )}
        {isUploadError && (
          <ErrorAlert className="mt-2" error={String(uploadError.message)} />
        )}
        {isDeleteError && (
          <ErrorAlert className="mt-2" error={String(deleteError.message)} />
        )}
      </div>
    </FormSection>
  );
}
