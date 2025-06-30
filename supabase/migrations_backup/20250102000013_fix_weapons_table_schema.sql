-- Drop the existing weapons table if it exists
DROP TABLE IF EXISTS weapons CASCADE;

-- Create weapons table with correct schema
CREATE TABLE weapons (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  damage TEXT NOT NULL,
  damage_type TEXT NOT NULL,
  properties TEXT NOT NULL,
  weight REAL NOT NULL,
  cost TEXT NOT NULL,
  stackable BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  ammunition_type_id INTEGER REFERENCES ammunition_suggestions(id),
  suggested_quantity INTEGER
);

-- Add comments for clarity
COMMENT ON COLUMN weapons.ammunition_type_id IS 'Foreign key reference to ammunition_suggestions table';
COMMENT ON COLUMN weapons.suggested_quantity IS 'Suggested starting quantity of ammunition for this weapon'; 