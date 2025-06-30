-- Fix ClassSpellLimits table schema to match Prisma schema
-- Drop the old table and recreate it with the correct schema
DROP TABLE IF EXISTS "ClassSpellLimits";

CREATE TABLE "ClassSpellLimits" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "cantripsKnown" INTEGER NOT NULL DEFAULT 0,
    "spellsKnown" INTEGER NOT NULL DEFAULT 0,
    "spellcastingType" TEXT NOT NULL,
    "maxSpellLevel" INTEGER,
    "spellLevelLimits" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSpellLimits_pkey" PRIMARY KEY ("id")
);

-- Add unique constraint and indexes
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_level_key" UNIQUE ("classId", "level");
CREATE INDEX "ClassSpellLimits_classId_idx" ON "ClassSpellLimits"("classId");
CREATE INDEX "ClassSpellLimits_level_idx" ON "ClassSpellLimits"("level"); 