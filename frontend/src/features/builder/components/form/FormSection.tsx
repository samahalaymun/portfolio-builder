import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FormSection({ title, description, children }: Props) {
  return (
    <section className="rounded-sm border border-border bg-background p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="space-y-1">
        <h4 className="font-semibold">{title}</h4>
        {description && (
          <p className=" text-muted-foreground">{description}</p>
        )}
      </div>
       
      {children}
    </section>
  );
}
