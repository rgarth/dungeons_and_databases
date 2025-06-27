-- Fix Background table schema to match Prisma schema
-- Change feature from JSONB to TEXT
ALTER TABLE "Background" ALTER COLUMN "feature" TYPE TEXT USING "feature"::text;

-- Add missing featureDescription column
ALTER TABLE "Background" ADD COLUMN IF NOT EXISTS "featureDescription" TEXT NOT NULL DEFAULT '';

-- Remove toolProficiencies column (not used in Prisma schema)
ALTER TABLE "Background" DROP COLUMN IF EXISTS "toolProficiencies"; 