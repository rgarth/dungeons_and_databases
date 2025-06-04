-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "background" TEXT,
    "alignment" TEXT,
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
    "proficiencyBonus" INTEGER NOT NULL DEFAULT 2,
    "skills" JSONB,
    "inventory" JSONB,
    "equipment" JSONB,
    "weapons" JSONB,
    "inventoryWeapons" JSONB,
    "armor" JSONB,
    "inventoryArmor" JSONB,
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
    "backstory" TEXT,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("actions", "alignment", "appearance", "armor", "armorClass", "background", "backstory", "bonusActions", "charisma", "class", "constitution", "copperPieces", "createdAt", "dexterity", "equipment", "goldPieces", "hitPoints", "id", "intelligence", "inventory", "inventoryArmor", "inventoryWeapons", "level", "maxHitPoints", "name", "notes", "personality", "proficiencyBonus", "race", "reactions", "silverPieces", "skills", "speed", "spellAttackBonus", "spellSaveDC", "spellSlots", "spellcastingAbility", "spellsKnown", "spellsPrepared", "strength", "treasures", "updatedAt", "userId", "weapons", "wisdom") SELECT "actions", "alignment", "appearance", "armor", "armorClass", "background", "backstory", "bonusActions", "charisma", "class", "constitution", "copperPieces", "createdAt", "dexterity", "equipment", "goldPieces", "hitPoints", "id", "intelligence", "inventory", "inventoryArmor", "inventoryWeapons", "level", "maxHitPoints", "name", "notes", "personality", "proficiencyBonus", "race", "reactions", "silverPieces", "skills", "speed", "spellAttackBonus", "spellSaveDC", "spellSlots", "spellcastingAbility", "spellsKnown", "spellsPrepared", "strength", "treasures", "updatedAt", "userId", "weapons", "wisdom" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
