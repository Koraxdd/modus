/*
  Warnings:

  - The values [SAVED,APPLIED,INTERVIEWING,OFFER,REJECTED] on the enum `JobStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobStatus_new" AS ENUM ('saved', 'applied', 'interviewing', 'offer', 'rejected');
ALTER TABLE "public"."Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobStatus_new" USING ("status"::text::"JobStatus_new");
ALTER TYPE "JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "public"."JobStatus_old";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'saved';
COMMIT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'saved';
