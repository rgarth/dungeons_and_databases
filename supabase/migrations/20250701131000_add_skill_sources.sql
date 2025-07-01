-- Add skillSources field to Character table to track skill origins
-- This allows us to distinguish between class skills, background skills, racial skills, etc.

ALTER TABLE public."Character" 
ADD COLUMN "skillSources" jsonb DEFAULT '{}'::jsonb;

-- Add comment to document the field
COMMENT ON COLUMN public."Character"."skillSources" IS 'JSON object mapping skill names to their source (class, background, racial, feat, other)';

-- Create index for better query performance when filtering by skill source
CREATE INDEX idx_character_skill_sources ON public."Character" USING gin ("skillSources"); 