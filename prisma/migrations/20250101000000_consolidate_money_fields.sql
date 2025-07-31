-- Consolidate money fields: copy data from old fields to new fields
-- This migration ensures all money data is in the *Pieces fields

-- Step 1: Copy data from old fields to new fields where new fields are null/0
UPDATE "Character" 
SET 
  "copperPieces" = CASE 
    WHEN "copperPieces" IS NULL OR "copperPieces" = 0 THEN "copper" 
    ELSE "copperPieces" 
  END,
  "silverPieces" = CASE 
    WHEN "silverPieces" IS NULL OR "silverPieces" = 0 THEN "silver" 
    ELSE "silverPieces" 
  END,
  "goldPieces" = CASE 
    WHEN "goldPieces" IS NULL OR "goldPieces" = 0 THEN "gold" 
    ELSE "goldPieces" 
  END
WHERE "copper" > 0 OR "silver" > 0 OR "gold" > 0;

-- Step 2: Ensure new fields are not null (set to 0 if still null)
UPDATE "Character" 
SET 
  "copperPieces" = COALESCE("copperPieces", 0),
  "silverPieces" = COALESCE("silverPieces", 0),
  "goldPieces" = COALESCE("goldPieces", 0)
WHERE "copperPieces" IS NULL OR "silverPieces" IS NULL OR "goldPieces" IS NULL; 