import { PortfolioContent } from "src/types/portfolio-content";

export function normalizeContent(content: unknown): PortfolioContent {
  if (content && typeof content === 'object' && !Array.isArray(content)) {
    return content as PortfolioContent;
  }
  return {};
}
