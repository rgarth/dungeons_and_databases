-- Migration: Add startingGold field to Background table
-- This adds the starting gold amount for each background according to D&D 5e rules

ALTER TABLE "Background" ADD COLUMN "startingGold" INTEGER NOT NULL DEFAULT 0;

-- Update existing backgrounds with correct starting gold values
UPDATE "Background" SET "startingGold" = 15 WHERE "name" = 'Acolyte';
UPDATE "Background" SET "startingGold" = 15 WHERE "name" = 'Criminal';
UPDATE "Background" SET "startingGold" = 10 WHERE "name" = 'Folk Hero';
UPDATE "Background" SET "startingGold" = 25 WHERE "name" = 'Noble';
UPDATE "Background" SET "startingGold" = 10 WHERE "name" = 'Sage';
UPDATE "Background" SET "startingGold" = 10 WHERE "name" = 'Soldier';
UPDATE "Background" SET "startingGold" = 15 WHERE "name" = 'Charlatan';
UPDATE "Background" SET "startingGold" = 15 WHERE "name" = 'Entertainer';
UPDATE "Background" SET "startingGold" = 15 WHERE "name" = 'Guild Artisan';
UPDATE "Background" SET "startingGold" = 5 WHERE "name" = 'Hermit';
UPDATE "Background" SET "startingGold" = 10 WHERE "name" = 'Outlander';
UPDATE "Background" SET "startingGold" = 10 WHERE "name" = 'Sailor'; 