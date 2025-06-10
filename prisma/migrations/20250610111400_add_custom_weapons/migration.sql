-- CreateTable
CREATE TABLE "CustomWeapon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "baseWeaponId" TEXT NOT NULL,
    "modifier" INTEGER NOT NULL DEFAULT 0,
    "customName" TEXT,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CustomWeapon_baseWeaponId_fkey" FOREIGN KEY ("baseWeaponId") REFERENCES "Weapon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CustomWeapon_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomWeapon_creatorId_name_key" ON "CustomWeapon"("creatorId", "name");
