import { Button } from "@/components/ui/button";
import { Animated } from "@/components/ui/animated";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import portfolioPreview from "@/assets/screenshots/portfolio-preview.png";
import portfolioPreviewDark from "@/assets/screenshots/portfolio-preview-dark.png";
import { useTheme } from "next-themes";
import Breadcrumbs from "../layout/Breadcrumb";
import { START_PAGE_BENEFITS } from "@/data/constants";
import { useState } from "react";

const ANIMATION_DELAYS = {
  heading: 0,
  description: 60,
  benefitsStart: 120,
  benefitsStagger: 60,
  cta: 300,
  preview: 200,
};
const breadcrumbs = [{ label: "Builder", to: "/builder/start" }, { label: "Start" }];
function StartPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const [imageError, setImageError] = useState(false);


  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      {/* Main content */}
      <div className="grid gap-12 lg:grid-cols-2 items-start py-16 px-4 md:px-10">
        {/* Left content */}
        <div className="space-y-6">
          <Animated variant="flip" delay={ANIMATION_DELAYS.heading}>
            <Heading title="Let's build your portfolio" />
          </Animated>

          <Animated variant="flip" delay={ANIMATION_DELAYS.description}>
            <p className="text-muted-foreground text-lg">
              Create a clean, modern portfolio that reflects your skills and
              experience. Customize the content, choose a theme, and publish,
              all in minutes.
            </p>
          </Animated>

          <div className="space-y-4 pt-4">
            {START_PAGE_BENEFITS.map((item, index) => (
              <Animated
                key={item.text}
                variant="flip"
                delay={
                  ANIMATION_DELAYS.benefitsStart +
                  index * ANIMATION_DELAYS.benefitsStagger
                }
              >
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span>{item.text}</span>
                </div>
              </Animated>
            ))}
          </div>

          <Animated variant="flip" delay={ANIMATION_DELAYS.cta}>
            <div className="flex flex-col gap-3 pt-6">
              <Button
                size="lg"
                onClick={() => {
                  navigate("/builder/content");
                }}
                className="w-full sm:w-auto px-8"
              >
                Start building →
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={12} />
                <span>Takes under 5 minutes</span>
              </div>
            </div>
          </Animated>
        </div>

        {/* Right - Portfolio preview */}
        <Animated variant="flip" delay={ANIMATION_DELAYS.preview}>
          <div className="relative overflow-hidden">
            {/* Glow effect */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-2xl 
                         bg-linear-to-br from-primary/20 via-transparent to-secondary/20 
                         blur-3xl opacity-60"
            />

            {/* Browser frame */}
            <div className="overflow-hidden rounded-xl border border-border max-w-md lg:max-w-none mx-auto bg-background shadow-2xl">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/60">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <div className="flex-1 ml-4 h-6 rounded-md bg-background/80 flex items-center px-3">
                  <span className="text-xs text-muted-foreground">
                    yourname.portify.io
                  </span>
                </div>
              </div>

              {/* Portfolio screenshot */}
              {!imageError ? (
                <img
                  src={
                    resolvedTheme === "dark"
                      ? portfolioPreviewDark
                      : portfolioPreview
                  }
                  alt="Portfolio preview showing a modern developer portfolio with project showcase"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground text-sm">
                    Preview unavailable
                  </p>
                </div>
              )}
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
}

export default StartPage;
