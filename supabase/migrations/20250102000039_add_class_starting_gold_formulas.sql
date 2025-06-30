-- Add starting gold formulas to classes
-- These are the official D&D 5e starting gold formulas when not taking equipment packs

ALTER TABLE "DndClass" ADD COLUMN "startingGoldFormula" TEXT;

-- Update classes with their starting gold formulas
UPDATE "DndClass" SET "startingGoldFormula" = '2d4*10' WHERE name = 'Barbarian';
UPDATE "DndClass" SET "startingGoldFormula" = '5d4*10' WHERE name = 'Bard';
UPDATE "DndClass" SET "startingGoldFormula" = '5d4*10' WHERE name = 'Cleric';
UPDATE "DndClass" SET "startingGoldFormula" = '2d4*10' WHERE name = 'Druid';
UPDATE "DndClass" SET "startingGoldFormula" = '5d4*10' WHERE name = 'Fighter';
UPDATE "DndClass" SET "startingGoldFormula" = '5d4' WHERE name = 'Monk';
UPDATE "DndClass" SET "startingGoldFormula" = '5d4*10' WHERE name = 'Paladin';
UPDATE "DndClass" SET "startingGoldFormula" = '5d4*10' WHERE name = 'Ranger';
UPDATE "DndClass" SET "startingGoldFormula" = '4d4*10' WHERE name = 'Rogue';
UPDATE "DndClass" SET "startingGoldFormula" = '3d4*10' WHERE name = 'Sorcerer';
UPDATE "DndClass" SET "startingGoldFormula" = '4d4*10' WHERE name = 'Warlock';
UPDATE "DndClass" SET "startingGoldFormula" = '4d4*10' WHERE name = 'Wizard'; 