import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import { Palette, Rocket, Sparkles } from "lucide-react";
const steps = [
  {
    icon: Palette,
    label: "Choose a theme",
    description:
      "Browse professionally designed themes and pick the one that fits your style.",
    accent: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: Sparkles,
    label: "Add your content",
    description:
      "Fill in your information, projects, and experience — powered by AI.",
    accent: "from-secondary/20 to-secondary/5",
    iconBg: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: Rocket,
    label: "Publish your portfolio",
    description: "Go live instantly and share your portfolio with the world.",
    accent: "from-primary/15 to-secondary/10",
    iconBg: "bg-primary/10 text-primary border-primary/20",
  },
];
function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-16">
      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-3 text-center">
        <Animated delay={0} variant="flip">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Process
          </span>
        </Animated>
        <Animated delay={60} variant="flip">
          <h2 className="font-bold tracking-tight text-foreground">
            Three steps.
            <span className="text-primary ">That's genuinely it.</span>
          </h2>
        </Animated>
        <Animated delay={120} variant="flip">
          <p className="text-muted-foreground max-w-md mx-auto">
            A simple journey to get your portfolio up and running in under 10
            minutes.
          </p>
        </Animated>
      </div>

      {/* ── Steps grid ── */}
      <div className="grid md:grid-cols-3 gap-4 lg:gap-6 relative">
        {/* Dashed connector line (desktop only) */}
        <div
          aria-hidden
          className="hidden md:block absolute top-13 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px
                     border-t-2 border-dashed border-border z-0"
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Animated delay={i * 100} key={step.label} variant="flip">
              <div
                className={cn(
                  "group relative z-10 flex flex-col gap-5 rounded-2xl border border-border bg-card",
                  "p-6 lg:p-8 transition-all duration-300",
                  "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
                )}
              >
                {/* Ghost number */}
                <span
                  aria-hidden
                  className="absolute top-4 right-5 font-extrabold text-6xl leading-none
                             text-foreground/4 select-none group-hover:text-foreground/[0.07]
                             transition-colors duration-300"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Step number badge + icon row */}
                <div className="flex items-center gap-3">
                  {/* Numbered circle */}
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
                      "transition-transform duration-300 group-hover:scale-110",
                      step.iconBg,
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    {step.label}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom gradient accent */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl",
                    "bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    step.accent,
                  )}
                />
              </div>
            </Animated>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;
