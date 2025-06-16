-- Create ClassSpellSuggestion table
CREATE TABLE "ClassSpellSuggestion" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "spellName" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassSpellSuggestion_pkey" PRIMARY KEY ("id")
);

-- Create index for faster lookups
CREATE INDEX "ClassSpellSuggestion_classId_idx" ON "ClassSpellSuggestion"("classId");

-- Add foreign key constraint
ALTER TABLE "ClassSpellSuggestion" ADD CONSTRAINT "ClassSpellSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE; 