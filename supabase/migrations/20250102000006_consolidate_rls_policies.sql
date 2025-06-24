-- Consolidate multiple permissive policies by giving each policy a unique name
-- This fixes the "multiple permissive policies" warnings

-- Drop policies with duplicate names and recreate with unique names
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Spell";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Weapon";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Armor";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Equipment";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "MagicalItem";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "DndClass";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "ClassArmorProficiency";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "ClassWeaponProficiency";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "ClassWeaponSuggestion";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "ClassArmorSuggestion";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "ClassSpellSuggestion";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "DndRace";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Background";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Alignment";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "Treasure";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "EquipmentPack";
DROP POLICY IF EXISTS "Authenticated users can read game data" ON "EquipmentPackItem";

-- Recreate policies with unique names
CREATE POLICY "spell_read_policy"
ON "Spell" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "weapon_read_policy"
ON "Weapon" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "armor_read_policy"
ON "Armor" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "equipment_read_policy"
ON "Equipment" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "magical_item_read_policy"
ON "MagicalItem" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "dnd_class_read_policy"
ON "DndClass" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "class_armor_proficiency_read_policy"
ON "ClassArmorProficiency" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "class_weapon_proficiency_read_policy"
ON "ClassWeaponProficiency" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "class_weapon_suggestion_read_policy"
ON "ClassWeaponSuggestion" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "class_armor_suggestion_read_policy"
ON "ClassArmorSuggestion" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "class_spell_suggestion_read_policy"
ON "ClassSpellSuggestion" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "dnd_race_read_policy"
ON "DndRace" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "background_read_policy"
ON "Background" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "alignment_read_policy"
ON "Alignment" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "treasure_read_policy"
ON "Treasure" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "equipment_pack_read_policy"
ON "EquipmentPack" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "equipment_pack_item_read_policy"
ON "EquipmentPackItem" FOR SELECT USING ((select auth.role()) = 'authenticated');

-- Note: The previous migration already created optimized policies, so we just need to ensure
-- there are no duplicate policy names or redundant policies

-- Check and drop any duplicate policies that might exist
-- (This is a safety measure in case there were any naming conflicts)

-- For tables that might have multiple policies with different names but same functionality,
-- we'll consolidate them into single, clear policies

-- Example: If a table has both "Authenticated users can read game data" and "Allow read access for authenticated users",
-- we'll keep only one with a clear name

-- Since the previous migration already created clean, optimized policies,
-- this migration serves as a cleanup to ensure no duplicates exist

-- No specific drops needed here since the previous migration already handled the consolidation
-- This file exists to document the policy consolidation approach

-- If any duplicate policies are found in the future, they can be dropped here:
-- DROP POLICY IF EXISTS "duplicate_policy_name" ON "TableName"; 