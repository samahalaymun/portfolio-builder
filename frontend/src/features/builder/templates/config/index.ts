import { useEffect, useState } from "react";
import type { TemplateConfig } from "./types";

// ✅ Re-export types
export type {
  TemplateConfig,
  HeaderConfig,
  HeroConfig,
  AboutConfig,
  QualificationConfig,
  SkillsConfig,
  ProjectsConfig,
  ContactConfig,
  ContainerConfig,
} from "./types";

/**
 * 🔥 Template dynamic loaders (code splitting happens here)
 */
const configLoaders: Record<string, () => Promise<TemplateConfig>> = {
  default: async () => (await import("./default.config")).defaultConfig,
  minimal: async () => (await import("./minimal.config")).minimalConfig,
  modern: async () => (await import("./modern.config")).modernConfig,
};

/**
 * 🔥 In-memory cache (prevents re-downloading same config)
 */
const configCache = new Map<string, TemplateConfig>();

/**
 * Loads template config lazily with caching
 */
export async function getTemplateConfig(variant: string): Promise<TemplateConfig> {
  const validVariant: string = variant in configLoaders ? variant : "default";

  // Return from cache if already loaded
  if (configCache.has(validVariant)) {
    return configCache.get(validVariant)!;
  }

  const config = await configLoaders[validVariant]();
  configCache.set(validVariant, config);

  return config;
}

/**
 * React hook for loading template config
 * Handles async + caching safely
 */
export function useTemplateConfig(variant: string): {
  config: TemplateConfig | null;
  isLoading: boolean;
} {
  const [config, setConfig] = useState<TemplateConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    setIsLoading(true);

    getTemplateConfig(variant).then((loadedConfig) => {
      if (!mounted) return;
      setConfig(loadedConfig);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [variant]);

  return { config, isLoading };
}
