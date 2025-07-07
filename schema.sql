-- Complete D&D 5e Database Schema matching Prisma schema
-- This creates all tables with proper relationships and constraints

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users and Authentication
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- Core Game Data
CREATE TABLE IF NOT EXISTS "DndClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hitDie" INTEGER NOT NULL,
    "primaryAbility" TEXT NOT NULL,
    "savingThrows" JSONB NOT NULL,
    "skillChoices" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DndClass_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DndRace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abilityScoreIncrease" JSONB NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "languages" JSONB NOT NULL,
    "age" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DndRace_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Subrace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abilityScoreIncrease" JSONB NOT NULL,
    "languages" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Subrace_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'passive',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SubraceTrait" (
    "id" TEXT NOT NULL,
    "subraceId" TEXT NOT NULL,
    "traitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SubraceTrait_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Background" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phbDescription" TEXT,
    "skillProficiencies" JSONB NOT NULL,
    "languages" JSONB NOT NULL,
    "equipment" JSONB NOT NULL,
    "startingGold" INTEGER NOT NULL DEFAULT 0,
    "startingGoldFormula" TEXT,
    "feature" TEXT NOT NULL,
    "featureDescription" TEXT NOT NULL,
    "suggestedCharacteristics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Alignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ethicalAxis" TEXT NOT NULL,
    "moralAxis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Alignment_pkey" PRIMARY KEY ("id")
);

-- Equipment and Items
CREATE TABLE IF NOT EXISTS "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "damage" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "properties" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cost" TEXT NOT NULL,
    "stackable" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "ammunition_type_id" TEXT,
    "suggested_quantity" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AmmunitionSuggestion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AmmunitionSuggestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Armor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "baseAC" INTEGER NOT NULL,
    "maxDexBonus" INTEGER,
    "minStrength" INTEGER,
    "stealthDisadvantage" BOOLEAN NOT NULL DEFAULT false,
    "weight" DOUBLE PRECISION NOT NULL,
    "cost" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "description" TEXT,
    "stackable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "MagicalItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "requiresAttunement" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "cost" TEXT,
    "effects" JSONB,
    "stackable" BOOLEAN NOT NULL DEFAULT false,
    "consumable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "MagicalItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Treasure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "appearance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Treasure_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EquipmentPack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EquipmentPack_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EquipmentPackItem" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EquipmentPackItem_pkey" PRIMARY KEY ("id")
);

-- Spells
CREATE TABLE IF NOT EXISTS "Spell" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "classes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- Languages
CREATE TABLE IF NOT EXISTS "languages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- Characters
CREATE TABLE IF NOT EXISTS "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "subrace" TEXT,
    "class" TEXT NOT NULL,
    "subclass" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "classes" JSONB,
    "totalLevel" INTEGER,
    "selectedFeatures" JSONB,
    "background" TEXT,
    "alignment" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "strength" INTEGER NOT NULL DEFAULT 10,
    "dexterity" INTEGER NOT NULL DEFAULT 10,
    "constitution" INTEGER NOT NULL DEFAULT 10,
    "intelligence" INTEGER NOT NULL DEFAULT 10,
    "wisdom" INTEGER NOT NULL DEFAULT 10,
    "charisma" INTEGER NOT NULL DEFAULT 10,
    "hitPoints" INTEGER NOT NULL DEFAULT 10,
    "maxHitPoints" INTEGER NOT NULL DEFAULT 10,
    "temporaryHitPoints" INTEGER NOT NULL DEFAULT 0,
    "armorClass" INTEGER NOT NULL DEFAULT 10,
    "speed" INTEGER NOT NULL DEFAULT 30,
    "deathSaveSuccesses" JSONB NOT NULL DEFAULT '[false, false, false]',
    "deathSaveFailures" JSONB NOT NULL DEFAULT '[false, false, false]',
    "proficiencyBonus" INTEGER NOT NULL DEFAULT 2,
    "skills" JSONB,
    "inventory" JSONB,
    "equipment" JSONB,
    "weapons" JSONB,
    "equippedWeapons" JSONB,
    "inventoryWeapons" JSONB,
    "ammunition" JSONB,
    "armor" JSONB,
    "equippedArmor" JSONB,
    "inventoryArmor" JSONB,
    "magicalItems" JSONB,
    "inventoryMagicalItems" JSONB,
    "attunedItems" JSONB,
    "copperPieces" INTEGER NOT NULL DEFAULT 0,
    "silverPieces" INTEGER NOT NULL DEFAULT 0,
    "goldPieces" INTEGER NOT NULL DEFAULT 0,
    "treasures" JSONB,
    "spellsKnown" JSONB,
    "spellsPrepared" JSONB,
    "spellSlots" JSONB,
    "spellcastingAbility" TEXT,
    "spellSaveDC" INTEGER,
    "spellAttackBonus" INTEGER,
    "actions" JSONB,
    "bonusActions" JSONB,
    "reactions" JSONB,
    "appearance" TEXT,
    "personality" TEXT,
    "personalityTraits" JSONB,
    "ideals" JSONB,
    "bonds" JSONB,
    "flaws" JSONB,
    "backstory" TEXT,
    "notes" TEXT,
    "avatar" TEXT,
    "fullBodyAvatar" TEXT,
    "inspiration" BOOLEAN NOT NULL DEFAULT false,
    "languages" JSONB,
    "conditions" JSONB,
    "racialTraits" JSONB,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- Custom Weapons
