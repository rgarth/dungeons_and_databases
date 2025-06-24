-- Add performance indexes for slow queries

-- Index for MagicalItem queries (most expensive at 2.8% of total time)
CREATE INDEX IF NOT EXISTS idx_magical_item_name ON "public"."MagicalItem" ("name");

-- Index for Background queries (2.7% of total time)
CREATE INDEX IF NOT EXISTS idx_background_name ON "public"."Background" ("name");

-- Index for Treasure queries (2.0% of total time)
CREATE INDEX IF NOT EXISTS idx_treasure_name ON "public"."Treasure" ("name");

-- Index for Character queries by userId (1.8% of total time)
CREATE INDEX IF NOT EXISTS idx_character_user_id ON "public"."Character" ("userId");

-- Index for Character queries by updatedAt for ordering
CREATE INDEX IF NOT EXISTS idx_character_updated_at ON "public"."Character" ("updatedAt" DESC);

-- Composite index for Character queries with userId and updatedAt
CREATE INDEX IF NOT EXISTS idx_character_user_updated ON "public"."Character" ("userId", "updatedAt" DESC);

-- Index for Equipment queries by id (for IN clause lookups)
CREATE INDEX IF NOT EXISTS idx_equipment_id ON "public"."Equipment" ("id");

-- Index for Spell queries by name (for lookups)
CREATE INDEX IF NOT EXISTS idx_spell_name ON "public"."Spell" ("name");

-- Index for Character queries by id (for updates/deletes)
CREATE INDEX IF NOT EXISTS idx_character_id ON "public"."Character" ("id"); 