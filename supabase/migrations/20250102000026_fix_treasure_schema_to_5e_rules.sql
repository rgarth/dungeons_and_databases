-- Fix Treasure table to match official D&D 5e rules
-- Regular treasures (gems, art objects) don't have rarity - only magical items do
ALTER TABLE "Treasure" DROP COLUMN IF EXISTS "rarity";
ALTER TABLE "Treasure" ALTER COLUMN "value" TYPE INTEGER USING value::integer;
ALTER TABLE "Treasure" ADD COLUMN IF NOT EXISTS "appearance" TEXT; 