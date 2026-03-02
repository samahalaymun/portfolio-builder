import { Animated } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatItem from "./StatItem";
import MockPortfolioCard from "./MockPortfolioCard";

function HeroSection() {
   
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-border bg-background">
      {/* ── Grid background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20
                   bg-[linear-gradient(rgba(var(--color-primary)/0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary)/0.04)_1px,transparent_1px)]
                   bg-size-[56px_56px]
                   mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]"
      />

      {/* ── Top-left glow blob (original shape preserved) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl animate-pulse sm:-top-80"
      >
        <div
          style={{ clipPath: "polygon(...)" }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-md
               -translate-x-1/2 rotate-30
               bg-linear-to-tr from-secondary to-primary opacity-25
               sm:left-[calc(50%-30rem)] sm:w-6xl"
        />
      </div>

      {/* ── Bottom-right glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 -z-10
                   h-64 w-64 rounded-full bg-primary/20 blur-[100px] animate-pulse"
      />

      {/* ── Top-left accent glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 -z-10
                   h-72 w-72 rounded-full bg-secondary/15 blur-[90px] animate-pulse"
      />

      {/* ── Main layout: text left + card right ── */}
      <div
        className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-10 py-28 sm:py-36
                      flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
      >
        {/* ── Left: copy ── */}
        <div className="flex-1  flex flex-col items-start justify-start gap-6 max-w-2xl">
          {/* Badge */}
          {/* <Animated variant="slide" direction="left" delay={60}>
            <span
              className="inline-flex items-center gap-2 rounded-full
                             border border-primary/30 bg-primary/8
                             px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI-Powered Portfolio Builder
            </span>
          </Animated> */}
          <Animated variant="slide" direction="left" delay={60}>
            <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-2">
              {/* Primary: Beta badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                Early Access Beta
              </span>

              {/* Secondary: Feature highlight */}
              <span className="text-xs text-muted-foreground">
                Join 100+ testers shaping the future
              </span>
            </div>
          </Animated>
          {/* Headline */}
          <Animated variant="slide" direction="left" delay={140}>
            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Build your{" "}
              <span className="text-primary relative inline-block">
                story.
                {/* Underline accent */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.75
                                 rounded-full bg-linear-to-r from-primary to-transparent"
                />
              </span>
              <br />
              In minutes.
            </h1>
          </Animated>

          {/* Sub-copy */}
          <Animated variant="slide" direction="left" delay={220}>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-light max-w-lg">
              Create a portfolio that gets you hired, beautiful themes,
              AI-powered content, live in under 10 minutes.
            </p>
          </Animated>

          {/* CTA buttons */}
          <Animated variant="slide" direction="left" delay={300}>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                asChild
                className="sm:px-8 px-6 md:text-2xl text-lg shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link to="/builder/start">Start building for free →</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="sm:px-8 px-6 md:text-2xl text-lg hover:border-primary/50 hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                <a href="#themes">Browse themes</a>
              </Button>
            </div>
          </Animated>

          {/* Stats row */}
          <Animated variant="slide" direction="left" delay={380}>
            <div className="flex flex-wrap gap-8 pt-6 border-t border-border w-full">
              <StatItem value="100%" label="Free to start" />
              <StatItem value="10+" label="Premium themes" />
              <StatItem value="<10m" label="Avg. time to launch" />
            </div>
          </Animated>
        </div>

        {/* ── Right: floating mock card ── */}
        <div className="hidden lg:block  w-95 shrink-0">
          <Animated variant="slide" direction="right" className="" delay={200}>
            <MockPortfolioCard />
          </Animated>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
