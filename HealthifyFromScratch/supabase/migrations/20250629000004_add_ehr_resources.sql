-- Migration to add core EHR FHIR resources
-- These are essential clinical data resources for a complete EHR system

-- Create enums for EHR resources
CREATE TYPE observation_status AS ENUM (
  'registered', 'preliminary', 'final', 'amended', 'corrected', 
  'cancelled', 'entered-in-error', 'unknown'
);

CREATE TYPE condition_verification_status AS ENUM (
  'unconfirmed', 'provisional', 'differential', 'confirmed', 'refuted', 'entered-in-error'
);

CREATE TYPE condition_clinical_status AS ENUM (
  'active', 'recurrence', 'relapse', 'inactive', 'remission', 'resolved'
);

CREATE TYPE medication_request_status AS ENUM (
  'active', 'on-hold', 'cancelled', 'completed', 'entered-in-error', 'stopped', 'draft', 'unknown'
);

CREATE TYPE medication_request_intent AS ENUM (
  'proposal', 'plan', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option'
);

CREATE TYPE allergy_verification_status AS ENUM (
  'unconfirmed', 'confirmed', 'refuted', 'entered-in-error'
);

CREATE TYPE allergy_clinical_status AS ENUM (
  'active', 'inactive', 'resolved'
);

CREATE TYPE diagnostic_report_status AS ENUM (
  'registered', 'partial', 'preliminary', 'final', 'amended', 'corrected', 
  'appended', 'cancelled', 'entered-in-error', 'unknown'
);

-- FHIR Observation Resource Table (lab results, vital signs, measurements)
CREATE TABLE observations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status observation_status NOT NULL,
  category JSONB[] DEFAULT '{}', -- CodeableConcept array
  code JSONB NOT NULL, -- CodeableConcept (required) - what was observed
  subject UUID NOT NULL, -- Reference to Patient (required)
  encounter UUID, -- Reference to Encounter
  effective_datetime TIMESTAMPTZ, -- When observation was made
  effective_period JSONB, -- Period when observation was made
  issued TIMESTAMPTZ, -- When observation was published
  performer JSONB[] DEFAULT '{}', -- Reference array to who performed
  value_quantity JSONB, -- Quantity value
  value_codeable_concept JSONB, -- CodeableConcept value
  value_string TEXT, -- String value
  value_boolean BOOLEAN, -- Boolean value
  value_integer INTEGER, -- Integer value
  value_range JSONB, -- Range value
  value_ratio JSONB, -- Ratio value
  value_sampled_data JSONB, -- SampledData value
  value_time TIME, -- Time value
  value_datetime TIMESTAMPTZ, -- DateTime value
  value_period JSONB, -- Period value
  data_absent_reason JSONB, -- CodeableConcept for missing data
  interpretation JSONB[] DEFAULT '{}', -- CodeableConcept array
  note JSONB[] DEFAULT '{}', -- Annotation array
  body_site JSONB, -- CodeableConcept for body site
  method JSONB, -- CodeableConcept for method
  specimen UUID, -- Reference to Specimen
  device UUID, -- Reference to Device
  reference_range JSONB[] DEFAULT '{}', -- Observation.referenceRange array
  has_member JSONB[] DEFAULT '{}', -- Reference array to related observations
  derived_from JSONB[] DEFAULT '{}', -- Reference array to source observations
  component JSONB[] DEFAULT '{}', -- Observation.component array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- FHIR Condition Resource Table (diagnoses, medical conditions)
CREATE TABLE conditions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  clinical_status condition_clinical_status,
  verification_status condition_verification_status,
  category JSONB[] DEFAULT '{}', -- CodeableConcept array
  severity JSONB, -- CodeableConcept
  code JSONB, -- CodeableConcept - the condition/diagnosis
  body_site JSONB[] DEFAULT '{}', -- CodeableConcept array
  subject UUID NOT NULL, -- Reference to Patient (required)
  encounter UUID, -- Reference to Encounter
  onset_datetime TIMESTAMPTZ, -- When condition started
  onset_age JSONB, -- Age when started
  onset_period JSONB, -- Period when started
  onset_range JSONB, -- Range when started
  onset_string TEXT, -- String description of onset
  abatement_datetime TIMESTAMPTZ, -- When condition ended
  abatement_age JSONB, -- Age when ended
  abatement_period JSONB, -- Period when ended
  abatement_range JSONB, -- Range when ended
  abatement_string TEXT, -- String description of end
  recorded_date DATE, -- When condition was recorded
  recorder UUID, -- Reference to who recorded
  asserter UUID, -- Reference to who asserted
  stage JSONB[] DEFAULT '{}', -- Condition.stage array
  evidence JSONB[] DEFAULT '{}', -- Condition.evidence array
  note JSONB[] DEFAULT '{}', -- Annotation array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- FHIR MedicationRequest Resource Table (prescriptions)
