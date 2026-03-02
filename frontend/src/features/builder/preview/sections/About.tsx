import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, DownloadIcon, Mail, MapPin } from "lucide-react";
import Container from "../layout/Container";
import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import type { PortfolioContent } from "../../types";
import {
  useTemplateConfig,
} from "../../templates/config";

interface AboutProps {
  profile: PortfolioContent;
  variant?: string;
  id: string;
}

function About({ profile, id, variant = "default" }: AboutProps) {
  const { config, isLoading } = useTemplateConfig(variant);
  const aboutConfig = config?.about;
  if (!aboutConfig || isLoading || !config) {
    return null;
  }
  return (
    <Container id={id} variant={variant}>
      {/* Section heading */}
      <Animated variant="flip">
        <div
          className={cn(
            "flex flex-col gap-2 mb-12",
            aboutConfig.headingAlign === "center"
              ? "items-center text-center"
              : "items-start",
          )}
        >
          <span className={aboutConfig.badge}>Who I am</span>
          <h2 className={aboutConfig.title}>About Me</h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-1" />
        </div>
      </Animated>

      <div className={aboutConfig.grid}>
        {/* ✅ Avatar - position based on  */}
        {aboutConfig.showAvatar && (
          <Animated
            variant="scale"
            className={cn(
              aboutConfig.avatarColumn,
              // aboutConfig.avatarPosition === "right" && "order-2",
            )}
          >
            <div
              className={cn(
                "relative flex items-center justify-center",
                aboutConfig.textColumn,
              )}
            >
              {profile?.avatar?.url ? (
                <>
                  {/* Decorative shapes (adapt to avatar shape) */}
                  {aboutConfig.showDecorations && (
                    <>
                      <div
                        className={cn(
                          "absolute border-2 border-primary/20",
                          aboutConfig.avatarOuter,
                        )}
                      />
                      <div
                        className={cn(
                          "absolute border border-primary/10",
                          aboutConfig.avatarMiddle,
                        )}
                      />
                    </>
                  )}
                  <img
                    alt="Profile"
                    src={profile?.avatar?.url}
                    className={cn(aboutConfig.avatarClass, aboutConfig.avatarInner)}
                  />
                </>
              ) : (
                // Fallback (no avatar) - also respect shape
                <div
                  className={cn(
                    "bg-muted ring-4 ring-primary/20 flex items-center justify-center shadow-xl",
                    aboutConfig.avatarInner,
                    // ✅ Use same rounding as avatarInner
                    aboutConfig.avatarShape === "square"
                      ? "rounded-2xl"
                      : "rounded-full",
                  )}
                >
                  <span className="text-5xl font-bold text-muted-foreground/30">
                    {profile?.personalInfo?.firstname?.[0]}
                    {profile?.personalInfo?.lastname?.[0]}
                  </span>
                </div>
              )}
            </div>
          </Animated>
        )}

        {/* Text content */}
        <div
          className={cn(
            "flex flex-col gap-6",
            aboutConfig.textColumn,
            aboutConfig.avatarPosition === "right" && "order-1",
          )}
        >
          <Animated variant="flip" delay={80}>
            <div
              className={aboutConfig.text}
              dangerouslySetInnerHTML={{ __html: profile?.about ?? "" }}
            />
          </Animated>

          {/* ✅ Info pills (conditional) */}
          {aboutConfig.showInfoPills && profile?.personalInfo?.role && (
            <Animated variant="flip" delay={160}>
              <div className="flex flex-wrap gap-2">
                <p className={aboutConfig.pillStyle}>
                  <BriefcaseBusiness size={12} /> {profile.personalInfo.role}
                </p>
                {profile?.contact?.location && (
                  <p className={aboutConfig.pillStyle}>
                    <MapPin size={12} /> {profile.contact.location}
                  </p>
                )}
                {profile?.contact?.email && (
                  <p className={aboutConfig.pillStyle}>
                    <Mail size={12} /> {profile.contact.email}
                  </p>
                )}
              </div>
            </Animated>
          )}

          {profile?.personalInfo.cvUrl && (
            <Animated variant="flip" delay={240}>
              <Button asChild size="lg" className="w-fit">
                <a
                  href={profile?.personalInfo.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download CV
                  <DownloadIcon className="w-4 h-4" />
                </a>
              </Button>
            </Animated>
          )}
        </div>
      </div>
    </Container>
  );
}

export default About;
