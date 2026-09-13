/**
 * Central place to read environment variables.
 *
 * Nothing in the app should call `process.env.X` directly outside this
 * file — that way every required variable is validated in one place, and
 * a missing variable produces one clear error instead of an obscure
 * runtime crash somewhere deep in a library (see PROJECT REQUIREMENTS
 * §15). Full validation logic (with Zod) is added in Phase 3 once the
 * Supabase project exists; this Phase-1 version just establishes the
 * pattern the rest of the app will follow.
 */

export const publicConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

// NOTE: Server-only secrets (SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL) are
// deliberately NOT read here yet. They will be added in
// `server/db/client.ts` in Phase 3, and that module will be the only
// place in the codebase allowed to import them. This keeps secret access
// isolated to server-only code from day one.
