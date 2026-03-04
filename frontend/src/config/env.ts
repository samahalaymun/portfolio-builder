export const env = {
  isDev: import.meta.env.MODE === "development",
  pricingEnabled: import.meta.env.VITE_PRICING_ENABLED === "true",
  billingMode: import.meta.env.VITE_BILLING_MODE as "trial" | "paid",
};
