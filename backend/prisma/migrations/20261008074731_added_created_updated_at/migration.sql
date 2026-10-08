/*
  Warnings:

  - You are about to drop the column `order` on the `TimelineEntry` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `TimelineEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimelineEntry" DROP COLUMN "order",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
