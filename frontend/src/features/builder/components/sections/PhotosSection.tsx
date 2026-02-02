import { Controller, useFormContext } from "react-hook-form";
import FormSection from "../form/FormSection";
import ImageUpload from "../form/ImageUpload";
import { imageFileToBase64 } from "@/lib/utils";

export default function PhotosSection() {
  const { control, setValue } = useFormContext();

  const onChangeAvatar = async (file: any) => {
    const base64 = await imageFileToBase64(file, {
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.8,
    });

    setValue("images.avatar", base64, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

   const onChangeCover= async (file: any) => {
     const base64 = await imageFileToBase64(file, {
       maxWidth: 400,
       maxHeight: 400,
       quality: 0.8,
     });

     setValue("images.cover", base64, {
       shouldDirty: true,
       shouldValidate: true,
     });
   };
  return (
    <FormSection
      title="Profile Images"
      description="Upload your profile photo and cover image."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="images.avatar"
          render={({ field }) => (
            <ImageUpload
              label="Profile Photo"
              preview={field.value}
              onChange={onChangeAvatar}
            />
          )}
        />

        <Controller
          control={control}
          name="images.cover"
          render={({ field }) => (
            <ImageUpload
              label="Cover Image"
              preview={field.value}
              onChange={onChangeCover}
            />
          )}
        />
      </div>
    </FormSection>
  );
}
