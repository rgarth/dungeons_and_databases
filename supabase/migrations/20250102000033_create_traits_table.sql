-- Create traits table
CREATE TABLE IF NOT EXISTS "Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'passive',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on trait name
CREATE UNIQUE INDEX IF NOT EXISTS "Trait_name_key" ON "Trait"("name");

-- Create race_traits join table
CREATE TABLE IF NOT EXISTS "RaceTrait" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "traitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaceTrait_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on race-trait combination
CREATE UNIQUE INDEX IF NOT EXISTS "RaceTrait_raceId_traitId_key" ON "RaceTrait"("raceId", "traitId");

-- Create subrace_traits join table
CREATE TABLE IF NOT EXISTS "SubraceTrait" (
    "id" TEXT NOT NULL,
    "subraceId" TEXT NOT NULL,
    "traitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubraceTrait_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on subrace-trait combination
CREATE UNIQUE INDEX IF NOT EXISTS "SubraceTrait_subraceId_traitId_key" ON "SubraceTrait"("subraceId", "traitId");

-- Add foreign key constraints
ALTER TABLE "RaceTrait" ADD CONSTRAINT "RaceTrait_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "DndRace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "RaceTrait" ADD CONSTRAINT "RaceTrait_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Enable RLS
ALTER TABLE "Trait" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RaceTrait" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SubraceTrait" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Trait_read_policy" ON "Trait" FOR SELECT USING (true);
CREATE POLICY "RaceTrait_read_policy" ON "RaceTrait" FOR SELECT USING (true);
CREATE POLICY "SubraceTrait_read_policy" ON "SubraceTrait" FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "RaceTrait_raceId_idx" ON "RaceTrait"("raceId");
CREATE INDEX IF NOT EXISTS "RaceTrait_traitId_idx" ON "RaceTrait"("traitId");
CREATE INDEX IF NOT EXISTS "SubraceTrait_subraceId_idx" ON "SubraceTrait"("subraceId");
CREATE INDEX IF NOT EXISTS "SubraceTrait_traitId_idx" ON "SubraceTrait"("traitId"); 