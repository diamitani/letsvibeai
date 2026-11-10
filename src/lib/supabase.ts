import { createClient } from '@supabase/supabase-js';

// The URL and publishable key are designed to be public (they ship to every
// browser). Data is protected by row-level security in the database.
// Override in Vercel with VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY.
const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || 'https://zuhacughnenhongixfre.supabase.co';
const key =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || 'sb_publishable_xYy_gCTN5FVDuJUxG8ShrA_TDMIYtu3';

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
