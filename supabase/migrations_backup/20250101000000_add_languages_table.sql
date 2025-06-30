-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  script TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Standard', 'Exotic', 'Secret')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert language data
INSERT INTO languages (name, script, category, description) VALUES
  -- Standard Languages
  ('Common', 'Common', 'Standard', 'The most widely spoken language'),
  ('Dwarvish', 'Dwarvish', 'Standard', 'Language of dwarves'),
  ('Elvish', 'Elvish', 'Standard', 'Language of elves'),
  ('Giant', 'Dwarvish', 'Standard', 'Language of giants and ogres'),
  ('Gnomish', 'Dwarvish', 'Standard', 'Language of gnomes'),
  ('Goblin', 'Dwarvish', 'Standard', 'Language of goblinoids'),
  ('Halfling', 'Common', 'Standard', 'Language of halflings'),
  ('Orc', 'Dwarvish', 'Standard', 'Language of orcs'),

  -- Exotic Languages
  ('Abyssal', 'Infernal', 'Exotic', 'Language of demons'),
  ('Celestial', 'Celestial', 'Exotic', 'Language of celestials'),
  ('Draconic', 'Draconic', 'Exotic', 'Language of dragons and magic'),
  ('Deep Speech', '—', 'Exotic', 'Language of aberrations'),
  ('Infernal', 'Infernal', 'Exotic', 'Language of devils'),
  ('Primordial', 'Dwarvish', 'Exotic', 'Language of elementals'),
  ('Sylvan', 'Elvish', 'Exotic', 'Language of fey creatures'),
  ('Undercommon', 'Elvish', 'Exotic', 'Trade language of the Underdark'),

  -- Primordial Dialects
  ('Aquan', 'Dwarvish', 'Exotic', 'Water elemental dialect'),
  ('Auran', 'Dwarvish', 'Exotic', 'Air elemental dialect'),
  ('Ignan', 'Dwarvish', 'Exotic', 'Fire elemental dialect'),
  ('Terran', 'Dwarvish', 'Exotic', 'Earth elemental dialect'),

  -- Secret Languages
  ('Druidic', 'Druidic', 'Secret', 'Secret language of druids'),
  ('Thieves'' Cant', '—', 'Secret', 'Secret language of rogues')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Languages are viewable by everyone" ON languages
  FOR SELECT USING (true); 