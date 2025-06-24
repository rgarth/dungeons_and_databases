-- Fix remaining RLS issues: auth function optimization and multiple permissive policies

-- 1. Fix auth function calls for Subrace and ClassSpellLimits tables
DROP POLICY IF EXISTS "Allow read access to subrace for authenticated users" ON "Subrace";
DROP POLICY IF EXISTS "Allow read access to class_spell_limits for authenticated users" ON "ClassSpellLimits";

CREATE POLICY "subrace_read_policy"
ON "Subrace" FOR SELECT USING ((select auth.role()) = 'authenticated');

CREATE POLICY "class_spell_limits_read_policy"
ON "ClassSpellLimits" FOR SELECT USING ((select auth.role()) = 'authenticated');

-- 2. Fix multiple permissive policies by consolidating auth table policies
-- The issue is that we have both user-specific policies and service role policies
-- We need to make the service role policy more specific to avoid conflicts

-- Drop existing policies for auth tables
DROP POLICY IF EXISTS "Users can manage their own accounts" ON "Account";
DROP POLICY IF EXISTS "Users can manage their own sessions" ON "Session";
DROP POLICY IF EXISTS "Users can manage their own user data" ON "User";
DROP POLICY IF EXISTS "Service role can manage all data" ON "Account";
DROP POLICY IF EXISTS "Service role can manage all data" ON "Session";
DROP POLICY IF EXISTS "Service role can manage all data" ON "User";

-- Create consolidated policies that handle both user access and service role access
-- Service role gets full access, authenticated users get access to their own data
CREATE POLICY "account_access_policy"
ON "Account"
USING (
  (select auth.role()) = 'service_role' OR 
  ((select auth.role()) = 'authenticated' AND (select auth.uid()) = "userId"::uuid)
);

CREATE POLICY "session_access_policy"
ON "Session"
USING (
  (select auth.role()) = 'service_role' OR 
  ((select auth.role()) = 'authenticated' AND (select auth.uid()) = "userId"::uuid)
);

CREATE POLICY "user_access_policy"
ON "User"
USING (
  (select auth.role()) = 'service_role' OR 
  ((select auth.role()) = 'authenticated' AND (select auth.uid()) = id::uuid)
); 