-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "racialTraits" JSONB;

-- CreateIndex
CREATE INDEX "Character_userId_idx" ON "Character"("userId");
