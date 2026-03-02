import { Animated } from "@/components/ui/animated";
import {
  Sparkles,
  Target,
  Users,
  Zap,
  Heart,
  Code,
  Palette,
  Rocket,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ── Stats Data ───────────────────────────────────────────────────────────────
const stats = [
  { value: "10+", label: "Professional themes" },
  { value: "<10m", label: "Setup time" },
  { value: "100%", label: "Free to start" },
];

// ── Values Data ──────────────────────────────────────────────────────────────
const values = [
  {
    icon: Sparkles,
    title: "AI-First",
    description:
      "We believe technology should empower creativity, not replace it. Our AI assists, you create.",
  },
  {
    icon: Users,
    title: "Built for Creators",
    description:
      "Every feature is designed with real developers, designers, and job seekers in mind.",
  },
  {
    icon: Heart,
    title: "Obsessed with Quality",
    description:
      "From pixel-perfect themes to blazing-fast load times, we sweat the details you'll love.",
  },
];

const ourStory = [
  {
    icon: Lightbulb,
    phase: "The Problem",
    description:
      "Building a portfolio takes hours of coding or expensive designers. We knew there had to be a better way.",
  },
  {
    icon: Sparkles,
    phase: "The Solution",
    description:
      "We built Portify, an AI-powered builder that creates professional portfolios in under 10 minutes. No coding required.",
  },
  {
    icon: Users,
    phase: "Early Access",
    description:
      "We're currently in beta, testing with our first users. Join us early and help shape the future of portfolio building.",
  },
  {
    icon: Rocket,
    phase: "What's Next",
    description:
      "Custom domains, team collaboration, advanced analytics, and more themes based on your feedback.",
  },
];

// ── Team Data (Optional - adjust as needed) ──────────────────────────────────
const team = [
  {
    name: "Samah Abu Laymun",
    role: "Founder & Creator",
    avatar: "from-primary to-secondary",
    bio: "Building tools that help people tell their stories.",
  },
  // Add more team members as needed
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-secondary/30 border-b border-border py-20 sm:py-32">
        {/* Background grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
                     bg-[linear-gradient(rgba(var(--color-primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary)/0.03)_1px,transparent_1px)]
                     bg-size-[56px_56px]
                     mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_20%,transparent_100%)]"
        />

        {/* Gradient orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/4 -z-10
                     w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 -z-10
                     w-80 h-80 rounded-full bg-secondary/15 blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-4xl mx-auto px-4 lg:px-10 text-center space-y-8">
          <Animated delay={0} variant="flip">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30
                             bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              About Portify
            </span>
          </Animated>

          <Animated delay={60} variant="flip">
            <h1 className="font-bold tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl">
              We're building the{" "}
              <span className="text-primary relative inline-block">
                fastest way
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full
                                 bg-linear-to-r from-primary to-transparent"
                />
              </span>
              <br />
              to showcase your work.
            </h1>
          </Animated>

          <Animated delay={120} variant="flip">
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Portify started from a simple frustration: building a portfolio
              shouldn't take weeks. Today, we help thousands of creators go from
              idea to published portfolio in under 10 minutes.
            </p>
          </Animated>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 px-4 lg:px-10 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Animated key={stat.label} delay={index * 60} variant="flip">
                <div className="text-center space-y-2">
                  <div className="font-bold text-4xl sm:text-5xl text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section className="py-24 px-4 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <Animated delay={0} variant="flip">
                <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
              </Animated>

              <Animated delay={60} variant="flip">
                <h2 className="font-bold text-3xl sm:text-4xl text-foreground">
                  Empowering creators to tell their stories.
                </h2>
              </Animated>

              <Animated delay={120} variant="flip">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We believe everyone deserves a beautiful, professional
                    portfolio, not just those with design skills or hours of
                    free time.
                  </p>
                  <p>
                    That's why we built Portify: to remove every barrier between
                    you and a portfolio you're proud to share. AI handles the
                    heavy lifting. You focus on what matters: your work.
                  </p>
                  <p>
                    Whether you're landing your first job, pivoting careers, or
                    showcasing decades of experience, we're here to help you
                    shine.
                  </p>
                </div>
              </Animated>

              <Animated delay={180} variant="flip">
                <Button asChild size="lg" className="mt-4">
                  <Link to="/signup">Start Your Portfolio →</Link>
                </Button>
              </Animated>
            </div>

            {/* Right: Visual */}
            <Animated delay={100} variant="flip">
              <div className="relative">
                {/* Decorative grid of cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[Code, Palette, Rocket, Zap].map((Icon, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-card p-6
                                 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5
                                 hover:-translate-y-1 transition-all duration-300"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20
                                      flex items-center justify-center mb-4"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
                        <div className="h-2 w-1/2 rounded-full bg-foreground/7" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Glow effect */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 -z-10
                            bg-linear-to-br from-primary/10 to-secondary/10 blur-3xl opacity-50"
                />
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="py-24 px-4 lg:px-10 bg-secondary/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <Animated delay={0} variant="flip">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Values
              </span>
            </Animated>
            <Animated delay={60} variant="flip">
              <h2 className="font-bold text-3xl sm:text-4xl text-foreground">
                What drives us every day.
              </h2>
            </Animated>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Animated key={value.title} delay={index * 80} variant="flip">
                  <div
                    className="rounded-2xl border border-border bg-background p-8
                                  hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5
                                  transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20
                                    flex items-center justify-center mb-6
                                    group-hover:scale-110 transition-transform"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Animated>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 lg:px-10 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <Animated delay={0} variant="flip">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
            </Animated>
            <Animated delay={60} variant="flip">
              <h2 className="font-bold text-3xl sm:text-4xl text-foreground">
                Building the future of{" "}
                <span className="text-primary">portfolio creation.</span>
              </h2>
            </Animated>
            <Animated delay={120} variant="flip">
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're on a mission to help creators, developers, and designers
                showcase their work beautifully, without the hassle.
              </p>
            </Animated>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              aria-hidden
              className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-primary via-primary/50 to-transparent hidden sm:block"
            />

            <div className="space-y-8">
              {ourStory.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Animated key={item.phase} delay={index * 80} variant="flip">
                    <div className="relative flex gap-6 sm:gap-8 group">
                      {/* Icon badge */}
                      <div
                        className="shrink-0 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary
                                  flex items-center justify-center text-primary
                                  shadow-lg shadow-primary/20 relative z-10
                                  group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground
                                  transition-all duration-300"
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div
                          className="rounded-2xl border border-border bg-background p-6
                                    hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                                    hover:-translate-y-1 transition-all duration-300"
                        >
                          <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                            {item.phase}
                            {item.phase === "Early Access" && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
                                Beta
                              </span>
                            )}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Animated>
                );
              })}
            </div>
          </div>

          {/* CTA at the bottom */}
          <Animated delay={320} variant="flip">
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-6 rounded-2xl border border-primary/30 bg-primary/5">
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-foreground mb-1">
                    Join us on this journey
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Be part of building the best portfolio platform for
                    creators.
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold
                           hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5
                           transition-all duration-200 whitespace-nowrap"
                >
                  Get early access →
                </Link>
              </div>
            </div>
          </Animated>
        </div>
      </section>

      {/* ── Team Section (Optional) ── */}
      <section className="py-24 px-4 lg:px-10 bg-secondary/20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <Animated delay={0} variant="flip">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                The Team
              </span>
            </Animated>
            <Animated delay={60} variant="flip">
              <h2 className="font-bold text-3xl sm:text-4xl text-foreground">
                Built by creators, for creators.
              </h2>
            </Animated>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Animated key={member.name} delay={index * 80} variant="flip">
                <div
                  className="rounded-2xl border border-border bg-background p-8 text-center
                                hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5
                                transition-all duration-300"
                >
                  <div
                    className={`w-24 h-24 rounded-full bg-linear-to-br ${member.avatar} mx-auto mb-4
                                   ring-4 ring-background shadow-lg`}
                  />
                  <h3 className="font-semibold text-xl text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-4">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 lg:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Animated delay={0} variant="flip">
            <h2 className="font-bold text-3xl sm:text-5xl text-foreground">
              Ready to build your story?
            </h2>
          </Animated>

          <Animated delay={60} variant="flip">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of creators who chose Portify to showcase their
              work and land their next opportunity.
            </p>
          </Animated>

          <Animated delay={120} variant="flip">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="px-8 shadow-lg shadow-primary/20"
              >
                <Link to="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </Animated>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
