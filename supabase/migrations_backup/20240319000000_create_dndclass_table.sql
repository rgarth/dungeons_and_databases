-- Create DndClass table early so all later migrations can reference it
CREATE TABLE IF NOT EXISTS "DndClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hitDie" INTEGER NOT NULL,
    "primaryAbility" TEXT NOT NULL,
    "savingThrows" JSONB NOT NULL,
    "skillChoices" JSONB NOT NULL,
    "phbDescription" TEXT,
    "startingGoldFormula" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DndClass_pkey" PRIMARY KEY ("id")
); 