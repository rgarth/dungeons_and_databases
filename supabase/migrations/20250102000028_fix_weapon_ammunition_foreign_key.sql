-- Fix Weapon table foreign key constraint for ammunitionTypeId
-- First, ensure the ammunition_type_id column exists and is the right type
ALTER TABLE "Weapon" ALTER COLUMN "ammunition_type_id" TYPE INTEGER USING ammunition_type_id::integer;

-- Drop the existing foreign key constraint if it exists (it might be broken)
ALTER TABLE "Weapon" DROP CONSTRAINT IF EXISTS "Weapon_ammunition_type_id_fkey";

-- Create the correct foreign key constraint
ALTER TABLE "Weapon" 
ADD CONSTRAINT "Weapon_ammunition_type_id_fkey" 
FOREIGN KEY ("ammunition_type_id") REFERENCES "ammunition_suggestions"("id") ON DELETE SET NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS "Weapon_ammunition_type_id_idx" ON "Weapon"("ammunition_type_id"); 