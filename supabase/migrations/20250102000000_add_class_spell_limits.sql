-- Add ClassSpellLimits table to store spell limits by class and level
CREATE TABLE IF NOT EXISTS "ClassSpellLimits" (
  "id" TEXT NOT NULL,
  "classId" TEXT NOT NULL,
  "level" INTEGER NOT NULL,
  "cantripsKnown" INTEGER NOT NULL DEFAULT 0,
  "spellsKnown" INTEGER NOT NULL DEFAULT 0,
  "spellcastingType" TEXT NOT NULL, -- 'known', 'prepared', 'spellbook', 'none'
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ClassSpellLimits_pkey" PRIMARY KEY ("id")
);

-- Add unique constraint to prevent duplicate entries for same class/level
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_level_key" UNIQUE ("classId", "level");

-- Add foreign key constraint
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create index for efficient lookups
CREATE INDEX "ClassSpellLimits_classId_idx" ON "ClassSpellLimits"("classId");
CREATE INDEX "ClassSpellLimits_level_idx" ON "ClassSpellLimits"("level"); 