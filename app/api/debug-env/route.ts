import { NextResponse } from "next/server";

// TEMPORARY diagnostic route — reports only whether each variable is
// present (true/false), never the actual value. Delete this file once
// the environment variable issue is confirmed fixed.
export async function GET() {
  return NextResponse.json({
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  });
}
