-- Fix profile creation policy to allow service role access
-- This migration addresses the issue where service role cannot create profiles during user registration

-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create a new policy that allows both user self-insertion and service role insertion
CREATE POLICY "Allow profile creation" ON profiles
  FOR INSERT WITH CHECK (
    -- Allow users to insert their own profile
    auth.uid() = id 
    OR 
    -- Allow service role to insert profiles (for registration process)
    auth.jwt() ->> 'role' = 'service_role'
    OR
    -- Fallback: if no auth context, assume it's service role
    auth.uid() IS NULL
  );

-- Also update the select policy to allow service role to read profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

CREATE POLICY "Allow profile access" ON profiles
  FOR SELECT USING (
    -- Users can view their own profile
    auth.uid() = id 
    OR 
    -- Service role can view all profiles
    auth.jwt() ->> 'role' = 'service_role'
    OR
    -- Fallback: if no auth context, assume it's service role
    auth.uid() IS NULL
  );

-- Update the update policy as well for consistency
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

CREATE POLICY "Allow profile updates" ON profiles
  FOR UPDATE USING (
    -- Users can update their own profile
    auth.uid() = id 
    OR 
    -- Service role can update profiles
    auth.jwt() ->> 'role' = 'service_role'
    OR
    -- Fallback: if no auth context, assume it's service role
    auth.uid() IS NULL
  ); 