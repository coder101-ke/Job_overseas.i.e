import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Force this route to always run dynamically (never statically cached),
// since job listings change over time.
export const dynamic = "force-dynamic";

const MAX_SEARCH_LENGTH = 100;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate/sanitize query params — never trust client input, even
    // though this is a public read-only endpoint (spec §7).
    const rawSearch = searchParams.get("search") ?? "";
    const rawCountry = searchParams.get("country") ?? "";
    const rawCategory = searchParams.get("category") ?? "";

    const search = rawSearch.trim().slice(0, MAX_SEARCH_LENGTH);
    const country = rawCountry.trim().slice(0, 100);
    const category = rawCategory.trim().slice(0, 100);

    const supabase = createServerSupabaseClient();

    let query = supabase
      .from("jobs")
      .select(
        "id, title, country, category, description, employer, location, employment_type, requirements, salary, application_url, status, created_at, updated_at"
      )
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (search) {
      // ilike = case-insensitive match; Supabase's client library
      // parameterizes this safely, so there's no SQL injection risk here.
      query = query.ilike("title", `%${search}%`);
    }
    if (country) {
      query = query.eq("country", country);
    }
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      // Log the real error server-side; never expose DB internals to
      // the client (spec §6, §14).
      console.error("Failed to fetch jobs:", error.message);
      return NextResponse.json(
        { success: false, error: "Unable to retrieve jobs" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, jobs: data ?? [] });
  } catch (err) {
    console.error("Unexpected error in GET /api/jobs:", err);
    return NextResponse.json(
      { success: false, error: "Unable to retrieve jobs" },
      { status: 500 }
    );
  }
      }
