export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // FHIR Patient Resource
      patients: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          active: boolean
          identifier: Json[] // FHIR Identifier array
          name: Json[] // HumanName array
          telecom: Json[] // ContactPoint array
          gender: 'male' | 'female' | 'other' | 'unknown'
          birth_date: string | null
          address: Json[] // Address array
          marital_status: Json | null // CodeableConcept
          contact: Json[] // Patient.contact array
          communication: Json[] // Patient.communication array
          general_practitioner: Json[] // Reference array
          managing_organization: string | null // Reference to Organization
          link: Json[] // Patient.link array
          extension: Json[] | null // FHIR Extensions
          meta: Json | null // FHIR Meta
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          active?: boolean
          identifier?: Json[]
          name: Json[]
          telecom?: Json[]
          gender: 'male' | 'female' | 'other' | 'unknown'
          birth_date?: string | null
          address?: Json[]
          marital_status?: Json | null
          contact?: Json[]
          communication?: Json[]
          general_practitioner?: Json[]
          managing_organization?: string | null
          link?: Json[]
          extension?: Json[] | null
          meta?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          active?: boolean
          identifier?: Json[]
          name?: Json[]
          telecom?: Json[]
          gender?: 'male' | 'female' | 'other' | 'unknown'
          birth_date?: string | null
          address?: Json[]
          marital_status?: Json | null
          contact?: Json[]
          communication?: Json[]
          general_practitioner?: Json[]
          managing_organization?: string | null
          link?: Json[]
          extension?: Json[] | null
          meta?: Json | null
        }
      }
      // FHIR Practitioner Resource
      practitioners: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          active: boolean
          identifier: Json[] // FHIR Identifier array
          name: Json[] // HumanName array
          telecom: Json[] // ContactPoint array
          address: Json[] // Address array
          gender: 'male' | 'female' | 'other' | 'unknown' | null
          birth_date: string | null
          photo: Json[] | null // Attachment array
          qualification: Json[] // Practitioner.qualification array
          communication: Json[] // CodeableConcept array
          extension: Json[] | null // FHIR Extensions
          meta: Json | null // FHIR Meta
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          active?: boolean
          identifier?: Json[]
          name: Json[]
          telecom?: Json[]
          address?: Json[]
          gender?: 'male' | 'female' | 'other' | 'unknown' | null
          birth_date?: string | null
          photo?: Json[] | null
          qualification?: Json[]
          communication?: Json[]
          extension?: Json[] | null
          meta?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          active?: boolean
          identifier?: Json[]
          name?: Json[]
          telecom?: Json[]
          address?: Json[]
          gender?: 'male' | 'female' | 'other' | 'unknown' | null
          birth_date?: string | null
          photo?: Json[] | null
          qualification?: Json[]
          communication?: Json[]
          extension?: Json[] | null
          meta?: Json | null
        }
      }
      // FHIR Appointment Resource
      appointments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          status: 'proposed' | 'pending' | 'booked' | 'arrived' | 'fulfilled' | 'cancelled' | 'noshow' | 'entered-in-error' | 'checked-in' | 'waitlist'
          service_category: Json[] | null // CodeableConcept array
          service_type: Json[] | null // CodeableConcept array
          specialty: Json[] | null // CodeableConcept array
          appointment_type: Json | null // CodeableConcept
          reason_code: Json[] | null // CodeableConcept array
          reason_reference: Json[] | null // Reference array
          priority: number | null
          description: string | null
          supporting_information: Json[] | null // Reference array
          start: string // dateTime
          end: string // dateTime
          minutes_duration: number | null
          slot: Json[] | null // Reference array to Slot
          created: string | null // dateTime
          comment: string | null
          patient_instruction: string | null
          based_on: Json[] | null // Reference array
          participant: Json[] // Appointment.participant array (required)
          requested_period: Json[] | null // Period array
          extension: Json[] | null // FHIR Extensions
          meta: Json | null // FHIR Meta
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          status: 'proposed' | 'pending' | 'booked' | 'arrived' | 'fulfilled' | 'cancelled' | 'noshow' | 'entered-in-error' | 'checked-in' | 'waitlist'
          service_category?: Json[] | null
          service_type?: Json[] | null
          specialty?: Json[] | null
          appointment_type?: Json | null
          reason_code?: Json[] | null
          reason_reference?: Json[] | null
          priority?: number | null
          description?: string | null
          supporting_information?: Json[] | null
          start: string
          end: string
          minutes_duration?: number | null
          slot?: Json[] | null
          created?: string | null
          comment?: string | null
          patient_instruction?: string | null
          based_on?: Json[] | null
          participant: Json[]
          requested_period?: Json[] | null
          extension?: Json[] | null
          meta?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: 'proposed' | 'pending' | 'booked' | 'arrived' | 'fulfilled' | 'cancelled' | 'noshow' | 'entered-in-error' | 'checked-in' | 'waitlist'
          service_category?: Json[] | null
          service_type?: Json[] | null
          specialty?: Json[] | null
          appointment_type?: Json | null
          reason_code?: Json[] | null
          reason_reference?: Json[] | null
          priority?: number | null
          description?: string | null
          supporting_information?: Json[] | null
          start?: string
          end?: string
          minutes_duration?: number | null
          slot?: Json[] | null
          created?: string | null
          comment?: string | null
          patient_instruction?: string | null
          based_on?: Json[] | null
          participant?: Json[]
          requested_period?: Json[] | null
          extension?: Json[] | null
          meta?: Json | null
        }
      }
      // User profiles (extends Supabase auth.users)
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'patient' | 'practitioner' | 'admin'
          fhir_resource_id: string | null // Reference to Patient or Practitioner
          subscription_status: 'active' | 'inactive' | 'cancelled' | 'trial'
          subscription_plan: 'basic' | 'premium' | 'evercare' | null
          last_login: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role: 'patient' | 'practitioner' | 'admin'
          fhir_resource_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'cancelled' | 'trial'
          subscription_plan?: 'basic' | 'premium' | 'evercare' | null
          last_login?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'patient' | 'practitioner' | 'admin'
          fhir_resource_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'cancelled' | 'trial'
          subscription_plan?: 'basic' | 'premium' | 'evercare' | null
          last_login?: string | null
        }
      }
    }
    Views: {
      [_: never]: never
    }
    Functions: {
      [_: never]: never
    }
    Enums: {
      appointment_status: 'proposed' | 'pending' | 'booked' | 'arrived' | 'fulfilled' | 'cancelled' | 'noshow' | 'entered-in-error' | 'checked-in' | 'waitlist'
      gender: 'male' | 'female' | 'other' | 'unknown'
      user_role: 'patient' | 'practitioner' | 'admin'
      subscription_status: 'active' | 'inactive' | 'cancelled' | 'trial'
      subscription_plan: 'basic' | 'premium' | 'evercare'
    }
  }
} 