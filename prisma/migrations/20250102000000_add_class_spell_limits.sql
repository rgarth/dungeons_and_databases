-- CreateTable
CREATE TABLE "ClassSpellLimits" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "cantripsKnown" INTEGER NOT NULL DEFAULT 0,
    "spellsKnown" INTEGER NOT NULL DEFAULT 0,
    "spellcastingType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSpellLimits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassSpellLimits_classId_level_key" ON "ClassSpellLimits"("classId", "level");

-- CreateIndex
CREATE INDEX "ClassSpellLimits_classId_idx" ON "ClassSpellLimits"("classId");

-- CreateIndex
CREATE INDEX "ClassSpellLimits_level_idx" ON "ClassSpellLimits"("level");

-- AddForeignKey
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE; 