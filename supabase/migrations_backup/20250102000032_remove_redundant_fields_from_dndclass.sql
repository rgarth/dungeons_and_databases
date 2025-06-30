-- Migration: Remove redundant fields from DndClass
ALTER TABLE "DndClass" DROP COLUMN IF EXISTS "phbDescription";
ALTER TABLE "DndClass" DROP COLUMN IF EXISTS "startingGoldFormula"; 