CREATE TABLE IF NOT EXISTS "CustomWeapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseWeaponId" TEXT NOT NULL,
    "modifier" INTEGER NOT NULL DEFAULT 0,
    "customName" TEXT,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CustomWeapon_pkey" PRIMARY KEY ("id")
);

-- Class-specific data
CREATE TABLE IF NOT EXISTS "ClassArmorProficiency" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "armorType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassArmorProficiency_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ClassWeaponProficiency" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "proficiencyType" TEXT NOT NULL,
    "weaponName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassWeaponProficiency_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ClassWeaponSuggestion" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "weaponName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassWeaponSuggestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ClassArmorSuggestion" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "armorName" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassArmorSuggestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ClassSpellSuggestion" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "spellName" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassSpellSuggestion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ClassSpellLimits" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "cantripsKnown" INTEGER NOT NULL,
    "spellsKnown" INTEGER NOT NULL,
    "spellcastingType" TEXT NOT NULL,
    "maxSpellLevel" INTEGER NOT NULL,
    "spellLevelLimits" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ClassSpellLimits_pkey" PRIMARY KEY ("id")
);

-- Unique constraints
ALTER TABLE "User" ADD CONSTRAINT "User_email_key" UNIQUE ("email");
ALTER TABLE "Account" ADD CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId");
ALTER TABLE "Session" ADD CONSTRAINT "Session_sessionToken_key" UNIQUE ("sessionToken");
ALTER TABLE "DndClass" ADD CONSTRAINT "DndClass_name_key" UNIQUE ("name");
ALTER TABLE "DndRace" ADD CONSTRAINT "DndRace_name_key" UNIQUE ("name");
ALTER TABLE "Subrace" ADD CONSTRAINT "Subrace_name_key" UNIQUE ("name");
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_name_key" UNIQUE ("name");
ALTER TABLE "Background" ADD CONSTRAINT "Background_name_key" UNIQUE ("name");
ALTER TABLE "Alignment" ADD CONSTRAINT "Alignment_name_key" UNIQUE ("name");
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_name_key" UNIQUE ("name");
ALTER TABLE "AmmunitionSuggestion" ADD CONSTRAINT "AmmunitionSuggestion_name_key" UNIQUE ("name");
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_name_key" UNIQUE ("name");
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_name_key" UNIQUE ("name");
ALTER TABLE "MagicalItem" ADD CONSTRAINT "MagicalItem_name_key" UNIQUE ("name");
ALTER TABLE "Treasure" ADD CONSTRAINT "Treasure_name_key" UNIQUE ("name");
ALTER TABLE "EquipmentPack" ADD CONSTRAINT "EquipmentPack_name_key" UNIQUE ("name");
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_name_key" UNIQUE ("name");
ALTER TABLE "languages" ADD CONSTRAINT "languages_name_key" UNIQUE ("name");
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_subraceId_traitId_key" UNIQUE ("subraceId", "traitId");
ALTER TABLE "EquipmentPackItem" ADD CONSTRAINT "EquipmentPackItem_packId_itemName_key" UNIQUE ("packId", "itemName");
ALTER TABLE "ClassArmorProficiency" ADD CONSTRAINT "ClassArmorProficiency_classId_armorType_key" UNIQUE ("classId", "armorType");
ALTER TABLE "ClassArmorSuggestion" ADD CONSTRAINT "ClassArmorSuggestion_classId_armorName_key" UNIQUE ("classId", "armorName");
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_level_key" UNIQUE ("classId", "level");
ALTER TABLE "CustomWeapon" ADD CONSTRAINT "CustomWeapon_creatorId_name_key" UNIQUE ("creatorId", "name");

