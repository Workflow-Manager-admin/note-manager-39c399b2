import { createClient } from "@supabase/supabase-js";

// PUBLIC_INTERFACE
/**
 * Returns a Supabase JS client instance connected to the provided project.
 */
export function getSupabaseClient() {
  // Prefer Vite env variables or fallback to injected ones
  const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://mzxyorlnbfdkneiezgjz.supabase.co";
  const supabaseKey =
    import.meta.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHlvcmxuYmZka25laWV6Z2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDUxMDksImV4cCI6MjA2NzYyMTEwOX0.URYpbwtC2u5ORBlUzpWPNspXMWq_cLBOKWMOgGbilyQ";
  return createClient(supabaseUrl, supabaseKey);
}
