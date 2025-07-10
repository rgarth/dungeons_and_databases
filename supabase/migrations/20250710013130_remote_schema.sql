

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;




ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."update_avatar_images_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_avatar_images_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_avatarimage_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_avatarimage_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Account" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "providerAccountId" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" integer,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text"
);


ALTER TABLE "public"."Account" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."AvatarImage" (
    "id" "text" DEFAULT ("gen_random_uuid"())::"text" NOT NULL,
    "character_id" "text" NOT NULL,
    "image_data" "bytea" NOT NULL,
    "mime_type" "text" DEFAULT 'image/png'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."AvatarImage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Character" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "race" "text" NOT NULL,
    "subrace" "text",
    "class" "text" NOT NULL,
    "level" integer DEFAULT 1 NOT NULL,
    "background" "text" NOT NULL,
    "alignment" "text" NOT NULL,
    "experience" integer DEFAULT 0 NOT NULL,
    "strength" integer NOT NULL,
    "dexterity" integer NOT NULL,
    "constitution" integer NOT NULL,
    "intelligence" integer NOT NULL,
    "wisdom" integer NOT NULL,
    "charisma" integer NOT NULL,
    "hitPoints" integer NOT NULL,
    "maxHitPoints" integer NOT NULL,
    "armorClass" integer NOT NULL,
    "speed" integer NOT NULL,
    "personalityTraits" "jsonb",
    "ideals" "jsonb",
    "bonds" "jsonb",
    "flaws" "jsonb",
    "appearance" "text",
    "inventory" "jsonb",
    "weapons" "jsonb",
    "armor" "jsonb",
    "languages" "jsonb",
    "equipment" "jsonb",
    "gold" double precision DEFAULT 0 NOT NULL,
    "copper" integer DEFAULT 0 NOT NULL,
    "silver" integer DEFAULT 0 NOT NULL,
    "electrum" integer DEFAULT 0 NOT NULL,
    "platinum" integer DEFAULT 0 NOT NULL,
    "avatarUrl" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" "text" NOT NULL,
    "subclass" "text",
    "classes" "jsonb",
    "totalLevel" integer,
    "selectedFeatures" "jsonb",
    "gender" "text",
    "age" integer,
    "temporaryHitPoints" integer DEFAULT 0,
    "proficiencyBonus" integer DEFAULT 2,
    "skills" "jsonb",
    "equippedWeapons" "jsonb",
    "inventoryWeapons" "jsonb",
    "ammunition" "jsonb",
    "equippedArmor" "jsonb",
    "inventoryArmor" "jsonb",
    "magicalItems" "jsonb",
    "inventoryMagicalItems" "jsonb",
    "attunedItems" "jsonb",
    "copperPieces" integer DEFAULT 0,
    "silverPieces" integer DEFAULT 0,
    "goldPieces" integer DEFAULT 0,
    "treasures" "jsonb",
    "spellsKnown" "jsonb",
    "spellsPrepared" "jsonb",
    "spellSlots" "jsonb",
    "spellcastingAbility" "text",
    "spellSaveDC" integer,
    "spellAttackBonus" integer,
    "actions" "jsonb",
    "bonusActions" "jsonb",
    "reactions" "jsonb",
    "personality" "text",
    "backstory" "text",
    "notes" "text",
    "avatar" "text",
    "fullBodyAvatar" "text",
    "inspiration" boolean DEFAULT false,
    "conditions" "jsonb",
    "racialTraits" "jsonb",
    "skillSources" "jsonb" DEFAULT '{}'::"jsonb",
    "languageSources" "jsonb" DEFAULT '{}'::"jsonb",
    "deathSaveSuccesses" "jsonb" DEFAULT '[false, false, false]'::"jsonb" NOT NULL,
    "deathSaveFailures" "jsonb" DEFAULT '[false, false, false]'::"jsonb" NOT NULL,
    "kiPoints" integer DEFAULT 0,
    "usedKiPoints" integer DEFAULT 0,
    "usedSpellSlots" "jsonb",
    CONSTRAINT "deathSaveFailures_array_length" CHECK (("jsonb_array_length"("deathSaveFailures") = 3)),
    CONSTRAINT "deathSaveSuccesses_array_length" CHECK (("jsonb_array_length"("deathSaveSuccesses") = 3))
);


