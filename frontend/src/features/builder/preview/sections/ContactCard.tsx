import type { LucideIcon } from "lucide-react";
import type { ContactConfig } from "../../templates/config";
import { cn } from "@/lib/utils";

type contactCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  href?: string;
  config: ContactConfig;
};
function ContactCard({
  icon: Icon,
  value,
  label,
  href,
  config,
}: contactCardProps) {
    const Component = href ? "a" : "div";

  return (
    <Component
      href={href}
      className={config.cardClass}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {/* ✅ Icon wrapper (styled by config) */}
      <div className={config.cardIconWrapper}>
        <Icon className={config.cardIconClass} />
      </div>

      {/* ✅ Text content */}
      <div
        className={cn(
          config.layout === "card-grid" && "flex flex-col items-center",
        )}
      >
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </p>
        <p
          className={cn(
            "font-semibold text-foreground",
            config.layout === "centered" ? "text-sm" : "text-sm md:text-base",
          )}
        >
          {value}
        </p>
      </div>
    </Component>
  );
}

export default ContactCard
