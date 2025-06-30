-- Remove traits field from DndRace table
ALTER TABLE "DndRace" DROP COLUMN IF EXISTS "traits";

-- Remove traits field from Subrace table  
ALTER TABLE "Subrace" DROP COLUMN IF EXISTS "traits"; 