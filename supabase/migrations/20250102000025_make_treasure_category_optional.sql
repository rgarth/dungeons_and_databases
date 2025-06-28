-- Make category field optional in Treasure table since it's redundant with value field
ALTER TABLE "Treasure" ALTER COLUMN "category" DROP NOT NULL; 