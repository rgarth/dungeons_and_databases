-- Add startingGoldFormula to DndClass table
ALTER TABLE "DndClass" ADD COLUMN "startingGoldFormula" TEXT;

-- Add startingGoldFormula to Background table  
ALTER TABLE "Background" ADD COLUMN "startingGoldFormula" TEXT;

-- Update existing classes with their starting gold formulas
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

-- Update existing backgrounds with their starting gold formulas (most are null)
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Acolyte';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Criminal';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Folk Hero';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Noble';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Sage';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Soldier';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Spy';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Entertainer';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Guild Artisan';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Hermit';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Outlander';
UPDATE "Background" SET "startingGoldFormula" = NULL WHERE name = 'Sailor'; 