-- Foreign key constraints
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Subrace" ADD CONSTRAINT "Subrace_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "DndRace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_ammunition_type_id_fkey" FOREIGN KEY ("ammunition_type_id") REFERENCES "AmmunitionSuggestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EquipmentPackItem" ADD CONSTRAINT "EquipmentPackItem_packId_fkey" FOREIGN KEY ("packId") REFERENCES "EquipmentPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CustomWeapon" ADD CONSTRAINT "CustomWeapon_baseWeaponId_fkey" FOREIGN KEY ("baseWeaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CustomWeapon" ADD CONSTRAINT "CustomWeapon_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClassArmorProficiency" ADD CONSTRAINT "ClassArmorProficiency_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClassWeaponProficiency" ADD CONSTRAINT "ClassWeaponProficiency_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClassWeaponSuggestion" ADD CONSTRAINT "ClassWeaponSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClassArmorSuggestion" ADD CONSTRAINT "ClassArmorSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClassSpellSuggestion" ADD CONSTRAINT "ClassSpellSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ClassSpellLimits" ADD CONSTRAINT "ClassSpellLimits_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS "Subrace_raceId_idx" ON "Subrace"("raceId");
CREATE INDEX IF NOT EXISTS "SubraceTrait_subraceId_idx" ON "SubraceTrait"("subraceId");
CREATE INDEX IF NOT EXISTS "SubraceTrait_traitId_idx" ON "SubraceTrait"("traitId");
CREATE INDEX IF NOT EXISTS "Character_userId_idx" ON "Character"("userId");
CREATE INDEX IF NOT EXISTS "ClassWeaponSuggestion_classId_idx" ON "ClassWeaponSuggestion"("classId");
CREATE INDEX IF NOT EXISTS "ClassSpellSuggestion_classId_idx" ON "ClassSpellSuggestion"("classId");
CREATE INDEX IF NOT EXISTS "ClassSpellLimits_classId_idx" ON "ClassSpellLimits"("classId");
CREATE INDEX IF NOT EXISTS "ClassSpellLimits_level_idx" ON "ClassSpellLimits"("level");
CREATE INDEX IF NOT EXISTS "ClassWeaponProficiency_classId_proficiencyType_weaponName_idx" ON "ClassWeaponProficiency"("classId", "proficiencyType", "weaponName");

-- Comments for documentation
COMMENT ON TABLE "DndClass" IS 'D&D 5e character classes';
COMMENT ON TABLE "DndRace" IS 'D&D 5e character races';
COMMENT ON TABLE "Subrace" IS 'D&D 5e subraces for each race';
COMMENT ON TABLE "Trait" IS 'Racial and subracial traits';
COMMENT ON TABLE "SubraceTrait" IS 'Many-to-many relationship between subraces and traits';
COMMENT ON TABLE "Background" IS 'D&D 5e character backgrounds';
COMMENT ON TABLE "Alignment" IS 'D&D 5e character alignments';
COMMENT ON TABLE "Weapon" IS 'D&D 5e weapons';
COMMENT ON TABLE "Armor" IS 'D&D 5e armor';
COMMENT ON TABLE "Equipment" IS 'D&D 5e equipment items';
COMMENT ON TABLE "MagicalItem" IS 'D&D 5e magical items';
COMMENT ON TABLE "Treasure" IS 'D&D 5e treasure items';
COMMENT ON TABLE "Spell" IS 'D&D 5e spells';
COMMENT ON TABLE "Character" IS 'Player characters';
COMMENT ON TABLE "ClassSpellLimits" IS 'Spellcasting limits for each class and level';

