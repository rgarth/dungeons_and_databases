-- Remove rarity field from Treasure table to match Prisma schema
ALTER TABLE "Treasure" DROP COLUMN IF EXISTS "rarity"; 