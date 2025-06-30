// FHIR R4 Helper Utilities for Healthify Platform

export interface FHIRIdentifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  system?: string;
  value?: string;
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRHumanName {
  use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value?: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank?: number;
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRAddress {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
  type?: 'postal' | 'physical' | 'both';
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRCodeableConcept {
  coding?: Array<{
    system?: string;
    version?: string;
    code?: string;
    display?: string;
    userSelected?: boolean;
  }>;
  text?: string;
}

export interface FHIRReference {
  reference?: string;
  type?: string;
  identifier?: FHIRIdentifier;
  display?: string;
}

// Helper functions for creating FHIR compliant data structures

export function createFHIRIdentifier(
  system: string,
  value: string,
  use: FHIRIdentifier['use'] = 'usual'
): FHIRIdentifier {
  return {
    use,
    system,
    value
  };
}

export function createFHIRHumanName(
  family: string,
  given: string[],
  use: FHIRHumanName['use'] = 'usual'
): FHIRHumanName {
  return {
    use,
    family,
    given,
    text: `${given.join(' ')} ${family}`
  };
}

export function createFHIRContactPoint(
  system: FHIRContactPoint['system'],
  value: string,
  use: FHIRContactPoint['use'] = 'home'
): FHIRContactPoint {
  return {
    system,
    value,
    use
  };
}

export function createFHIRAddress(
  line: string[],
  city: string,
  state: string,
  postalCode: string,
  country: string = 'LK',
  use: FHIRAddress['use'] = 'home'
): FHIRAddress {
  return {
    use,
    type: 'both',
    line,
    city,
    state,
    postalCode,
    country,
    text: `${line.join(', ')}, ${city}, ${state} ${postalCode}, ${country}`
  };
}

export function createFHIRCodeableConcept(
  system: string,
  code: string,
  display: string
): FHIRCodeableConcept {
  return {
    coding: [{
      system,
      code,
      display
    }],
    text: display
  };
}

export function createFHIRReference(
  resourceType: string,
  id: string,
  display?: string
): FHIRReference {
  const ref: FHIRReference = {
    reference: `${resourceType}/${id}`
  };
  if (display) {
    ref.display = display;
  }
  return ref;
}

// Sri Lankan healthcare specific helpers
export const SriLankanHealthcareSystems = {
  NIC: 'http://health.gov.lk/identifier/nic',
  PASSPORT: 'http://health.gov.lk/identifier/passport',
  SLMC: 'http://slmc.lk/identifier/registration', // Sri Lanka Medical Council
  PHONE: 'http://health.gov.lk/identifier/phone',
  ADDRESS: 'http://health.gov.lk/address'
};

export function createSriLankanNICIdentifier(nic: string): FHIRIdentifier {
  return createFHIRIdentifier(SriLankanHealthcareSystems.NIC, nic, 'official');
}

export function createSriLankanPhoneContact(phone: string): FHIRContactPoint {
  return createFHIRContactPoint('phone', phone, 'mobile');
}

// FHIR Appointment participant helper
export interface FHIRAppointmentParticipant {
  type?: FHIRCodeableConcept[];
  actor?: FHIRReference;
  required?: 'required' | 'optional' | 'information-only';
  status: 'accepted' | 'declined' | 'tentative' | 'needs-action';
  period?: {
    start?: string;
    end?: string;
  };
}

export function createAppointmentParticipant(
  actorReference: FHIRReference,
  status: FHIRAppointmentParticipant['status'] = 'accepted',
  required: FHIRAppointmentParticipant['required'] = 'required'
): FHIRAppointmentParticipant {
  return {
    actor: actorReference,
    required,
    status
  };
}

// Validation helpers
export function validateFHIRDate(dateString: string): boolean {
  // FHIR date format: YYYY, YYYY-MM, or YYYY-MM-DD
  const fhirDatePattern = /^\d{4}(-\d{2})?(-\d{2})?$/;
  return fhirDatePattern.test(dateString);
}

export function validateFHIRDateTime(dateTimeString: string): boolean {
  // FHIR dateTime format validation
  try {
    const date = new Date(dateTimeString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}

// Data transformation helpers
export function patientToFHIRResource(patient: any) {
  return {
    resourceType: 'Patient',
    id: patient.id,
    meta: patient.meta,
    active: patient.active,
    identifier: patient.identifier,
    name: patient.name,
    telecom: patient.telecom,
    gender: patient.gender,
    birthDate: patient.birth_date,
    address: patient.address,
    maritalStatus: patient.marital_status,
    contact: patient.contact,
    communication: patient.communication,
    generalPractitioner: patient.general_practitioner,
    managingOrganization: patient.managing_organization ? {
      reference: `Organization/${patient.managing_organization}`
    } : undefined,
    link: patient.link,
    extension: patient.extension
  };
}

export function practitionerToFHIRResource(practitioner: any) {
  return {
    resourceType: 'Practitioner',
    id: practitioner.id,
    meta: practitioner.meta,
    active: practitioner.active,
    identifier: practitioner.identifier,
    name: practitioner.name,
    telecom: practitioner.telecom,
    address: practitioner.address,
    gender: practitioner.gender,
    birthDate: practitioner.birth_date,
    photo: practitioner.photo,
    qualification: practitioner.qualification,
    communication: practitioner.communication,
    extension: practitioner.extension
  };
}

export function appointmentToFHIRResource(appointment: any) {
  return {
    resourceType: 'Appointment',
    id: appointment.id,
    meta: appointment.meta,
    status: appointment.status,
    serviceCategory: appointment.service_category,
    serviceType: appointment.service_type,
    specialty: appointment.specialty,
    appointmentType: appointment.appointment_type,
    reasonCode: appointment.reason_code,
    reasonReference: appointment.reason_reference,
    priority: appointment.priority,
    description: appointment.description,
    supportingInformation: appointment.supporting_information,
    start: appointment.start,
    end: appointment.end,
    minutesDuration: appointment.minutes_duration,
    slot: appointment.slot,
    created: appointment.created,
    comment: appointment.comment,
    patientInstruction: appointment.patient_instruction,
    basedOn: appointment.based_on,
    participant: appointment.participant,
    requestedPeriod: appointment.requested_period,
    extension: appointment.extension
  };
} 