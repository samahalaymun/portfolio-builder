/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE INDEX "Portfolio_slug_idx" ON "Portfolio"("slug");

-- CreateIndex
CREATE INDEX "Portfolio_isPublished_idx" ON "Portfolio"("isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
