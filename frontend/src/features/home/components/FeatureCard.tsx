import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types";

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const isHero = feature.size === "hero";
  const isTall = feature.size === "tall";

  return (
    <Animated delay={index * 70} variant="flip">
      <div
        className={cn(
          "group relative flex flex-col rounded-2xl border border-border bg-background overflow-hidden",
          "transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
          isHero && "md:col-span-2 md:row-span-2",
          isTall && "md:row-span-2",
          !isHero && !isTall ? "p-6" : "p-7",
        )}
      >
        {/* Shimmer on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--color-primary) / 0.04), transparent 40%)",
          }}
        />

        {/* Top gradient accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center rounded-xl border border-border bg-primary/8 text-primary shrink-0",
            "transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/30 group-hover:scale-110",
            isHero ? "w-12 h-12" : "w-10 h-10",
          )}
        >
          <Icon className={cn(isHero ? "w-6 h-6" : "w-5 h-5")} />
        </div>

        {/* Text */}
        <div className={cn("flex flex-col gap-2", isHero ? "mt-5" : "mt-4")}>
          <h3
            className={cn(
              "font-semibold text-foreground",
              isHero ? "text-xl" : "text-base",
            )}
          >
            {feature.title}
          </h3>
          <p
            className={cn(
              "text-muted-foreground leading-relaxed",
              isHero ? "text-base max-w-sm" : "text-sm",
            )}
          >
            {feature.description}
          </p>
        </div>

        {/* Visual preview */}
        {feature.visual && (
          <div
            className={cn(
              "mt-6 w-full",
              isTall && "flex-1 flex flex-col justify-end",
            )}
          >
            {feature.visual}
          </div>
        )}

        {/* Ghost icon watermark for small cards */}
        {!isHero && !isTall && (
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-4 -right-4 opacity-[0.04]
                                      group-hover:opacity-[0.07] transition-opacity duration-300"
          >
            <Icon className="w-24 h-24 text-primary" />
          </div>
        )}
      </div>
    </Animated>
  );
}
export default FeatureCard;
