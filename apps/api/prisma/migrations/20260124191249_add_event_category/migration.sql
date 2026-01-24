-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('CONCERT', 'THEATRE', 'KIDS', 'OTHER');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "category" "EventCategory" NOT NULL DEFAULT 'OTHER';
