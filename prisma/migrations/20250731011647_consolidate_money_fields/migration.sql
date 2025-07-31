/*
  Warnings:

  - You are about to drop the column `copper` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `gold` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `silver` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "copper",
DROP COLUMN "gold",
DROP COLUMN "silver";

-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "dice_roll_log" JSONB,
ADD COLUMN     "show_dm_rolls" BOOLEAN NOT NULL DEFAULT false;
