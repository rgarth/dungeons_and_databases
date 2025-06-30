-- Enable Row Level Security for all tables
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Spell" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Weapon" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CustomWeapon" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Armor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Equipment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MagicalItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DndClass" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClassArmorProficiency" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClassWeaponProficiency" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClassWeaponSuggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClassArmorSuggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClassSpellSuggestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DndRace" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Background" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Alignment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Treasure" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EquipmentPack" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EquipmentPackItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Character" ENABLE ROW LEVEL SECURITY;

-- Create policies for auth-related tables
CREATE POLICY "Users can manage their own accounts"
ON "Account"
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can manage their own sessions"
ON "Session"
USING (auth.uid() = "userId"::uuid);

CREATE POLICY "Users can manage their own user data"
ON "User"
USING (auth.uid() = id::uuid);

-- Create policies for game data tables (read-only for authenticated users)
CREATE POLICY "Authenticated users can read game data"
ON "Spell" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "Weapon" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "Armor" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "Equipment" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "MagicalItem" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "DndClass" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "ClassArmorProficiency" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "ClassWeaponProficiency" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "ClassWeaponSuggestion" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "ClassArmorSuggestion" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "ClassSpellSuggestion" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "DndRace" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "Background" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "Alignment" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "Treasure" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "EquipmentPack" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can read game data"
ON "EquipmentPackItem" FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for user-specific data
CREATE POLICY "Users can manage their own custom weapons"
ON "CustomWeapon"
USING (auth.uid() = "creatorId"::uuid);

CREATE POLICY "Users can manage their own characters"
ON "Character"
USING (auth.uid() = "userId"::uuid);

-- Create policies for service role (needed for NextAuth.js)
CREATE POLICY "Service role can manage all data"
ON "Account" USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data"
ON "Session" USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage all data"
ON "User" USING (auth.role() = 'service_role'); 