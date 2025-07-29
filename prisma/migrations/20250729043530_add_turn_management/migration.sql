-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "current_participant_id" TEXT,
ADD COLUMN     "current_turn" INTEGER,
ADD COLUMN     "round" INTEGER DEFAULT 1,
ADD COLUMN     "turn_order" JSONB;
