-- Add Ki point tracking for Monks
-- Ki points = monk level, reset on short rest

ALTER TABLE "Character" ADD COLUMN "kiPoints" INTEGER DEFAULT 0;
ALTER TABLE "Character" ADD COLUMN "usedKiPoints" INTEGER DEFAULT 0;

-- Add comment explaining the fields
COMMENT ON COLUMN "Character"."kiPoints" IS 'Total ki points available (equal to monk level)';
COMMENT ON COLUMN "Character"."usedKiPoints" IS 'Ki points spent this short rest (resets on short rest)';

-- Create index for performance
CREATE INDEX IF NOT EXISTS "Character_kiPoints_idx" ON "Character"("kiPoints");
CREATE INDEX IF NOT EXISTS "Character_usedKiPoints_idx" ON "Character"("usedKiPoints"); 