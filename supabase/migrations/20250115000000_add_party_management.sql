-- Add party management tables
-- Games table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    dm_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Game invites table
CREATE TABLE game_invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    invite_code VARCHAR(50) UNIQUE NOT NULL,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    max_uses INTEGER DEFAULT NULL,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Game participants table
CREATE TABLE game_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    is_dm BOOLEAN DEFAULT false,
    UNIQUE(game_id, user_id, character_id)
);

-- Game chat messages table
CREATE TABLE game_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text', -- text, system, dice_roll, etc.
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Game notes table
CREATE TABLE game_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    dm_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_games_dm_id ON games(dm_id);
CREATE INDEX idx_games_created_at ON games(created_at);
CREATE INDEX idx_game_invites_game_id ON game_invites(game_id);
CREATE INDEX idx_game_invites_invite_code ON game_invites(invite_code);
CREATE INDEX idx_game_participants_game_id ON game_participants(game_id);
CREATE INDEX idx_game_participants_user_id ON game_participants(user_id);
CREATE INDEX idx_game_participants_character_id ON game_participants(character_id);
CREATE INDEX idx_game_chat_messages_game_id ON game_chat_messages(game_id);
CREATE INDEX idx_game_chat_messages_created_at ON game_chat_messages(created_at);
CREATE INDEX idx_game_notes_game_id ON game_notes(game_id);
CREATE INDEX idx_game_notes_dm_id ON game_notes(dm_id);

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for games
CREATE POLICY "Users can view games they participate in" ON games
    FOR SELECT USING (
        auth.uid() = dm_id OR 
        EXISTS (
            SELECT 1 FROM game_participants 
            WHERE game_id = games.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "DMs can create games" ON games
    FOR INSERT WITH CHECK (auth.uid() = dm_id);

CREATE POLICY "DMs can update their games" ON games
    FOR UPDATE USING (auth.uid() = dm_id);

CREATE POLICY "DMs can delete their games" ON games
    FOR DELETE USING (auth.uid() = dm_id);

-- RLS Policies for game_invites
CREATE POLICY "Users can view invites for games they participate in" ON game_invites
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM game_participants 
            WHERE game_id = game_invites.game_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "DMs can create invites" ON game_invites
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM games 
            WHERE id = game_invites.game_id AND dm_id = auth.uid()
        )
    );

CREATE POLICY "DMs can update invites" ON game_invites
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM games 
            WHERE id = game_invites.game_id AND dm_id = auth.uid()
        )
    );

-- RLS Policies for game_participants
CREATE POLICY "Users can view participants in games they participate in" ON game_participants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM game_participants gp2
            WHERE gp2.game_id = game_participants.game_id AND gp2.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can join games with valid invites" ON game_participants
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM game_invites 
            WHERE game_id = game_participants.game_id 
            AND invite_code IS NOT NULL 
            AND (expires_at IS NULL OR expires_at > NOW())
            AND (max_uses IS NULL OR used_count < max_uses)
            AND is_active = true
        )
    );

CREATE POLICY "Users can update their own participation" ON game_participants
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can leave games" ON game_participants
    FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for game_chat_messages
CREATE POLICY "Users can view chat messages in games they participate in" ON game_chat_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM game_participants 
            WHERE game_id = game_chat_messages.game_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can send messages in games they participate in" ON game_chat_messages
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM game_participants 
            WHERE game_id = game_chat_messages.game_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own messages" ON game_chat_messages
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own messages" ON game_chat_messages
    FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for game_notes
CREATE POLICY "Users can view public notes in games they participate in" ON game_notes
    FOR SELECT USING (
        is_public = true AND
        EXISTS (
            SELECT 1 FROM game_participants 
            WHERE game_id = game_notes.game_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "DMs can view all notes in their games" ON game_notes
    FOR SELECT USING (
        dm_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM games 
            WHERE id = game_notes.game_id AND dm_id = auth.uid()
        )
    );

CREATE POLICY "DMs can create notes in their games" ON game_notes
    FOR INSERT WITH CHECK (
        dm_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM games 
            WHERE id = game_notes.game_id AND dm_id = auth.uid()
        )
    );

CREATE POLICY "DMs can update notes in their games" ON game_notes
    FOR UPDATE USING (
        dm_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM games 
            WHERE id = game_notes.game_id AND dm_id = auth.uid()
        )
    );

CREATE POLICY "DMs can delete notes in their games" ON game_notes
    FOR DELETE USING (
        dm_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM games 
            WHERE id = game_notes.game_id AND dm_id = auth.uid()
        )
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_notes_updated_at BEFORE UPDATE ON game_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate invite codes
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS VARCHAR(50) AS $$
BEGIN
    RETURN upper(substring(md5(random()::text) from 1 for 8));
END;
$$ LANGUAGE plpgsql; 