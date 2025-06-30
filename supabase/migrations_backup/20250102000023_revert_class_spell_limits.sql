-- Revert ClassSpellLimits table to its original working schema
DROP TABLE IF EXISTS "ClassSpellLimits";

CREATE TABLE "ClassSpellLimits" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "spellLevel" INTEGER NOT NULL,
    "maxSpells" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSpellLimits_pkey" PRIMARY KEY ("id")
); 