-- Add multiple characters support to GameParticipant
-- Change characterId to characterIds (JSON array)

-- First, create a backup of existing character assignments
CREATE TABLE IF NOT EXISTS game_participant_characters_backup AS
SELECT 
  id,
  game_id,
  user_id,
  character_id,
  joined_at,
  is_dm
FROM game_participant
WHERE character_id IS NOT NULL;

-- Add the new characterIds column
ALTER TABLE game_participant 
ADD COLUMN character_ids JSONB DEFAULT '[]'::jsonb;

-- Migrate existing single character assignments to the new array format
UPDATE game_participant 
SET character_ids = jsonb_build_array(character_id)
WHERE character_id IS NOT NULL;

-- Remove the old characterId column and its constraints
ALTER TABLE game_participant DROP CONSTRAINT IF EXISTS game_participant_character_id_fkey;
ALTER TABLE game_participant DROP COLUMN character_id;

-- Remove the unique constraint that included characterId
ALTER TABLE game_participant DROP CONSTRAINT IF EXISTS game_participant_game_id_user_id_character_id_key;

-- Add a new unique constraint for game_id and user_id only (one participant per user per game)
ALTER TABLE game_participant 
ADD CONSTRAINT game_participant_game_id_user_id_key UNIQUE (game_id, user_id);

-- Add an index for the character_ids column for better query performance
CREATE INDEX idx_game_participants_character_ids ON game_participant USING GIN (character_ids);

-- Add a check constraint to ensure character_ids is always an array
ALTER TABLE game_participant 
ADD CONSTRAINT game_participant_character_ids_array_check 
CHECK (jsonb_typeof(character_ids) = 'array'); 