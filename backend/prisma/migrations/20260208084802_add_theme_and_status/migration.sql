-- CreateEnum
CREATE TYPE "PortfolioStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "status" "PortfolioStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "themeConfig" JSONB,
ALTER COLUMN "content" SET DEFAULT '{}';
