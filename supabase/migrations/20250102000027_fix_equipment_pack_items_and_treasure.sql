-- Fix EquipmentPackItem table to have proper relation to Equipment
-- Add equipmentId column to EquipmentPackItem
ALTER TABLE "EquipmentPackItem" ADD COLUMN IF NOT EXISTS "equipmentId" TEXT;

-- Create foreign key constraint to Equipment table
ALTER TABLE "EquipmentPackItem" 
ADD CONSTRAINT "EquipmentPackItem_equipmentId_fkey" 
FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE;

-- Add index for performance
CREATE INDEX IF NOT EXISTS "EquipmentPackItem_equipmentId_idx" ON "EquipmentPackItem"("equipmentId");

-- Fix Treasure table - ensure it has the correct schema
-- Remove category column if it exists (it was causing errors)
ALTER TABLE "Treasure" DROP COLUMN IF EXISTS "category";

-- Ensure Treasure table has the correct columns based on Prisma schema
ALTER TABLE "Treasure" ALTER COLUMN "value" TYPE INTEGER USING value::integer;
ALTER TABLE "Treasure" ADD COLUMN IF NOT EXISTS "appearance" TEXT;

-- Add unique constraints (PostgreSQL doesn't support IF NOT EXISTS for constraints)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Treasure_name_key') THEN
        ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_name_key" UNIQUE ("name");
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Equipment_name_key') THEN
        ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_name_key" UNIQUE ("name");
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'EquipmentPack_name_key') THEN
        ALTER TABLE "EquipmentPack" ADD CONSTRAINT "EquipmentPack_name_key" UNIQUE ("name");
    END IF;
END $$; 