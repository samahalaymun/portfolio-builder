/*
  Warnings:

  - You are about to drop the column `features` on the `Template` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "templateId" SET DEFAULT 'default';

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "features",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Portfolio_templateId_idx" ON "Portfolio"("templateId");

-- CreateIndex
CREATE INDEX "Template_isActive_idx" ON "Template"("isActive");
