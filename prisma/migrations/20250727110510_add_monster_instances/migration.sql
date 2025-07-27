/*
  Warnings:

  - You are about to drop the column `dndClass` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `initiative` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `proficiencies` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `spells` on the `Character` table. All the data in the column will be lost.
  - Added the required column `class` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "dndClass",
DROP COLUMN "features",
DROP COLUMN "initiative",
DROP COLUMN "proficiencies",
DROP COLUMN "spells",
ADD COLUMN     "actions" JSONB,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "ammunition" JSONB,
ADD COLUMN     "attunedItems" JSONB,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "backstory" TEXT,
ADD COLUMN     "bonusActions" JSONB,
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "classes" JSONB,
ADD COLUMN     "conditions" JSONB,
ADD COLUMN     "copperPieces" INTEGER DEFAULT 0,
ADD COLUMN     "deathSaveFailures" JSONB NOT NULL DEFAULT '[false, false, false]',
ADD COLUMN     "deathSaveSuccesses" JSONB NOT NULL DEFAULT '[false, false, false]',
ADD COLUMN     "equippedArmor" JSONB,
ADD COLUMN     "equippedWeapons" JSONB,
ADD COLUMN     "fullBodyAvatar" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "goldPieces" INTEGER DEFAULT 0,
ADD COLUMN     "inspiration" BOOLEAN DEFAULT false,
ADD COLUMN     "inventoryArmor" JSONB,
ADD COLUMN     "inventoryMagicalItems" JSONB,
ADD COLUMN     "inventoryWeapons" JSONB,
ADD COLUMN     "kiPoints" INTEGER DEFAULT 0,
ADD COLUMN     "languageSources" JSONB DEFAULT '{}',
ADD COLUMN     "magicalItems" JSONB,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "personality" TEXT,
ADD COLUMN     "proficiencyBonus" INTEGER DEFAULT 2,
ADD COLUMN     "racialTraits" JSONB,
ADD COLUMN     "reactions" JSONB,
ADD COLUMN     "selectedFeatures" JSONB,
ADD COLUMN     "silverPieces" INTEGER DEFAULT 0,
ADD COLUMN     "skillSources" JSONB DEFAULT '{}',
ADD COLUMN     "skills" JSONB,
ADD COLUMN     "spellAttackBonus" INTEGER,
ADD COLUMN     "spellSaveDC" INTEGER,
ADD COLUMN     "spellSlots" JSONB,
ADD COLUMN     "spellcastingAbility" TEXT,
ADD COLUMN     "spellsKnown" JSONB,
ADD COLUMN     "spellsPrepared" JSONB,
ADD COLUMN     "subclass" TEXT,
ADD COLUMN     "temporaryHitPoints" INTEGER DEFAULT 0,
ADD COLUMN     "totalLevel" INTEGER,
ADD COLUMN     "treasures" JSONB,
ADD COLUMN     "usedKiPoints" INTEGER DEFAULT 0,
ADD COLUMN     "usedSpellSlots" JSONB;

-- CreateTable
CREATE TABLE "AvatarImage" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "character_id" TEXT NOT NULL,
    "image_data" BYTEA NOT NULL,
    "mime_type" TEXT NOT NULL DEFAULT 'image/png',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvatarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "gameNotes" TEXT,
    "dmNotes" TEXT,
    "dm_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInvite" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "game_id" TEXT NOT NULL,
    "invite_code" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6),
    "max_uses" INTEGER,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GameInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameParticipant" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "game_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "character_ids" JSONB NOT NULL DEFAULT '[]',
    "joined_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_dm" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameNote" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "game_id" TEXT NOT NULL,
    "dm_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "GameNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameChatMessage" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "game_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encounter" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterMonster" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "encounter_id" TEXT NOT NULL,
    "monster_name" TEXT NOT NULL,
    "monster_data" JSONB NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "current_hp" INTEGER,
    "max_hp" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EncounterMonster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterMonsterInstance" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "encounter_monster_id" TEXT NOT NULL,
    "instance_number" INTEGER NOT NULL,
    "initiative" INTEGER,
    "current_hp" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EncounterMonsterInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterParticipant" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "encounter_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "character_name" TEXT NOT NULL,
    "character_data" JSONB NOT NULL,
    "initiative" INTEGER,
    "current_hp" INTEGER,
    "max_hp" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EncounterParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvatarImage_character_id_key" ON "AvatarImage"("character_id");

-- CreateIndex
CREATE INDEX "idx_avatarimage_character_id" ON "AvatarImage"("character_id");

-- CreateIndex
CREATE INDEX "idx_games_dm_id" ON "Game"("dm_id");

-- CreateIndex
CREATE INDEX "idx_games_created_at" ON "Game"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "GameInvite_invite_code_key" ON "GameInvite"("invite_code");

-- CreateIndex
CREATE INDEX "idx_game_invites_game_id" ON "GameInvite"("game_id");

-- CreateIndex
CREATE INDEX "idx_game_invites_invite_code" ON "GameInvite"("invite_code");

-- CreateIndex
CREATE INDEX "idx_game_participants_game_id" ON "GameParticipant"("game_id");

-- CreateIndex
CREATE INDEX "idx_game_participants_user_id" ON "GameParticipant"("user_id");

-- CreateIndex
CREATE INDEX "idx_game_participants_character_ids" ON "GameParticipant" USING GIN ("character_ids");

-- CreateIndex
CREATE UNIQUE INDEX "GameParticipant_game_id_user_id_key" ON "GameParticipant"("game_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_game_notes_game_id" ON "GameNote"("game_id");

-- CreateIndex
CREATE INDEX "idx_game_notes_dm_id" ON "GameNote"("dm_id");

-- CreateIndex
CREATE INDEX "idx_game_chat_messages_game_id" ON "GameChatMessage"("game_id");

-- CreateIndex
CREATE INDEX "idx_game_chat_messages_user_id" ON "GameChatMessage"("user_id");

-- CreateIndex
CREATE INDEX "idx_game_chat_messages_created_at" ON "GameChatMessage"("created_at");

-- CreateIndex
CREATE INDEX "idx_encounters_game_id" ON "Encounter"("game_id");

-- CreateIndex
CREATE INDEX "idx_encounters_is_active" ON "Encounter"("is_active");

-- CreateIndex
CREATE INDEX "idx_encounter_monsters_encounter_id" ON "EncounterMonster"("encounter_id");

-- CreateIndex
CREATE INDEX "idx_encounter_monsters_is_active" ON "EncounterMonster"("is_active");

-- CreateIndex
CREATE INDEX "idx_encounter_monster_instances_encounter_monster_id" ON "EncounterMonsterInstance"("encounter_monster_id");

-- CreateIndex
CREATE INDEX "idx_encounter_monster_instances_is_active" ON "EncounterMonsterInstance"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "unique_encounter_monster_instance" ON "EncounterMonsterInstance"("encounter_monster_id", "instance_number");

-- CreateIndex
CREATE INDEX "idx_encounter_participants_encounter_id" ON "EncounterParticipant"("encounter_id");

-- CreateIndex
CREATE INDEX "idx_encounter_participants_character_id" ON "EncounterParticipant"("character_id");

-- CreateIndex
CREATE INDEX "idx_encounter_participants_is_active" ON "EncounterParticipant"("is_active");

-- CreateIndex
CREATE INDEX "Character_kiPoints_idx" ON "Character"("kiPoints");

-- CreateIndex
CREATE INDEX "Character_usedKiPoints_idx" ON "Character"("usedKiPoints");

-- CreateIndex
CREATE INDEX "idx_character_language_sources" ON "Character" USING GIN ("languageSources");

-- CreateIndex
CREATE INDEX "idx_character_skill_sources" ON "Character" USING GIN ("skillSources");

-- AddForeignKey
ALTER TABLE "AvatarImage" ADD CONSTRAINT "AvatarImage_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_dm_id_fkey" FOREIGN KEY ("dm_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInvite" ADD CONSTRAINT "GameInvite_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInvite" ADD CONSTRAINT "GameInvite_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipant" ADD CONSTRAINT "GameParticipant_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipant" ADD CONSTRAINT "GameParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameNote" ADD CONSTRAINT "GameNote_dm_id_fkey" FOREIGN KEY ("dm_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameNote" ADD CONSTRAINT "GameNote_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameChatMessage" ADD CONSTRAINT "GameChatMessage_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameChatMessage" ADD CONSTRAINT "GameChatMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterMonster" ADD CONSTRAINT "EncounterMonster_encounter_id_fkey" FOREIGN KEY ("encounter_id") REFERENCES "Encounter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterMonsterInstance" ADD CONSTRAINT "EncounterMonsterInstance_encounter_monster_id_fkey" FOREIGN KEY ("encounter_monster_id") REFERENCES "EncounterMonster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterParticipant" ADD CONSTRAINT "EncounterParticipant_encounter_id_fkey" FOREIGN KEY ("encounter_id") REFERENCES "Encounter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
