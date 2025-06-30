// Supabase Integration Index
export { supabase, supabaseAdmin } from './client';
export type { Database, Json } from './types';

// Re-export common Supabase types for convenience
export type {
  User,
  Session,
  AuthChangeEvent,
  AuthError,
  Provider
} from '@supabase/supabase-js'; 