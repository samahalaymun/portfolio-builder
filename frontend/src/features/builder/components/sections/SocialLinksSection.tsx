import { useFormContext } from "react-hook-form";
import FormSection from "../form/FormSection";
import { Input } from "@/components/ui/input";

export default function SocialLinksSection() {
  const { register } = useFormContext();

  return (
    <FormSection
      title="Social Links"
      description="Add links to your professional profiles."
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="GitHub URL"
          {...register("socials.github")}
        />
        <Input
          placeholder="LinkedIn URL"
          {...register("socials.linkedin")}
        />
        <Input
          placeholder="Twitter / X URL"
          {...register("socials.twitter")}
        />
      </div>
    </FormSection>
  );
}
