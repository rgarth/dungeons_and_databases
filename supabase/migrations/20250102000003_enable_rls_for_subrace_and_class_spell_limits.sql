-- Enable RLS for subrace table
ALTER TABLE public.subrace ENABLE ROW LEVEL SECURITY;

-- Enable RLS for class_spell_limits table
ALTER TABLE public.class_spell_limits ENABLE ROW LEVEL SECURITY;

-- Create policies for subrace table (read-only for all authenticated users)
CREATE POLICY "Allow read access to subrace for authenticated users" ON public.subrace
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for class_spell_limits table (read-only for all authenticated users)
CREATE POLICY "Allow read access to class_spell_limits for authenticated users" ON public.class_spell_limits
    FOR SELECT USING (auth.role() = 'authenticated'); 