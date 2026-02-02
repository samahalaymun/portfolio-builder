import { Animated } from "@/components/ui/animated";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Layout,
  Code,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Visual Page Builder",
    description:
      "Build and customize pages visually with a clean and intuitive interface.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "Clean, scalable components built with modern React and Tailwind CSS.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "Optimized for speed with lightweight components and smart rendering.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description: "Best practices for security and data protection baked in.",
  },
  {
    icon: Settings,
    title: "Highly Customizable",
    description: "Easily adapt styles, layouts, and behavior to your needs.",
  },
  {
    icon: Sparkles,
    title: "Modern UI",
    description: "Clean and professional design that feels modern and premium.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-4 lg:px-10 bg-secondary">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Animated delay={0} variant="flip">
            <span className="font-medium text-primary">Why choose us</span>
          </Animated>
          <Animated delay={0} variant="flip">
            <h2 className="mt-2  font-semibold tracking-tight">
              Everything you need to build faster
            </h2>
          </Animated>
          <Animated delay={0} variant="flip">
            <p className="mt-4 text-muted-foreground">
              Powerful features designed to help you build, customize, and ship
              your product with confidence.
            </p>
          </Animated>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Animated delay={index * 80} variant="flip">
              <div
                key={feature.title}
                className="rounded-2xl border bg-background p-6 transition hover:border-primary/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-6 font-medium">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
