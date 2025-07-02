-- Create avatar_images table for storing binary image data
CREATE TABLE avatar_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    image_type TEXT NOT NULL CHECK (image_type IN ('avatar', 'full_body')),
    image_data BYTEA NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'image/png',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(character_id, image_type)
);

-- Add indexes for performance
CREATE INDEX idx_avatar_images_character_id ON avatar_images(character_id);
CREATE INDEX idx_avatar_images_type ON avatar_images(image_type);

-- Add RLS policies
ALTER TABLE avatar_images ENABLE ROW LEVEL SECURITY;

-- Users can only access their own character's avatar images
CREATE POLICY "Users can view their own character avatar images" ON avatar_images
    FOR SELECT USING (
        character_id IN (
            SELECT id FROM characters WHERE user_id = auth.uid()
        )
    );

-- Users can insert avatar images for their own characters
CREATE POLICY "Users can insert their own character avatar images" ON avatar_images
    FOR INSERT WITH CHECK (
        character_id IN (
            SELECT id FROM characters WHERE user_id = auth.uid()
        )
    );

-- Users can update avatar images for their own characters
CREATE POLICY "Users can update their own character avatar images" ON avatar_images
    FOR UPDATE USING (
        character_id IN (
            SELECT id FROM characters WHERE user_id = auth.uid()
        )
    );

-- Users can delete avatar images for their own characters
CREATE POLICY "Users can delete their own character avatar images" ON avatar_images
    FOR DELETE USING (
        character_id IN (
            SELECT id FROM characters WHERE user_id = auth.uid()
        )
    );

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_avatar_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_avatar_images_updated_at
    BEFORE UPDATE ON avatar_images
    FOR EACH ROW
    EXECUTE FUNCTION update_avatar_images_updated_at(); 