ALTER TABLE "public"."Character" OWNER TO "postgres";


COMMENT ON COLUMN "public"."Character"."skillSources" IS 'JSON object mapping skill names to their source (class, background, racial, feat, other)';



COMMENT ON COLUMN "public"."Character"."languageSources" IS 'JSON object mapping language names to their source (background, racial, class, feat, other)';



COMMENT ON COLUMN "public"."Character"."kiPoints" IS 'Total ki points available (equal to monk level)';



COMMENT ON COLUMN "public"."Character"."usedKiPoints" IS 'Ki points spent this short rest (resets on short rest)';



CREATE TABLE IF NOT EXISTS "public"."CustomWeapon" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "baseWeaponName" "text" NOT NULL,
    "modifier" integer DEFAULT 0 NOT NULL,
    "customName" "text",
    "description" "text",
    "creatorId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."CustomWeapon" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Session" (
    "id" "text" NOT NULL,
    "sessionToken" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "expires" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."Session" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" "text" NOT NULL,
    "name" "text",
    "email" "text" NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    "image" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."User" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UserPreference" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "dieColor" "text" DEFAULT '#dc2626'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."UserPreference" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."AvatarImage"
    ADD CONSTRAINT "AvatarImage_character_id_key" UNIQUE ("character_id");



ALTER TABLE ONLY "public"."AvatarImage"
    ADD CONSTRAINT "AvatarImage_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Character"
    ADD CONSTRAINT "Character_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."CustomWeapon"
    ADD CONSTRAINT "CustomWeapon_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."UserPreference"
    ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account" USING "btree" ("provider", "providerAccountId");



CREATE INDEX "Character_kiPoints_idx" ON "public"."Character" USING "btree" ("kiPoints");



CREATE INDEX "Character_usedKiPoints_idx" ON "public"."Character" USING "btree" ("usedKiPoints");



CREATE UNIQUE INDEX "CustomWeapon_creatorId_name_key" ON "public"."CustomWeapon" USING "btree" ("creatorId", "name");



CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session" USING "btree" ("sessionToken");



CREATE UNIQUE INDEX "UserPreference_userId_key" ON "public"."UserPreference" USING "btree" ("userId");



CREATE UNIQUE INDEX "User_email_key" ON "public"."User" USING "btree" ("email");



CREATE INDEX "idx_avatarimage_character_id" ON "public"."AvatarImage" USING "btree" ("character_id");



CREATE INDEX "idx_character_language_sources" ON "public"."Character" USING "gin" ("languageSources");



CREATE INDEX "idx_character_skill_sources" ON "public"."Character" USING "gin" ("skillSources");



CREATE OR REPLACE TRIGGER "trigger_update_avatarimage_updated_at" BEFORE UPDATE ON "public"."AvatarImage" FOR EACH ROW EXECUTE FUNCTION "public"."update_avatarimage_updated_at"();



ALTER TABLE ONLY "public"."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."AvatarImage"
    ADD CONSTRAINT "AvatarImage_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."Character"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Character"
    ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."CustomWeapon"
    ADD CONSTRAINT "CustomWeapon_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."UserPreference"
    ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE "public"."AvatarImage" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Users can delete their own character avatar images" ON "public"."AvatarImage" FOR DELETE USING (("character_id" IN ( SELECT "Character"."id"
   FROM "public"."Character"
  WHERE ("Character"."userId" = ("auth"."uid"())::"text"))));



CREATE POLICY "Users can insert their own character avatar images" ON "public"."AvatarImage" FOR INSERT WITH CHECK (("character_id" IN ( SELECT "Character"."id"
   FROM "public"."Character"
  WHERE ("Character"."userId" = ("auth"."uid"())::"text"))));



CREATE POLICY "Users can update their own character avatar images" ON "public"."AvatarImage" FOR UPDATE USING (("character_id" IN ( SELECT "Character"."id"
   FROM "public"."Character"
  WHERE ("Character"."userId" = ("auth"."uid"())::"text"))));



CREATE POLICY "Users can view their own character avatar images" ON "public"."AvatarImage" FOR SELECT USING (("character_id" IN ( SELECT "Character"."id"
   FROM "public"."Character"
  WHERE ("Character"."userId" = ("auth"."uid"())::"text"))));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;






































































































































































































RESET ALL;
