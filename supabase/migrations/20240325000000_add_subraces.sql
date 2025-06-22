-- Create Subrace table
CREATE TABLE "Subrace" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT UNIQUE NOT NULL,
  "raceId" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "abilityScoreIncrease" TEXT NOT NULL,
  "traits" JSONB NOT NULL,
  "languages" JSONB,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key relationship to DndRace
ALTER TABLE "Subrace" ADD CONSTRAINT "Subrace_raceId_fkey" 
  FOREIGN KEY ("raceId") REFERENCES "DndRace"("id") ON DELETE CASCADE;

-- Add index for performance
CREATE INDEX "Subrace_raceId_idx" ON "Subrace"("raceId");

-- Insert subrace data
INSERT INTO "Subrace" ("name", "raceId", "description", "abilityScoreIncrease", "traits", "languages") VALUES
-- Elf subraces
('High Elf', (SELECT "id" FROM "DndRace" WHERE "name" = 'Elf'), 'High elves value scholarship and the pursuit of magical knowledge. They are often found in libraries and universities.', 'Intelligence +1', '["Elf Weapon Training", "Cantrip", "Extra Language"]', '["One extra language of your choice"]'),
('Wood Elf', (SELECT "id" FROM "DndRace" WHERE "name" = 'Elf'), 'Wood elves are reclusive, living in small communities in the depths of forests. They are attuned to nature and magic.', 'Wisdom +1', '["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"]', NULL),
('Drow', (SELECT "id" FROM "DndRace" WHERE "name" = 'Elf'), 'Drow are dark elves who live in the Underdark. They are known for their cruelty and their worship of Lolth.', 'Charisma +1', '["Superior Darkvision", "Sunlight Sensitivity", "Drow Magic", "Drow Weapon Training"]', NULL),

-- Dwarf subraces
('Hill Dwarf', (SELECT "id" FROM "DndRace" WHERE "name" = 'Dwarf'), 'Hill dwarves are the most common dwarves. They are known for their toughness and their love of ale and gold.', 'Wisdom +1', '["Dwarven Toughness"]', NULL),
('Mountain Dwarf', (SELECT "id" FROM "DndRace" WHERE "name" = 'Dwarf'), 'Mountain dwarves are the most martial of dwarves. They are known for their skill with weapons and armor.', 'Strength +2', '["Dwarven Armor Training"]', NULL),

-- Halfling subraces
('Lightfoot Halfling', (SELECT "id" FROM "DndRace" WHERE "name" = 'Halfling'), 'Lightfoot halflings are stealthy and quick. They are known for their ability to hide and their love of comfort.', 'Charisma +1', '["Naturally Stealthy"]', NULL),
('Stout Halfling', (SELECT "id" FROM "DndRace" WHERE "name" = 'Halfling'), 'Stout halflings are hardier than other halflings. They are known for their resistance to poison and their love of food.', 'Constitution +1', '["Stout Resilience"]', NULL),

-- Gnome subraces
('Forest Gnome', (SELECT "id" FROM "DndRace" WHERE "name" = 'Gnome'), 'Forest gnomes are reclusive and shy. They are known for their ability to communicate with small animals.', 'Dexterity +1', '["Natural Illusionist", "Speak with Small Beasts"]', NULL),
('Rock Gnome', (SELECT "id" FROM "DndRace" WHERE "name" = 'Gnome'), 'Rock gnomes are inventive and curious. They are known for their tinkering and their love of gadgets.', 'Constitution +1', '["Artificer''s Lore", "Tinker"]', NULL),

-- Tiefling subraces
('Asmodeus Tiefling', (SELECT "id" FROM "DndRace" WHERE "name" = 'Tiefling'), 'Tieflings with the blood of Asmodeus are the most common. They are known for their infernal heritage.', 'Intelligence +1', '["Infernal Legacy"]', NULL),
('Baalzebul Tiefling', (SELECT "id" FROM "DndRace" WHERE "name" = 'Tiefling'), 'Tieflings with the blood of Baalzebul are known for their cunning and their ability to manipulate others.', 'Intelligence +1', '["Infernal Legacy"]', NULL),
('Mephistopheles Tiefling', (SELECT "id" FROM "DndRace" WHERE "name" = 'Tiefling'), 'Tieflings with the blood of Mephistopheles are known for their magical prowess and their fiery nature.', 'Intelligence +1', '["Infernal Legacy"]', NULL),

-- Aasimar subraces
('Protector Aasimar', (SELECT "id" FROM "DndRace" WHERE "name" = 'Aasimar'), 'Protector aasimar are touched by the power of good. They are known for their healing abilities.', 'Wisdom +1', '["Radiant Soul", "Healing Hands"]', NULL),
('Scourge Aasimar', (SELECT "id" FROM "DndRace" WHERE "name" = 'Aasimar'), 'Scourge aasimar are touched by the power of justice. They are known for their ability to punish evil.', 'Constitution +1', '["Radiant Consumption", "Healing Hands"]', NULL),
('Fallen Aasimar', (SELECT "id" FROM "DndRace" WHERE "name" = 'Aasimar'), 'Fallen aasimar have turned away from their celestial heritage. They are known for their dark powers.', 'Strength +1', '["Necrotic Shroud", "Healing Hands"]', NULL);

-- Add subrace column to Character table
ALTER TABLE "Character" ADD COLUMN "subrace" TEXT;

-- Add foreign key relationship to Subrace
ALTER TABLE "Character" ADD CONSTRAINT "Character_subrace_fkey" 
  FOREIGN KEY ("subrace") REFERENCES "Subrace"("name") ON DELETE SET NULL; 