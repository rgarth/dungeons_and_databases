-- Create ammunition_suggestions table
CREATE TABLE IF NOT EXISTS ammunition_suggestions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE ammunition_suggestions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to ammunition_suggestions" ON ammunition_suggestions
    FOR SELECT USING (true);

-- Insert sample data
INSERT INTO ammunition_suggestions (name, description) VALUES
    ('Arrows', 'Standard arrows for bows'),
    ('Crossbow Bolts', 'Heavy bolts for crossbows'),
    ('Sling Bullets', 'Small stones or lead bullets for slings'),
    ('Blowgun Needles', 'Thin needles for blowguns'),
    ('Darts', 'Lightweight throwing darts'); 