import { Animated } from "@/components/ui/animated";
import Container from "../layout/Container";
import type { PortfolioContent } from "../../types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useTemplateConfig,
} from "../../templates/config";
interface SkillsProps {
  profile: PortfolioContent;
  variant?: string;
  id: string;
}
function Skills({ profile, id, variant = "default" }: SkillsProps) {
  const skills: string[] = profile?.skills ?? [];
  const { config, isLoading } = useTemplateConfig(variant);
  const skillsConfig = config?.skills;

  if (!skills.length || !config || isLoading || !skillsConfig) return null;

  return (
    <Container id={id} variant={variant}>
      {/* Section heading */}
      <Animated variant="flip">
        <div
          className={cn(
            "flex flex-col gap-2 mb-14",
            skillsConfig.headingAlign === "center"
              ? "items-center text-center"
              : "items-start",
          )}
        >
          <span className={skillsConfig.badge}>What I work with</span>
          <h2 className={skillsConfig.title}>Skills</h2>
          <p className={skillsConfig.subtitle}>
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mt-1" />
        </div>
      </Animated>

      {/* Skills grid */}
      <div className={skillsConfig.grid}>
        {skills.map((skill, index) => (
          <Animated key={skill} variant="scale" delay={index * 40}>
            <div className={skillsConfig.itemClass}>
              {/* ✅ Shine effect (modern template) */}
              {skillsConfig.showShine && (
                <div className={skillsConfig.shineClass} />
              )}

              {/* ✅ Bullet/Icon (conditional) */}
              {skillsConfig.showBullet && (
                <span className={skillsConfig.bulletClass}>
                  {skillsConfig.bulletIcon ? (
                    <Check className="w-3 h-3 text-primary" />
                  ) : null}
                </span>
              )}

              {/* ✅ Skill text */}
              <span className={skillsConfig.textClass}>{skill}</span>
            </div>
          </Animated>
        ))}
      </div>
    </Container>
  );
}

export default Skills;
