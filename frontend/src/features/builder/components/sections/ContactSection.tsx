import { Label } from "@/components/ui/label";
import FormSection from "../form/FormSection";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import ErrorAlert from "@/components/shared/ErrorAlert";
import type { ContentFormValues } from "../../schema";

function ContactSection() {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ContentFormValues>();
  console.log(errors);

  return (
    <div className="space-y-4">
      <FormSection
        title="Contact Information"
        description="Basic information that will appear on your portfolio."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("contact.email")}
              placeholder="john@email.com"
            />
            {errors.contact?.email && (
              <ErrorAlert error={errors.contact.email.message as string} />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...register("contact.phone")}
              placeholder="+970..."
            />
            {errors.contact?.phone && (
              <ErrorAlert error={errors.contact.phone.message as string} />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              placeholder="Location (City, Country)"
              {...register("contact.location")}
            />
            {errors.contact?.location && (
              <ErrorAlert error={errors.contact.location.message as string} />
            )}
          </div>
        </div>
      </FormSection>
      <FormSection
        title="Social Links"
        description="Add links to your professional profiles."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="GitHub URL"
            {...register("contact.socials.github")}
          />
          <Input
            placeholder="LinkedIn URL"
            {...register("contact.socials.linkedin")}
          />
          <Input
            placeholder="Twitter / X URL"
            {...register("contact.socials.twitter")}
          />
        </div>

        {errors.contact?.socials?.message && (
          <ErrorAlert error={errors.contact.socials.message as string} />
        )}
      </FormSection>
    </div>
  );
}

export default ContactSection;
