import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useTemplateConfig } from "../../templates/config";

function Container({
  id,
  children,
  className,
  variant = "default",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: string;
}) {
  const { config, isLoading } = useTemplateConfig(variant);
  if (isLoading || !config) return null;

  const containerConfig = config.container;
  return (
    <section id={id} className={cn(containerConfig.section, className)}>
      <div className={containerConfig.inner}>{children}</div>
    </section>
  );
}

export default Container;
