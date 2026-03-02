import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { TwitterIcon } from "@/layouts/SocialIcons/TwitterIcon";
import { GitHubIcon } from "@/layouts/SocialIcons/GithubIcon";
import { LinkedInIcon } from "@/layouts/SocialIcons/LinkedInIcon";
import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import type { PortfolioContent } from "../../types";
import { useTemplateConfig } from "../../templates/config";

interface HeroProps {
  profile: PortfolioContent;
  variant?: string;
}

function Hero({ profile, variant = "default" }: HeroProps) {
  const socials = profile?.contact?.socials;
  const { firstname, lastname, role, summary } = profile?.personalInfo ?? {};
  const fullName =
    [firstname, lastname].filter(Boolean).join(" ") || "John Doe";
   const { config, isLoading } = useTemplateConfig(variant);
   const heroConfig = config?.hero;  
  
 const SocialLinks = ({ className = "" }: { className?: string }) => (
   <div className={cn("flex gap-5", heroConfig?.socialAlign, className)}>
     {socials?.twitter && (
       <a
         href={socials.twitter}
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Twitter"
         className="text-muted-foreground hover:text-primary transition-colors"
       >
         <TwitterIcon fill="currentColor" />
       </a>
     )}
     {socials?.github && (
       <a
         href={socials.github}
         target="_blank"
         rel="noopener noreferrer"
         aria-label="GitHub"
         className="text-muted-foreground hover:text-primary transition-colors"
       >
         <GitHubIcon fill="currentColor" />
       </a>
     )}
     {socials?.linkedin && (
       <a
         href={socials.linkedin}
         target="_blank"
         rel="noopener noreferrer"
         aria-label="LinkedIn"
         className="text-muted-foreground hover:text-primary transition-colors"
       >
         <LinkedInIcon fill="currentColor" />
       </a>
     )}
   </div>
 );
  if (!heroConfig|| isLoading || !config) {
    return null;
  }
  return (
    <section id="hero" className={heroConfig.section}>
      {/* Gradient background (conditional) */}
      {heroConfig.showGradient && (
        <>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,hsl(var(--primary)/0.06),transparent)]" />
        </>
      )}

      <div className={heroConfig.container}>
        <div className={heroConfig.contentWrapper}>
          {/* ✅ Side socials (Default template only) */}
          {heroConfig.showSideSocials && (
            <div className="hidden sm:flex flex-col gap-5 items-center pt-4 mt-2">
              {socials?.twitter && (
                <Animated variant="scale" delay={80}>
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    <TwitterIcon fill="currentColor" />
                  </a>
                </Animated>
              )}
              {socials?.github && (
                <Animated variant="scale" delay={160}>
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    <GitHubIcon fill="currentColor" />
                  </a>
                </Animated>
              )}
              {socials?.linkedin && (
                <Animated variant="scale" delay={240}>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    <LinkedInIcon fill="currentColor" />
                  </a>
                </Animated>
              )}
              <div className="w-px h-16 bg-border mt-1" />
            </div>
          )}

          {/* Main content */}
          <div className={heroConfig.contentArea}>
            <Animated variant="flip">
              <span className={heroConfig.badge}>Available for work</span>
            </Animated>

            <Animated variant="flip" delay={80}>
              <span className={heroConfig.greeting}>Hi, I'm</span>
            </Animated>

            <div>
              <Animated variant="flip" delay={160}>
                <h1 className={heroConfig.name}>{fullName}</h1>
              </Animated>

              <Animated variant="flip" delay={160}>
                <h2 className={heroConfig.role}>{role}</h2>
              </Animated>
            </div>

            <Animated variant="flip" delay={240}>
              <p className={heroConfig.summary}>{summary}</p>
            </Animated>

            <Animated variant="flip" delay={320}>
              <Button asChild size="lg">
                <a href="#contact">
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </Button>
            </Animated>

            {/* ✅ Socials based on position */}
            {heroConfig.socialPosition === "center" && socials && (
              <Animated variant="scale" delay={400}>
                <SocialLinks className="mt-2 items-center" />
              </Animated>
            )}

            {heroConfig.socialPosition === "bottom" && socials && (
              <Animated variant="scale" delay={400}>
                <SocialLinks className="mt-2" />
              </Animated>
            )}

            {/* Mobile socials for default template */}
            {heroConfig.showSideSocials && (
              <Animated variant="scale" delay={400}>
                <div className="flex sm:hidden gap-5 mt-2">
                  <SocialLinks />
                </div>
              </Animated>
            )}
          </div>

          {/* ✅ Avatar (Modern template) */}
          {heroConfig.showAvatar && (
            <Animated
              variant="scale"
              delay={320}
              className="order-1 md:order-2"
            >
              <div className="relative flex items-center h-full justify-center">
                {profile?.avatar?.url ? (
                  <div className="relative flex items-center justify-center">
                    {/* Glow effect (if enabled) */}
                    {(config as any).avatarGlow && (
                      <div
                        className={cn(
                          "absolute bg-primary/30 blur-2xl",
                          (config as any).avatarSize,
                          (config as any).avatarRounding || "rounded-full",
                        )}
                      />
                    )}

                    {/* Outer ring - respects shape */}
                    <div
                      className={cn(
                        "absolute border border-primary/40",
                        (config as any).avatarOuterRing ||
                          "w-80 h-80 rounded-full",
                      )}
                    />

                    {/* ✅ Avatar - square or circle based on config */}
                    <img
                      src={profile.avatar.url}
                      alt="Profile"
                      className={cn(
                        "relative object-cover border-4 border-background shadow-2xl",
                        (config as any).avatarSize || "w-72 h-72",
                        (config as any).avatarRounding || "rounded-full",
                        (config as any).avatarRingClass ||
                          "ring-4 ring-primary/20",
                      )}
                    />
                  </div>
                ) : (
                  // Fallback without avatar
                  <div
                    className={cn(
                      "relative bg-gradient-to-br from-primary/20 to-primary/5 ring-4 ring-primary/20 flex items-center justify-center shadow-2xl",
                      (config as any).avatarSize || "w-64 h-64",
                      (config as any).avatarRounding || "rounded-full",
                    )}
                  >
                    <span className="text-8xl font-bold text-primary/40">
                      {firstname?.[0]}
                      {lastname?.[0]}
                    </span>
                    {/* Decorative rings */}
                    <div
                      className={cn(
                        "absolute border-2 border-primary/20 -z-10",
                        "w-80 h-80",
                        (config as any).avatarRounding || "rounded-full",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute border border-primary/10 -z-10",
                        "w-72 h-72",
                        (config as any).avatarRounding || "rounded-full",
                      )}
                    />
                  </div>
                )}
              </div>
            </Animated>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
