import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  price: number;
  description: string;
  features: string[];
  disabled?: boolean;
  ctaLabel: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  disabled,
  ctaLabel,
}: Props) {
  return (
    <div className="rounded-xl border p-6 bg-background flex flex-col">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>

      <div className="my-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-muted-foreground"> / month</span>
      </div>

      <ul className="space-y-2 mb-6 text-sm">
        {features.map((f) => (
          <li key={f}>✔ {f}</li>
        ))}
      </ul>

      <Button disabled={disabled} className="mt-auto">
        {ctaLabel}
      </Button>
    </div>
  );
}
