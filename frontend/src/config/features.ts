export const FEATURES = {
  PRICING: {
    enabled: import.meta.env.VITE_FEATURE_PRICING === "true",
    showUI: import.meta.env.VITE_FEATURE_PRICING_UI === "true",
  },
};
