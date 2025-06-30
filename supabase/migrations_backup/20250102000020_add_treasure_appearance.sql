-- Add appearance column to Treasure table
ALTER TABLE "Treasure" ADD COLUMN IF NOT EXISTS "appearance" TEXT;
ALTER TABLE "Treasure" ADD COLUMN IF NOT EXISTS "category" TEXT; 