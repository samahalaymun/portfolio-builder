import { Animated } from "@/components/ui/animated";
import Container from "../layout/Container";
import ExperienceTimeline from "./ExperienceTimeline";
import EducationTimeline from "./EducationTimeline";
import { cn } from "@/lib/utils";
import {
  useTemplateConfig,
} from "../../templates/config";

interface QualificationProps {
  profile: any;
  variant?: string;
  id: string;
  order: string[];
}

function Qualification({
  profile,
  order,
  id,
  variant = "default",
}: QualificationProps) {
  const hasExperience =
    order.includes("experience") && profile?.experience?.length;
  const hasEducation =
    order.includes("education") && profile?.education?.length;
  const { config, isLoading } = useTemplateConfig(variant);
  const qualificationConfig = config?.qualification;

  if (!hasExperience && !hasEducation) return null;
  if (!qualificationConfig || isLoading || !config) {
    return null;
  }
  return (
    <Container id={id} variant={variant}>
      {/* Section heading */}
      <Animated variant="flip">
        <div
          className={cn(
            "flex flex-col gap-2 mb-14",
            qualificationConfig.headingAlign === "center"
              ? "items-center text-center"
              : "items-start",
          )}
        >
          <span className={qualificationConfig.badge}>My Journey</span>
          <h2 className={qualificationConfig.title}>Qualification</h2>
          <p className={qualificationConfig.subtitle}>
            My professional and academic background
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mt-1" />
        </div>
      </Animated>

      {/* Grid based on config */}
      <div
        className={
          qualificationConfig.splitColumns && hasExperience && hasEducation
            ? qualificationConfig.grid
            : qualificationConfig.singleColumn
        }
      >
        {hasExperience && (
          <ExperienceTimeline
            data={profile.experience}
            config={qualificationConfig}
          />
        )}
        {hasEducation && (
          <EducationTimeline
            data={profile.education}
            config={qualificationConfig}
          />
        )}
      </div>
    </Container>
  );
}

export default Qualification;
