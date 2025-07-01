-- Add user preferences table
-- This allows users to customize their experience

CREATE TABLE IF NOT EXISTS "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint to ensure one preference per user per key
CREATE UNIQUE INDEX IF NOT EXISTS "UserPreference_userId_key_key" ON "UserPreference"("userId", "key");

-- Add foreign key constraint
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Enable RLS
ALTER TABLE "UserPreference" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own preferences" ON "UserPreference"
    FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert their own preferences" ON "UserPreference"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Users can update their own preferences" ON "UserPreference"
    FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Users can delete their own preferences" ON "UserPreference"
    FOR DELETE USING (auth.uid()::text = "userId");

-- Insert default preferences for existing users
-- This will be handled by the application when users first access preferences 