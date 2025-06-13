/*
  Warnings:

  - You are about to drop the column `racialTraits` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `racialTrait` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "racialTraits";

-- DropTable
DROP TABLE "racialTrait";
