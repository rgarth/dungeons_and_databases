-- Fix RLS performance by wrapping auth functions in SELECT statements
-- This prevents auth functions from being evaluated for every row

-- Drop existing policies that have performance issues
DROP POLICY IF EXISTS "Users can manage their own accounts" ON "Account";
DROP POLICY IF EXISTS "Users can manage their own sessions" ON "Session";
DROP POLICY IF EXISTS "Users can manage their own user data" ON "User";
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
DROP POLICY IF EXISTS "Users can manage their own custom weapons" ON "CustomWeapon";
DROP POLICY IF EXISTS "Users can manage their own characters" ON "Character";
DROP POLICY IF EXISTS "Service role can manage all data" ON "Account";
DROP POLICY IF EXISTS "Service role can manage all data" ON "Session";
DROP POLICY IF EXISTS "Service role can manage all data" ON "User";

-- Recreate policies with optimized auth function calls
CREATE POLICY "Users can manage their own accounts"
ON "Account"
USING ((select auth.uid()) = "userId"::uuid);

CREATE POLICY "Users can manage their own sessions"
ON "Session"
USING ((select auth.uid()) = "userId"::uuid);

CREATE POLICY "Users can manage their own user data"
ON "User"
USING ((select auth.uid()) = id::uuid);

-- Create optimized policies for game data tables (read-only for authenticated users)
CREATE POLICY "Authenticated users can read game data"
ON "Spell" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "Weapon" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "Armor" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "Equipment" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "MagicalItem" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "DndClass" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "ClassArmorProficiency" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "ClassWeaponProficiency" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "ClassWeaponSuggestion" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "ClassArmorSuggestion" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "ClassSpellSuggestion" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "DndRace" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "Background" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "Alignment" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "Treasure" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "EquipmentPack" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can read game data"
ON "EquipmentPackItem" FOR SELECT USING ((select auth.role()) = 'authenticated');

-- Create optimized policies for user-specific data
CREATE POLICY "Users can manage their own custom weapons"
ON "CustomWeapon"
USING ((select auth.uid()) = "creatorId"::uuid);

CREATE POLICY "Users can manage their own characters"
ON "Character"
USING ((select auth.uid()) = "userId"::uuid);

-- Create optimized policies for service role (needed for NextAuth.js)
CREATE POLICY "Service role can manage all data"
ON "Account" USING ((select auth.role()) = 'service_role');

CREATE POLICY "Service role can manage all data"
ON "Session" USING ((select auth.role()) = 'service_role');

CREATE POLICY "Service role can manage all data"
ON "User" USING ((select auth.role()) = 'service_role'); 