-- Add spell limits to classes for character creation
-- These represent the number of spells each class can choose at level 1

ALTER TABLE "DndClass" ADD COLUMN "level1Cantrips" INTEGER;
ALTER TABLE "DndClass" ADD COLUMN "level1Spells" INTEGER;
ALTER TABLE "DndClass" ADD COLUMN "spellcastingType" TEXT; -- 'known', 'prepared', 'spellbook', 'none'

-- Update existing classes with their spell limits based on D&D 5e rules
UPDATE "DndClass" SET 
  "level1Cantrips" = 3,
  "level1Spells" = 6,
  "spellcastingType" = 'spellbook'
WHERE name = 'Wizard';

UPDATE "DndClass" SET 
  "level1Cantrips" = 3,
  "level1Spells" = 0, -- Clerics know all 1st-level spells
  "spellcastingType" = 'prepared'
WHERE name = 'Cleric';

UPDATE "DndClass" SET 
  "level1Cantrips" = 2,
  "level1Spells" = 0, -- Druids know all 1st-level spells
  "spellcastingType" = 'prepared'
WHERE name = 'Druid';

UPDATE "DndClass" SET 
  "level1Cantrips" = 4,
  "level1Spells" = 2,
  "spellcastingType" = 'known'
WHERE name = 'Bard';

UPDATE "DndClass" SET 
  "level1Cantrips" = 4,
  "level1Spells" = 2,
  "spellcastingType" = 'known'
WHERE name = 'Sorcerer';

UPDATE "DndClass" SET 
  "level1Cantrips" = 2,
  "level1Spells" = 2,
  "spellcastingType" = 'known'
WHERE name = 'Warlock';

UPDATE "DndClass" SET 
  "level1Cantrips" = 0,
  "level1Spells" = 0, -- Paladins know all 1st-level spells
  "spellcastingType" = 'prepared'
WHERE name = 'Paladin';

-- Non-spellcasting classes
UPDATE "DndClass" SET 
  "level1Cantrips" = 0,
  "level1Spells" = 0,
  "spellcastingType" = 'none'
WHERE name IN ('Barbarian', 'Fighter', 'Monk', 'Rogue');

-- Ranger gets spells at level 2, so level 1 has none
UPDATE "DndClass" SET 
  "level1Cantrips" = 0,
  "level1Spells" = 0,
  "spellcastingType" = 'known'
WHERE name = 'Ranger'; 