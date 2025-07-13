-- Add game notes fields to Game model
ALTER TABLE "public"."Game" 
ADD COLUMN "gameNotes" TEXT,
ADD COLUMN "dmNotes" TEXT;

-- Add comments to explain the fields
COMMENT ON COLUMN "public"."Game"."gameNotes" IS 'Game notes visible to all players';
COMMENT ON COLUMN "public"."Game"."dmNotes" IS 'DM-only notes not visible to players'; 