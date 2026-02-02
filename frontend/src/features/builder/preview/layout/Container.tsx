import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Container({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("w-full py-10", className)}>
      <div className="lg:px-10 px-4  mx-auto sm:w-125 md:w-175 lg:w-225">{children}</div>
    </section>
  );
}

export default Container;