CREATE TABLE medication_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status medication_request_status NOT NULL,
  intent medication_request_intent NOT NULL,
  category JSONB[] DEFAULT '{}', -- CodeableConcept array
  priority TEXT CHECK (priority IN ('routine', 'urgent', 'asap', 'stat')),
  do_not_perform BOOLEAN DEFAULT false,
  reported_boolean BOOLEAN,
  reported_reference UUID, -- Reference to who reported
  medication_codeable_concept JSONB, -- CodeableConcept for medication
  medication_reference UUID, -- Reference to Medication
  subject UUID NOT NULL, -- Reference to Patient (required)
  encounter UUID, -- Reference to Encounter
  supporting_information JSONB[] DEFAULT '{}', -- Reference array
  authored_on TIMESTAMPTZ, -- When prescription was written
  requester UUID, -- Reference to prescriber
  performer UUID, -- Reference to intended dispenser
  performer_type JSONB, -- CodeableConcept for performer type
  recorder UUID, -- Reference to who recorded
  reason_code JSONB[] DEFAULT '{}', -- CodeableConcept array
  reason_reference JSONB[] DEFAULT '{}', -- Reference array
  instantiates_canonical TEXT[], -- Canonical URLs
  instantiates_uri TEXT[], -- URIs
  based_on JSONB[] DEFAULT '{}', -- Reference array
  group_identifier JSONB, -- Identifier
  course_of_therapy_type JSONB, -- CodeableConcept
  insurance JSONB[] DEFAULT '{}', -- Reference array
  note JSONB[] DEFAULT '{}', -- Annotation array
  dosage_instruction JSONB[] DEFAULT '{}', -- Dosage array
  dispense_request JSONB, -- MedicationRequest.dispenseRequest
  substitution JSONB, -- MedicationRequest.substitution
  prior_prescription UUID, -- Reference to prior prescription
  detection_issue JSONB[] DEFAULT '{}', -- Reference array
  event_history JSONB[] DEFAULT '{}', -- Reference array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- FHIR AllergyIntolerance Resource Table
CREATE TABLE allergy_intolerances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  clinical_status allergy_clinical_status,
  verification_status allergy_verification_status,
  type TEXT CHECK (type IN ('allergy', 'intolerance')),
  category TEXT[] DEFAULT '{}' CHECK (category <@ ARRAY['food', 'medication', 'environment', 'biologic']),
  criticality TEXT CHECK (criticality IN ('low', 'high', 'unable-to-assess')),
  code JSONB, -- CodeableConcept for substance
  patient UUID NOT NULL, -- Reference to Patient (required)
  encounter UUID, -- Reference to Encounter
  onset_datetime TIMESTAMPTZ, -- When allergy started
  onset_age JSONB, -- Age when started
  onset_period JSONB, -- Period when started
  onset_range JSONB, -- Range when started
  onset_string TEXT, -- String description of onset
  recorded_date TIMESTAMPTZ, -- When allergy was recorded
  recorder UUID, -- Reference to who recorded
  asserter UUID, -- Reference to who asserted
  last_occurrence TIMESTAMPTZ, -- Last known occurrence
  note JSONB[] DEFAULT '{}', -- Annotation array
  reaction JSONB[] DEFAULT '{}', -- AllergyIntolerance.reaction array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- FHIR DiagnosticReport Resource Table
CREATE TABLE diagnostic_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status diagnostic_report_status NOT NULL,
  category JSONB[] DEFAULT '{}', -- CodeableConcept array
  code JSONB NOT NULL, -- CodeableConcept (required) - type of report
  subject UUID NOT NULL, -- Reference to Patient (required)
  encounter UUID, -- Reference to Encounter
  effective_datetime TIMESTAMPTZ, -- When diagnostic was performed
  effective_period JSONB, -- Period when performed
  issued TIMESTAMPTZ, -- When report was released
  performer JSONB[] DEFAULT '{}', -- Reference array to who performed
  results_interpreter JSONB[] DEFAULT '{}', -- Reference array to interpreters
  specimen JSONB[] DEFAULT '{}', -- Reference array to specimens
  result JSONB[] DEFAULT '{}', -- Reference array to observations
  imaging_study JSONB[] DEFAULT '{}', -- Reference array to imaging
  media JSONB[] DEFAULT '{}', -- DiagnosticReport.media array
  conclusion TEXT, -- Clinical interpretation
  conclusion_code JSONB[] DEFAULT '{}', -- CodeableConcept array
  presented_form JSONB[] DEFAULT '{}', -- Attachment array
  extension JSONB[], -- FHIR Extensions
  meta JSONB -- FHIR Meta
);

