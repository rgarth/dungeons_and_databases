-- Add phbDescription field to Background table
ALTER TABLE "Background" ADD COLUMN IF NOT EXISTS "phbDescription" TEXT;

-- Add comment to explain the field
COMMENT ON COLUMN "Background"."phbDescription" IS 'Full PHB flavor text for the background'; 