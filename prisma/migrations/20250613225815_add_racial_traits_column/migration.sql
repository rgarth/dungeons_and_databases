-- DropIndex
DROP INDEX "ClassWeaponProficiency_classId_proficiencyType_weaponName_key";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "racialTraits" JSONB;

-- CreateIndex
CREATE INDEX "ClassWeaponProficiency_classId_proficiencyType_weaponName_idx" ON "ClassWeaponProficiency"("classId", "proficiencyType", "weaponName");
