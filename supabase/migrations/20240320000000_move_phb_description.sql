-- Add phbDescription column to DndClass table
ALTER TABLE "DndClass"
ADD COLUMN "phbDescription" TEXT;

-- Copy phbDescription from ClassWeaponSuggestion to DndClass
-- We use DISTINCT to get one copy per class
UPDATE "DndClass" c
SET "phbDescription" = (
  SELECT DISTINCT "phbDescription"
  FROM "ClassWeaponSuggestion" s
  WHERE s."classId" = c.id
  LIMIT 1
);

-- Remove phbDescription column from ClassWeaponSuggestion
ALTER TABLE "ClassWeaponSuggestion"
DROP COLUMN "phbDescription"; 