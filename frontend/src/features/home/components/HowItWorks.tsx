import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
const steps = [
  {
    label: "Choose a theme",
    description:
      "Browse professionally designed themes and pick the one that fits your style.",
  },
  {
    label: "Add your content",
    description:
      "Fill in your information, projects, and experience, powered by AI.",
  },
  {
    label: "Publish your portfolio",
    description: "Go live instantly and share your portfolio with the world.",
  },
];
function HowItWorks() {
  return (
    <section id="how-it-works" className="space-y-12">
      <div className="flex items-center justify-center flex-col gap-2 mb-16">
        <Animated delay={0} variant="flip">
          <h2 className=" font-semibold text-center">How it works</h2>
        </Animated>
        <Animated delay={0} variant="flip">
          <p className="text-muted-foreground  text-center">
            A simple, three-step journey to get your Portfolio up and running
            quickly.
          </p>
        </Animated>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, i) => (
          <Animated delay={i * 80} key={step.label + i} variant="flip">
            <div
              className={cn(
                "relative z-10 text-center md:text-left pt-6 md:pe-10 lg:py-0 pb-10 last:pb-0 last:pe-0",
                i !== steps.length - 1 &&
                  "md:border-r-2 md:border-dashed md:border-border",
              )}
            >
              <div className="w-10 h-10 rounded-full border border-border bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto md:mx-0 mb-4">
                {i + 1}
              </div>
              <h4 className="font-semibold mb-2">{step.label}</h4>
              <p className="text-muted-foreground max-w-xs mx-auto md:mx-0">
                {step.description}
              </p>
            </div>
          </Animated>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
