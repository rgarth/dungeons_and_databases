-- Migration: Update death saves from INTEGER to JSONB arrays
-- This allows storing individual death save results as [true, false, true] instead of counting

-- First, add new columns with the new type
ALTER TABLE "Character" ADD COLUMN "deathSaveSuccesses_new" JSONB DEFAULT '[false, false, false]';
ALTER TABLE "Character" ADD COLUMN "deathSaveFailures_new" JSONB DEFAULT '[false, false, false]';

-- Convert existing data: convert integer counts to boolean arrays
-- For example: 2 successes becomes [true, true, false]
UPDATE "Character" 
SET 
  "deathSaveSuccesses_new" = CASE 
    WHEN "deathSaveSuccesses" = 0 THEN '[false, false, false]'
    WHEN "deathSaveSuccesses" = 1 THEN '[true, false, false]'
    WHEN "deathSaveSuccesses" = 2 THEN '[true, true, false]'
    WHEN "deathSaveSuccesses" >= 3 THEN '[true, true, true]'
    ELSE '[false, false, false]'
  END,
  "deathSaveFailures_new" = CASE 
    WHEN "deathSaveFailures" = 0 THEN '[false, false, false]'
    WHEN "deathSaveFailures" = 1 THEN '[true, false, false]'
    WHEN "deathSaveFailures" = 2 THEN '[true, true, false]'
    WHEN "deathSaveFailures" >= 3 THEN '[true, true, true]'
    ELSE '[false, false, false]'
  END;

-- Drop the old columns
ALTER TABLE "Character" DROP COLUMN "deathSaveSuccesses";
ALTER TABLE "Character" DROP COLUMN "deathSaveFailures";

-- Rename the new columns to the original names
ALTER TABLE "Character" RENAME COLUMN "deathSaveSuccesses_new" TO "deathSaveSuccesses";
ALTER TABLE "Character" RENAME COLUMN "deathSaveFailures_new" TO "deathSaveFailures";

-- Add NOT NULL constraint back
ALTER TABLE "Character" ALTER COLUMN "deathSaveSuccesses" SET NOT NULL;
ALTER TABLE "Character" ALTER COLUMN "deathSaveFailures" SET NOT NULL;

-- Add check constraints to ensure arrays have exactly 3 elements
ALTER TABLE "Character" ADD CONSTRAINT "deathSaveSuccesses_array_length" 
  CHECK (jsonb_array_length("deathSaveSuccesses") = 3);

ALTER TABLE "Character" ADD CONSTRAINT "deathSaveFailures_array_length" 
  CHECK (jsonb_array_length("deathSaveFailures") = 3); 