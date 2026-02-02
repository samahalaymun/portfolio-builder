import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSection from "../form/FormSection";
import ErrorAlert from "../form/ErrorAlert";

function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="john@email.com"
          />
          {errors?.email?.message && (
            <ErrorAlert error={String(errors.email.message)} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} placeholder="+970..." />
          {errors?.phone?.message && (
            <ErrorAlert error={String(errors.phone.message)} />
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            placeholder="Location (City, Country)"
            {...register("location")}
          />
          {errors?.location?.message && (
            <ErrorAlert error={String(errors.location.message)} />
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
    </FormSection>
  );
}

export default PersonalInfoSection;