-- Create indexes for better performance
CREATE INDEX idx_observations_status ON observations(status);
CREATE INDEX idx_observations_subject ON observations(subject);
CREATE INDEX idx_observations_category ON observations USING GIN(category);
CREATE INDEX idx_observations_code ON observations USING GIN(code);
CREATE INDEX idx_observations_effective_datetime ON observations(effective_datetime);

CREATE INDEX idx_conditions_clinical_status ON conditions(clinical_status);
CREATE INDEX idx_conditions_verification_status ON conditions(verification_status);
CREATE INDEX idx_conditions_subject ON conditions(subject);
CREATE INDEX idx_conditions_category ON conditions USING GIN(category);
CREATE INDEX idx_conditions_code ON conditions USING GIN(code);

CREATE INDEX idx_medication_requests_status ON medication_requests(status);
CREATE INDEX idx_medication_requests_intent ON medication_requests(intent);
CREATE INDEX idx_medication_requests_subject ON medication_requests(subject);
CREATE INDEX idx_medication_requests_authored_on ON medication_requests(authored_on);

CREATE INDEX idx_allergy_intolerances_clinical_status ON allergy_intolerances(clinical_status);
CREATE INDEX idx_allergy_intolerances_patient ON allergy_intolerances(patient);
CREATE INDEX idx_allergy_intolerances_category ON allergy_intolerances USING GIN(category);

CREATE INDEX idx_diagnostic_reports_status ON diagnostic_reports(status);
CREATE INDEX idx_diagnostic_reports_subject ON diagnostic_reports(subject);
CREATE INDEX idx_diagnostic_reports_category ON diagnostic_reports USING GIN(category);
CREATE INDEX idx_diagnostic_reports_effective_datetime ON diagnostic_reports(effective_datetime);

-- Enable Row Level Security (RLS) for HIPAA compliance
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergy_intolerances ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for observations table
CREATE POLICY "Patients can view their own observations" ON observations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = observations.subject
      AND profiles.role = 'patient'
    )
  );

CREATE POLICY "Practitioners can view their patients' observations" ON observations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Service role full access observations" ON observations
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for conditions table
CREATE POLICY "Patients can view their own conditions" ON conditions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = conditions.subject
      AND profiles.role = 'patient'
    )
  );

CREATE POLICY "Practitioners can view their patients' conditions" ON conditions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Service role full access conditions" ON conditions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for medication_requests table
CREATE POLICY "Patients can view their own medication requests" ON medication_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = medication_requests.subject
      AND profiles.role = 'patient'
    )
  );

CREATE POLICY "Practitioners can view their patients' medication requests" ON medication_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Service role full access medication requests" ON medication_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for allergy_intolerances table
CREATE POLICY "Patients can view their own allergies" ON allergy_intolerances
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = allergy_intolerances.patient
      AND profiles.role = 'patient'
    )
  );

CREATE POLICY "Practitioners can view their patients' allergies" ON allergy_intolerances
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Service role full access allergies" ON allergy_intolerances
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- RLS Policies for diagnostic_reports table
CREATE POLICY "Patients can view their own diagnostic reports" ON diagnostic_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.fhir_resource_id = diagnostic_reports.subject
      AND profiles.role = 'patient'
    )
  );

CREATE POLICY "Practitioners can view their patients' diagnostic reports" ON diagnostic_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'practitioner'
    )
  );

CREATE POLICY "Service role full access diagnostic reports" ON diagnostic_reports
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Grant permissions to service role
GRANT ALL ON observations TO service_role;
GRANT ALL ON conditions TO service_role;
GRANT ALL ON medication_requests TO service_role;
GRANT ALL ON allergy_intolerances TO service_role;
GRANT ALL ON diagnostic_reports TO service_role;

-- Add updated_at triggers for all new tables
CREATE TRIGGER update_observations_updated_at 
  BEFORE UPDATE ON observations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conditions_updated_at 
  BEFORE UPDATE ON conditions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medication_requests_updated_at 
  BEFORE UPDATE ON medication_requests 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_allergy_intolerances_updated_at 
  BEFORE UPDATE ON allergy_intolerances 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diagnostic_reports_updated_at 
  BEFORE UPDATE ON diagnostic_reports 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 