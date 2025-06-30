-- Add missing RLS policies for patients table INSERT, UPDATE, DELETE operations
-- This fixes the issue where patient creation was failing due to missing permissions

-- RLS Policies for patients table - INSERT operations
CREATE POLICY "Service role can insert patients" ON patients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Practitioners can create patient records" ON patients
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('practitioner', 'admin')
    )
  );

CREATE POLICY "Patients can create their own record" ON patients
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'patient'
    )
  );

-- RLS Policies for patients table - UPDATE operations
CREATE POLICY "Service role can update patients" ON patients
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Practitioners can update their patients" ON patients
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('practitioner', 'admin')
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('practitioner', 'admin')
    )
  );

CREATE POLICY "Patients can update their own record" ON patients
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = patients.id
      AND profiles.role = 'patient'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = patients.id
      AND profiles.role = 'patient'
    )
  );

-- RLS Policies for patients table - DELETE operations (soft delete)
CREATE POLICY "Service role can delete patients" ON patients
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Admins can delete patients" ON patients
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Add similar policies for practitioners table
CREATE POLICY "Service role can insert practitioners" ON practitioners
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Practitioners can create their own record" ON practitioners
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('practitioner', 'admin')
    )
  );

CREATE POLICY "Service role can update practitioners" ON practitioners
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Practitioners can update their own record" ON practitioners
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = practitioners.id
      AND profiles.role = 'practitioner'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = practitioners.id
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Admins can update practitioners" ON practitioners
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  ); 