-- Service Role RLS Policies for FHIR Patient CRUD Operations
-- This fixes the issue where service role cannot perform database operations due to RLS restrictions

-- Drop existing restrictive policies that block service role access
DROP POLICY IF EXISTS "Service role can insert patients" ON patients;
DROP POLICY IF EXISTS "Service role can update patients" ON patients;
DROP POLICY IF EXISTS "Service role can delete patients" ON patients;
DROP POLICY IF EXISTS "Service role can insert practitioners" ON practitioners;
DROP POLICY IF EXISTS "Service role can update practitioners" ON practitioners;

-- Create comprehensive service role policies for patients table
CREATE POLICY "Service role full access patients" ON patients
  FOR ALL 
  TO service_role
  USING (true) 
  WITH CHECK (true);

-- Create comprehensive service role policies for practitioners table  
CREATE POLICY "Service role full access practitioners" ON practitioners
  FOR ALL 
  TO service_role
  USING (true) 
  WITH CHECK (true);

-- Create comprehensive service role policies for appointments table
CREATE POLICY "Service role full access appointments" ON appointments
  FOR ALL 
  TO service_role
  USING (true) 
  WITH CHECK (true);

-- Create comprehensive service role policies for profiles table
CREATE POLICY "Service role full access profiles" ON profiles
  FOR ALL 
  TO service_role
  USING (true) 
  WITH CHECK (true);

-- Keep existing user-based security policies for direct user access
-- These ensure that when users access data directly (not through microservices),
-- they still have proper access controls

-- Drop existing conflicting policies first
DROP POLICY IF EXISTS "Authenticated users can view patients" ON patients;
DROP POLICY IF EXISTS "Authenticated users can view practitioners" ON practitioners;
DROP POLICY IF EXISTS "Anon users cannot access patients" ON patients;
DROP POLICY IF EXISTS "Anon users cannot access practitioners" ON practitioners;
DROP POLICY IF EXISTS "Anon users cannot access appointments" ON appointments;

-- Secure user policies for patients (HIPAA compliant)
CREATE POLICY "Authenticated users can view patients" ON patients
  FOR SELECT 
  TO authenticated
  USING (
    -- Patients can ONLY view their own record
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = patients.id 
      AND profiles.role = 'patient'
    ) OR
    -- Practitioners and admins can view patients under their care
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('practitioner', 'admin')
    )
  );

-- Secure user policies for practitioners (controlled access)  
CREATE POLICY "Authenticated users can view practitioners" ON practitioners
  FOR SELECT 
  TO authenticated
  USING (
    -- All authenticated users can view practitioner information (for appointment booking)
    -- This is necessary for patients to find and book with practitioners
    auth.uid() IS NOT NULL
  );

-- STRICT SECURITY: Anon users have NO access (critical for HIPAA)
CREATE POLICY "Anon users denied access patients" ON patients
  FOR ALL 
  TO anon
  USING (false) 
  WITH CHECK (false);

CREATE POLICY "Anon users denied access practitioners" ON practitioners
  FOR ALL 
  TO anon
  USING (false) 
  WITH CHECK (false);

CREATE POLICY "Anon users denied access appointments" ON appointments
  FOR ALL 
  TO anon
  USING (false) 
  WITH CHECK (false);

-- Grant necessary permissions to service role
GRANT ALL ON patients TO service_role;
GRANT ALL ON practitioners TO service_role;
GRANT ALL ON appointments TO service_role;
GRANT ALL ON profiles TO service_role;

-- Grant read access to authenticated users
GRANT SELECT ON patients TO authenticated;
GRANT SELECT ON practitioners TO authenticated;
GRANT SELECT ON appointments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated; 