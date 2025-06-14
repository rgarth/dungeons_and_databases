-- CreateTable
CREATE TABLE "Account" (
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

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
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

-- CreateTable
CREATE TABLE "Weapon" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomWeapon" (
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

-- CreateTable
CREATE TABLE "Armor" (
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

-- CreateTable
CREATE TABLE "Equipment" (
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

-- CreateTable
CREATE TABLE "MagicalItem" (
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

-- CreateTable
CREATE TABLE "DndClass" (
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

-- CreateTable
CREATE TABLE "ClassArmorProficiency" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "armorType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassArmorProficiency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassWeaponProficiency" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "proficiencyType" TEXT NOT NULL,
    "weaponName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassWeaponProficiency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassWeaponSuggestion" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "weaponName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassWeaponSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassArmorSuggestion" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "armorName" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassArmorSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DndRace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abilityScoreIncrease" JSONB NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "traits" JSONB NOT NULL,
    "languages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DndRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillProficiencies" JSONB NOT NULL,
    "languages" JSONB NOT NULL,
    "equipment" JSONB NOT NULL,
    "feature" TEXT NOT NULL,
    "featureDescription" TEXT NOT NULL,
    "suggestedCharacteristics" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alignment" (
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

-- CreateTable
CREATE TABLE "Treasure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "appearance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Treasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentPack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentPackItem" (
    "id" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentPackItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
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
    "deathSaveSuccesses" INTEGER NOT NULL DEFAULT 0,
    "deathSaveFailures" INTEGER NOT NULL DEFAULT 0,
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
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "racialTraits" JSONB,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_name_key" ON "Spell"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CustomWeapon_creatorId_name_key" ON "CustomWeapon"("creatorId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_name_key" ON "Armor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MagicalItem_name_key" ON "MagicalItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DndClass_name_key" ON "DndClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClassArmorProficiency_classId_armorType_key" ON "ClassArmorProficiency"("classId", "armorType");

-- CreateIndex
CREATE INDEX "ClassWeaponProficiency_classId_proficiencyType_weaponName_idx" ON "ClassWeaponProficiency"("classId", "proficiencyType", "weaponName");

-- CreateIndex
CREATE UNIQUE INDEX "ClassWeaponSuggestion_classId_weaponName_key" ON "ClassWeaponSuggestion"("classId", "weaponName");

-- CreateIndex
CREATE UNIQUE INDEX "ClassArmorSuggestion_classId_armorName_key" ON "ClassArmorSuggestion"("classId", "armorName");

-- CreateIndex
CREATE UNIQUE INDEX "DndRace_name_key" ON "DndRace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Background_name_key" ON "Background"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Alignment_name_key" ON "Alignment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_name_key" ON "Treasure"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentPack_name_key" ON "EquipmentPack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentPackItem_packId_equipmentId_key" ON "EquipmentPackItem"("packId", "equipmentId");

-- CreateIndex
CREATE INDEX "Character_userId_idx" ON "Character"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomWeapon" ADD CONSTRAINT "CustomWeapon_baseWeaponId_fkey" FOREIGN KEY ("baseWeaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomWeapon" ADD CONSTRAINT "CustomWeapon_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassArmorProficiency" ADD CONSTRAINT "ClassArmorProficiency_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassWeaponProficiency" ADD CONSTRAINT "ClassWeaponProficiency_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassWeaponSuggestion" ADD CONSTRAINT "ClassWeaponSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassArmorSuggestion" ADD CONSTRAINT "ClassArmorSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentPackItem" ADD CONSTRAINT "EquipmentPackItem_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentPackItem" ADD CONSTRAINT "EquipmentPackItem_packId_fkey" FOREIGN KEY ("packId") REFERENCES "EquipmentPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

