-- CreateTable
CREATE TABLE "Treasure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "weight" REAL,
    "appearance" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EquipmentPack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EquipmentPackItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EquipmentPackItem_packId_fkey" FOREIGN KEY ("packId") REFERENCES "EquipmentPack" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EquipmentPackItem_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagicalItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "requiresAttunement" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "weight" REAL,
    "cost" TEXT,
    "effects" JSONB,
    "stackable" BOOLEAN NOT NULL DEFAULT false,
    "consumable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MagicalItem" ("cost", "createdAt", "description", "effects", "id", "name", "rarity", "requiresAttunement", "stackable", "type", "updatedAt", "weight") SELECT "cost", "createdAt", "description", "effects", "id", "name", "rarity", "requiresAttunement", "stackable", "type", "updatedAt", "weight" FROM "MagicalItem";
DROP TABLE "MagicalItem";
ALTER TABLE "new_MagicalItem" RENAME TO "MagicalItem";
CREATE UNIQUE INDEX "MagicalItem_name_key" ON "MagicalItem"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Treasure_name_key" ON "Treasure"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentPack_name_key" ON "EquipmentPack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentPackItem_packId_equipmentId_key" ON "EquipmentPackItem"("packId", "equipmentId");
