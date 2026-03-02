import { Animated } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 px-4 lg:px-10">
      {/* ── Background layers ── */}

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20
                   bg-[linear-gradient(rgba(var(--color-primary)/0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary)/0.04)_1px,transparent_1px)]                   
                   bg-size-[60px_60px]
                   mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,black_20%,transparent_100%)]"
      />

      {/* Animated gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 -z-10 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10
                   w-80 h-80 rounded-full bg-secondary/15 blur-[100px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="mx-auto max-w-4xl">
        {/* ── Main CTA card ── */}
        <div className="relative">
          {/* Gradient border wrapper */}
          <div
            className="absolute -inset-0.5 bg-linear-to-r from-primary via-secondary to-primary 
                          rounded-3xl blur-sm opacity-50 group-hover:opacity-75 transition duration-500"
          />

          {/* Inner card */}
          <div
            className="relative rounded-3xl border border-border bg-background/95 backdrop-blur-xl
                          px-8 py-12 sm:px-12 sm:py-16"
          >
            {/* Noise texture overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.015]
                         [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]
                         bg-size-[128px]"
            />

            <div className="relative text-center space-y-8">
              {/* Badge */}
              <Animated delay={0} variant="flip">
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-amber-500/30
                             bg-amber-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                  </span>
                  Join the Beta — Early Access
                </div>
              </Animated>

              {/* Headline */}
              <Animated delay={60} variant="flip">
                <h2 className="font-bold tracking-tight text-foreground text-3xl sm:text-5xl">
                  Ready to build{" "}
                  <span className="text-primary relative inline-block">
                    your story?
                    <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-linear-to-r from-primary to-transparent" />
                  </span>
                </h2>
              </Animated>

              {/* Sub-copy */}
              <Animated delay={120} variant="flip">
                <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                  Join our beta community and help shape the future of portfolio
                  building. Be among the first to create stunning portfolios in
                  under 10 minutes.
                </p>
              </Animated>

              {/* Quick wins checklist */}
              <Animated delay={180} variant="flip">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  {[
                    "Free during beta",
                    "No credit card required",
                    "Cancel anytime",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Animated>

              {/* CTA buttons */}
              <Animated delay={240} variant="flip">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="group py-6 px-8 text-base font-semibold shadow-xl shadow-primary/25 
                               hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 
                               transition-all duration-200"
                  >
                    <Link to="/signup" className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Get early access
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="px-8 py-6 text-base hover:border-primary/50 hover:text-primary 
                               hover:bg-primary/5 transition-all duration-200"
                  >
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
              </Animated>

              {/* Beta perks */}
              <Animated delay={300} variant="flip">
                <div className="pt-8 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">
                    Early Access Benefits
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 text-left">
                    <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          First Access
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Get new features before anyone else
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Shape the Product
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your feedback directly influences our roadmap
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-4 rounded-xl border border-border bg-background/60">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Locked Pricing
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Keep your beta rate when we launch
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Animated>
            </div>
          </div>
        </div>

        {/* ── Real value props below card ── */}
        <Animated delay={360} variant="flip">
          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap opacity-60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>40+ Themes</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>No Coding Required</span>
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
}

export default FinalCTA;
