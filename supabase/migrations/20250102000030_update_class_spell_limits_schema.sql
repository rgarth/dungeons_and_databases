-- Update ClassSpellLimits table to match API expectations
-- Drop the existing table and recreate it with the correct schema

DROP TABLE IF EXISTS "ClassSpellLimits";

CREATE TABLE "ClassSpellLimits" (
  "id" TEXT NOT NULL,
  "classId" TEXT NOT NULL,
  "level" INTEGER NOT NULL,
  "cantripsKnown" INTEGER NOT NULL,
  "spellsKnown" INTEGER NOT NULL,
  "spellcastingType" TEXT NOT NULL,
  "maxSpellLevel" INTEGER NOT NULL,
  "spellLevelLimits" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ClassSpellLimits_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraint
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add unique constraint to prevent duplicate entries
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_level_key" UNIQUE ("classId", "level");

-- Add indexes for performance
CREATE INDEX "ClassSpellLimits_classId_idx" ON "ClassSpellLimits"("classId");
CREATE INDEX "ClassSpellLimits_level_idx" ON "ClassSpellLimits"("level"); 