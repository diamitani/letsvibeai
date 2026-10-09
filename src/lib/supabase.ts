import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_anon_key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  tier?: 'solo' | 'team' | 'startup' | 'enterprise';
  created_at?: string;
}

export interface CourseProgressRecord {
  id?: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  score?: number;
  notes?: string;
  updated_at?: string;
}

/**
 * Sign up with email & password
 */
export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
}

/**
 * Sign in with email & password
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Sign in with OAuth provider (Google, GitHub, Apple)
 */
export async function signInWithOAuthProvider(provider: 'google' | 'github' | 'apple') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });
  return { data, error };
}

/**
 * Send magic login link
 */
export async function sendMagicLinkEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });
  return { data, error };
}

/**
 * Sign out current session
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current session user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Capture waitlist / student lead in Supabase
 */
export async function captureStudentLead(email: string, fullName?: string, interest?: string) {
  try {
    const { data, error } = await supabase
      .from('student_leads')
      .upsert({
        email,
        full_name: fullName,
        interest: interest || 'vibe-coding-course',
        created_at: new Date().toISOString(),
      }, { onConflict: 'email' });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}
