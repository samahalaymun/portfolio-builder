import { Animated } from "@/components/ui/animated";
import type { Feature } from "@/types";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Layout,
  Code,
  Settings,
} from "lucide-react";
import BuilderVisual from "./BuilderVisual";
import AiVisual from "./AiVisual";
import PerformanceVisual from "./PerformanceVisual";
import FeatureCard from "./FeatureCard";

 const features: Feature[] = [
  {
    icon: Layout,
    title: "Visual Page Builder",
    description:
      "Drag, drop, rearrange. Build and customize your portfolio visually with a clean, intuitive interface, no code required.",
    size: "hero",
    visual: <BuilderVisual />,
  },
  {
    icon: Sparkles,
    title: "AI Content Assistant",
    description:
      "Paste your resume, AI writes your bio, project descriptions, and skills section automatically.",
    size: "tall",
    visual: <AiVisual />,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for speed with lightweight components and a 98/100 Lighthouse score out of the box.",
    size: "default",
    visual: <PerformanceVisual />,
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description: "Best-practice security and data protection baked in from day one.",
    size: "default",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "Clean, scalable components built with modern React and Tailwind CSS. Export your code anytime.",
    size: "default",
  },
  {
    icon: Settings,
    title: "Highly Customizable",
    description: "Adapt every color, font, layout, and interaction to match your personal brand.",
    size: "default",
  },
];


function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 px-4 lg:px-10 bg-secondary/50"
    >
      {/* Background grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[linear-gradient(rgba(var(--color-primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary)/0.03)_1px,transparent_1px)]
                  bg-size-[48px_48px]"
      />

      {/* Radial fade over grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
                   [background:radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_40%,hsl(var(--secondary)/0.5)_100%)]"
      />

      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Animated delay={0} variant="flip">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30
                             bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Why choose us
            </span>
          </Animated>
          <Animated delay={60} variant="flip">
            <h2 className="font-bold tracking-tight text-foreground">
              Everything you need{" "}
              <span className="text-primary relative inline-block">
                to build faster.
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.75 rounded-full
                                 bg-linear-to-r from-primary to-transparent"
                />
              </span>
            </h2>
          </Animated>
          <Animated delay={120} variant="flip">
            <p className="mt-4 text-muted-foreground">
              Powerful features designed to help you build, customize, and ship
              your portfolio with confidence.
            </p>
          </Animated>
        </div>

        {/* ── Bento grid ── */}
        <div
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        auto-rows-auto lg:auto-rows-[minmax(180px,auto)]"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
