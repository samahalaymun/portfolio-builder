import { Button } from "@/components/ui/button";
import { Animated } from "@/components/ui/animated";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import portfolioPreview from "@/assets/screenshots/portfolio-preview.png";
import portfolioPreviewDark from "@/assets/screenshots/portfolio-preview-dark.png";
import { useTheme } from "next-themes";
import Breadcrumbs from "../layout/Breadcrumb";

const benefits = [
  "Modern, developer-focused themes",
  "Smart content editing with AI",
  "Instant preview & one-click publish",
];
const breadcrumbs = [{ label: "Builder" }, { label: "Start" }];
function StartPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Breadcrumbs items={breadcrumbs} className="ml-14 lg:ml-0" />
      <div className=" grid gap-12 lg:grid-cols-2 items-start py-16 px-4 md:px-10 ">
        {/* Left content */}
        <div>
          <Heading title=" Let’s build your portfolio" />
          <Animated variant="flip">
            <p className="text-muted-foreground text-lg mb-10">
              Create a clean, modern portfolio that reflects your skills and
              experience. Customize the content, choose a theme, and publish,
              all in minutes.
            </p>
          </Animated>

          <div className="space-y-4 mb-12">
            {benefits.map((item, index) => (
              <Animated variant="flip" delay={index * 80}>
                <p
                  key={item}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  {item}
                </p>
              </Animated>
            ))}
          </div>

          <Animated variant="flip">
            <div className="flex  flex-col  gap-2">
              <Button
                className="w-auto"
                size="lg"
                onClick={() => navigate("/builder/theme")}
              >
                Start building
              </Button>

              <span className="text-sm text-muted-foreground">
                Takes under 5 minutes
              </span>
            </div>
          </Animated>
        </div>

        {/* Right image / illustration */}
        <Animated variant="flip">
          <div className="relative">
            {/* glow */}
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-linear-to-br from-primary/20 via-transparent to-secondary/20 blur-2xl" />

            {/* browser frame */}
            <div className="overflow-hidden rounded-xl border bg-background shadow-xl">
              {/* browser header */}
              <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              {/* screenshot */}
              <img
                src={
                  resolvedTheme === "dark"
                    ? portfolioPreviewDark
                    : portfolioPreview
                }
                alt="Portfolio preview"
                className="w-full object-cover"
              />
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
}

export default StartPage;
