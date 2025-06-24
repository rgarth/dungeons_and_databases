-- Add spell level limits to ClassSpellLimits
-- This tracks the maximum spell level and spell level limits for each class at each level

ALTER TABLE "ClassSpellLimits" ADD COLUMN "maxSpellLevel" INTEGER;
ALTER TABLE "ClassSpellLimits" ADD COLUMN "spellLevelLimits" JSONB; -- Stores limits per spell level, e.g. {"1": 4, "2": 3, "3": 2}
 
-- Add comments to explain the new fields
COMMENT ON COLUMN "ClassSpellLimits"."maxSpellLevel" IS 'Maximum spell level that can be learned at this character level';
COMMENT ON COLUMN "ClassSpellLimits"."spellLevelLimits" IS 'JSON object mapping spell level to maximum number of spells of that level that can be known/prepared'; 