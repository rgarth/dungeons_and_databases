-- Migrate legacy character format to new multiclass format
-- This migration converts all characters from the old class/level format to the new classes/totalLevel format
-- After this migration, we can remove all legacy format handling code

-- Update characters that don't have the new multiclass fields set
UPDATE "Character" 
SET 
  "classes" = jsonb_build_array(
    jsonb_build_object(
      'class', "class",
      'level', "level",
      'subclass', COALESCE("subclass", null)
    )
  ),
  "totalLevel" = "level"
WHERE 
  "classes" IS NULL 
  OR "classes" = 'null'::jsonb 
  OR jsonb_array_length("classes") = 0;

-- Add comment to document the migration
COMMENT ON TABLE "Character" IS 'All characters now use the new multiclass format (classes/totalLevel). Legacy format (class/level) is deprecated.'; 