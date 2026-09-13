import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service_role key.
 *
 * This file must NEVER be imported from a "use client" component or
 * any code that ships to the browser — the service_role key bypasses
 * Row Level Security entirely. It is only safe here because Next.js
 * API routes and server components run exclusively on the server.
 */
export function createServerSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    // Fail loudly and clearly at request time rather than letting a
    // library throw an obscure low-level error (see spec §15).
    throw new Error(
      "Server misconfiguration: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
