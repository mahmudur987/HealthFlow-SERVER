/*
  Warnings:

  - You are about to drop the column `doctorId` on the `schedules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."schedules" DROP CONSTRAINT "schedules_doctorId_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "doctorId";
