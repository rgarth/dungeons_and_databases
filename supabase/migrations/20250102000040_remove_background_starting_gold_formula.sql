-- Remove startingGoldFormula from Background table
-- Backgrounds should only have fixed startingGold amounts, not formulas
-- Class startingGoldFormula is used when no equipment pack is selected

ALTER TABLE "Background" DROP COLUMN IF EXISTS "startingGoldFormula"; 