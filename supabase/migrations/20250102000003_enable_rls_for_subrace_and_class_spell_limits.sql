-- Enable RLS for subrace table
ALTER TABLE public."Subrace" ENABLE ROW LEVEL SECURITY;

-- Enable RLS for class_spell_limits table
ALTER TABLE public."ClassSpellLimits" ENABLE ROW LEVEL SECURITY;

-- Create policies for subrace table (read-only for all authenticated users)
CREATE POLICY "Allow read access to subrace for authenticated users" ON public."Subrace"
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for class_spell_limits table (read-only for all authenticated users)
CREATE POLICY "Allow read access to class_spell_limits for authenticated users" ON public."ClassSpellLimits"
    FOR SELECT USING (auth.role() = 'authenticated'); 