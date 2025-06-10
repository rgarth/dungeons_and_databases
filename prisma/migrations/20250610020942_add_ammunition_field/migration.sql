-- AlterTable
ALTER TABLE "Character" ADD COLUMN "ammunition" JSONB;
ALTER TABLE "Character" ADD COLUMN "equippedArmor" JSONB;
ALTER TABLE "Character" ADD COLUMN "equippedWeapons" JSONB;

-- CreateTable
CREATE TABLE "DndClass" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hitDie" INTEGER NOT NULL,
    "primaryAbility" TEXT NOT NULL,
    "savingThrows" JSONB NOT NULL,
    "skillChoices" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ClassArmorProficiency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "armorType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClassArmorProficiency_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClassWeaponProficiency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "proficiencyType" TEXT NOT NULL,
    "weaponName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClassWeaponProficiency_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClassWeaponSuggestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "weaponName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClassWeaponSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClassArmorSuggestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "armorName" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClassArmorSuggestion_classId_fkey" FOREIGN KEY ("classId") REFERENCES "DndClass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DndRace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "abilityScoreIncrease" JSONB NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "traits" JSONB NOT NULL,
    "languages" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DndClass_name_key" ON "DndClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClassArmorProficiency_classId_armorType_key" ON "ClassArmorProficiency"("classId", "armorType");

-- CreateIndex
CREATE UNIQUE INDEX "ClassWeaponProficiency_classId_proficiencyType_weaponName_key" ON "ClassWeaponProficiency"("classId", "proficiencyType", "weaponName");

-- CreateIndex
CREATE UNIQUE INDEX "ClassWeaponSuggestion_classId_weaponName_key" ON "ClassWeaponSuggestion"("classId", "weaponName");

-- CreateIndex
CREATE UNIQUE INDEX "ClassArmorSuggestion_classId_armorName_key" ON "ClassArmorSuggestion"("classId", "armorName");

-- CreateIndex
CREATE UNIQUE INDEX "DndRace_name_key" ON "DndRace"("name");
