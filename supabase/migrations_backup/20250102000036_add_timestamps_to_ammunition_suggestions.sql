-- Add timestamps to AmmunitionSuggestion table
ALTER TABLE "AmmunitionSuggestion" 
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Create trigger to update updatedAt on row updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ammunition_suggestion_updated_at 
    BEFORE UPDATE ON "AmmunitionSuggestion" 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 