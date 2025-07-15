-- Create peer registrations table for WebRTC signaling
CREATE TABLE IF NOT EXISTS peer_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_peer_registrations_game_id ON peer_registrations(game_id);
CREATE INDEX IF NOT EXISTS idx_peer_registrations_last_seen ON peer_registrations(last_seen);

-- Create unique constraint to prevent duplicate registrations
CREATE UNIQUE INDEX IF NOT EXISTS idx_peer_registrations_unique ON peer_registrations(game_id, user_id); 