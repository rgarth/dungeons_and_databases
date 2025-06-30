-- Add unique constraint to name column in ammunition_suggestions
ALTER TABLE ammunition_suggestions ADD CONSTRAINT ammunition_suggestions_name_unique UNIQUE (name); 