import { Layout, Sparkles, Zap } from 'lucide-react';
import BrandingPanelLogo from './BrandingPanelLogo';

function BrandingPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-secondary/30 border-r border-border relative overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10
bg-[linear-gradient(rgba(var(--color-primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary)/0.03)_1px,transparent_1px)]                     bg-size-[48px_48px]"
      />

      {/* Gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/4 -z-10
                     w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse"
      />

      {/* Logo */}
      <div>
      <BrandingPanelLogo/>
      </div>
      {/* Value props */}
      <div className="space-y-8 max-w-md">
        <div>
          <h2 className="font-bold text-3xl text-foreground mb-3">
            Build your portfolio{" "}
            <span className="text-primary">in minutes.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join 12,000+ developers and designers who launched their
            professional portfolio with Portify.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { icon: Sparkles, text: "AI-powered content generation" },
            { icon: Layout, text: "40+ professional themes" },
            { icon: Zap, text: "Live in under 10 minutes" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20
                                  flex items-center justify-center shrink-0"
                >
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3 pt-8 border-t border-border">
        <div className="flex -space-x-2">
          {[
            "from-primary to-secondary",
            "from-secondary to-accent",
            "from-accent to-primary",
          ].map((gradient, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 border-secondary bg-linear-to-br ${gradient}`}
            />
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            12,000+ creators
          </p>
          <p className="text-xs text-muted-foreground">Already shipped</p>
        </div>
      </div>
    </div>
  );
}

export default BrandingPanel
