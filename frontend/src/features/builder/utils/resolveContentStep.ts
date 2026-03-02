import type { PortfolioContent } from "@/features/builder/types";
import { STEP_QUERY_KEY } from "@/data/constants";
import { BLOCKS_REGISTRY } from "@/features/builder/schema/blocks.registry";

const blocks = Object.values(BLOCKS_REGISTRY);

export function getMaxAllowedStep(
  content: PortfolioContent,
  sectionOrder: string[],
) {
  // نسمح بالانتقال فقط للأقسام المعبّية أو المحذوفة
  for (let i = 0; i < sectionOrder.length; i++) {
    const blockId = sectionOrder[i];
    const block = BLOCKS_REGISTRY[blockId];
    if (!block.isComplete(content)) {
      return i; // أول قسم غير مكتمل
    }
  }
  return sectionOrder.length - 1;
}

export function resolveStepFromUrl(
  search: string,
  content: PortfolioContent,
  sectionOrder: string[],
) {
  const params = new URLSearchParams(search);
  const stepParam = params.get(STEP_QUERY_KEY);
  const maxAllowedStep = getMaxAllowedStep(content, sectionOrder);

  if (stepParam === null) {
    return { step: maxAllowedStep, shouldSyncUrl: true };
  }

  const parsedStep = Number(stepParam);
  if (Number.isNaN(parsedStep)) {
    return { step: maxAllowedStep, shouldSyncUrl: true };
  }

  // إذا حاول اليوزر يروح لخطوة أكبر من المسموح، نرجعه لآخر خطوة مسموح بها
  const safeStep = Math.min(parsedStep, maxAllowedStep);

  return { step: safeStep, shouldSyncUrl: safeStep !== parsedStep };
}

