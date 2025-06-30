-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums for type safety
CREATE TYPE appointment_status AS ENUM (
  'proposed', 'pending', 'booked', 'arrived', 'fulfilled', 
  'cancelled', 'noshow', 'entered-in-error', 'checked-in', 'waitlist'
);

CREATE TYPE gender AS ENUM ('male', 'female', 'other', 'unknown');

CREATE TYPE user_role AS ENUM ('patient', 'practitioner', 'admin');

CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'trial');

CREATE TYPE subscription_plan AS ENUM ('basic', 'premium', 'evercare');

-- User profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'patient',
  fhir_resource_id UUID, -- Reference to Patient or Practitioner
  subscription_status subscription_status DEFAULT 'trial',
  subscription_plan subscription_plan,
  last_login TIMESTAMPTZ
);

-- FHIR Patient Resource Table
CREATE TABLE patients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  identifier JSONB[] DEFAULT '{}', -- FHIR Identifier array
  name JSONB[] NOT NULL DEFAULT '{}', -- HumanName array (required)
  telecom JSONB[] DEFAULT '{}', -- ContactPoint array
  gender gender NOT NULL,
  birth_date DATE,
  address JSONB[] DEFAULT '{}', -- Address array
  marital_status JSONB, -- CodeableConcept
  contact JSONB[] DEFAULT '{}', -- Patient.contact array
  communication JSONB[] DEFAULT '{}', -- Patient.communication array
  general_practitioner JSONB[] DEFAULT '{}', -- Reference array
  managing_organization UUID, -- Reference to Organization
  link JSONB[] DEFAULT '{}', -- Patient.link array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- FHIR Practitioner Resource Table
CREATE TABLE practitioners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  identifier JSONB[] DEFAULT '{}', -- FHIR Identifier array
  name JSONB[] NOT NULL DEFAULT '{}', -- HumanName array (required)
  telecom JSONB[] DEFAULT '{}', -- ContactPoint array
  address JSONB[] DEFAULT '{}', -- Address array
  gender gender,
  birth_date DATE,
  photo JSONB[], -- Attachment array
  qualification JSONB[] DEFAULT '{}', -- Practitioner.qualification array
  communication JSONB[] DEFAULT '{}', -- CodeableConcept array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- FHIR Appointment Resource Table
CREATE TABLE appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status appointment_status NOT NULL,
  service_category JSONB[], -- CodeableConcept array
  service_type JSONB[], -- CodeableConcept array
  specialty JSONB[], -- CodeableConcept array
  appointment_type JSONB, -- CodeableConcept
  reason_code JSONB[], -- CodeableConcept array
  reason_reference JSONB[], -- Reference array
  priority INTEGER CHECK (priority >= 0),
  description TEXT,
  supporting_information JSONB[], -- Reference array
  start TIMESTAMPTZ NOT NULL, -- dateTime (required)
  "end" TIMESTAMPTZ NOT NULL, -- dateTime (required)
  minutes_duration INTEGER CHECK (minutes_duration > 0),
  slot JSONB[], -- Reference array to Slot
  created TIMESTAMPTZ, -- dateTime
  comment TEXT,
  patient_instruction TEXT,
  based_on JSONB[], -- Reference array
  participant JSONB[] NOT NULL, -- Appointment.participant array (required)
  requested_period JSONB[], -- Period array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- Create indexes for better performance
CREATE INDEX idx_patients_active ON patients(active);
CREATE INDEX idx_patients_identifier ON patients USING GIN(identifier);
CREATE INDEX idx_patients_name ON patients USING GIN(name);
CREATE INDEX idx_patients_gender ON patients(gender);
CREATE INDEX idx_patients_birth_date ON patients(birth_date);

CREATE INDEX idx_practitioners_active ON practitioners(active);
CREATE INDEX idx_practitioners_identifier ON practitioners USING GIN(identifier);
CREATE INDEX idx_practitioners_name ON practitioners USING GIN(name);
CREATE INDEX idx_practitioners_qualification ON practitioners USING GIN(qualification);

CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_start ON appointments(start);
CREATE INDEX idx_appointments_end ON appointments("end");
CREATE INDEX idx_appointments_participant ON appointments USING GIN(participant);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_subscription_status ON profiles(subscription_status);
CREATE INDEX idx_profiles_fhir_resource_id ON profiles(fhir_resource_id);

-- Enable Row Level Security (RLS) for HIPAA compliance
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for patients table
CREATE POLICY "Patients can view their own record" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = patients.id
      AND profiles.role = 'patient'
    )
  );

CREATE POLICY "Practitioners can view their patients" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Admins can view all patients" ON patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for practitioners table
CREATE POLICY "Practitioners can view their own record" ON practitioners
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = practitioners.id
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "All authenticated users can view practitioners" ON practitioners
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- RLS Policies for appointments table
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (
        -- Patient viewing their appointments
        (profiles.role = 'patient' AND 
         participant::text LIKE '%' || profiles.fhir_resource_id || '%') OR
        -- Practitioner viewing their appointments
        (profiles.role = 'practitioner' AND 
         participant::text LIKE '%' || profiles.fhir_resource_id || '%') OR
        -- Admin viewing all appointments
        profiles.role = 'admin'
      )
    )
  );

-- Functions to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at 
  BEFORE UPDATE ON patients 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_practitioners_updated_at 
  BEFORE UPDATE ON practitioners 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at 
  BEFORE UPDATE ON appointments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 