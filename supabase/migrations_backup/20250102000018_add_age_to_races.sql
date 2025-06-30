-- Add age column to DndRace table
ALTER TABLE "DndRace" ADD COLUMN IF NOT EXISTS "age" TEXT NOT NULL DEFAULT 'Age information not available'; 