import { env } from "@/config/env";
import { FEATURES } from "@/config/features";
import { PricingCard } from "../pricing/PricingCard";
import { plans } from "../pricing/pricing.data";

function Pricing() {
console.log("MODE:", import.meta.env.MODE);
console.log("BILLING:", import.meta.env.VITE_BILLING_MODE);

  if (!env.pricingEnabled) return null;
  const isTrial = env.billingMode === "trial";
  if (FEATURES.PRICING.enabled) {
    return (
      <section id="pricing" className="py-24 bg-muted/40">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-bold">Pricing</h2>

            {isTrial && (
              <p className="mt-4 text-sm text-muted-foreground">
                🚀 Beta period — No payment required
              </p>
            )}
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                {...plan}
                disabled={isTrial && plan.id !== "free"}
                ctaLabel={
                  isTrial
                    ? plan.id === "free"
                      ? "Start Free"
                      : "Coming Soon"
                    : plan.id === "free"
                      ? "Get Started"
                      : "Upgrade Now"
                }
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24">
      {/* real pricing cards */}
    </section>
  );
}

export default Pricing;
