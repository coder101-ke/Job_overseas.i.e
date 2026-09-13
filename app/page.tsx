"use client";

import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/jobs/SearchBar";
import Filters from "@/components/jobs/Filters";
import JobCard from "@/components/jobs/JobCard";
import type { Job } from "@/types/job";

// ─────────────────────────────────────────────────────────────
// PHASE 1 PLACEHOLDER DATA ONLY.
// These four jobs mirror the seed data described in the project
// spec. In Phase 3 they move into the database (supabase/migrations/
// seed.sql) and in Phase 6 this page fetches them from GET /api/jobs
// instead of using this hardcoded array. Nothing below is fake
// "production" data — it exists solely so the layout is checkable
// before the API exists.
// ─────────────────────────────────────────────────────────────
const PLACEHOLDER_JOBS: Job[] = [
  {
    id: "1",
    title: "Care Assistant",
    country: "United Kingdom",
    category: "Healthcare",
    description:
      "Provide day-to-day personal care and support to residents in a residential care setting. Full training provided.",
    employer: "Meadowbrook Care Group",
    location: "Manchester",
    employment_type: "Full-time",
    requirements: "Right to work in the UK, compassionate attitude",
    salary: "£11.50 - £13.00 / hour",
    application_url: "https://example.com/apply/care-assistant",
    status: "active",
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Hotel Worker",
    country: "Ireland",
    category: "Hospitality",
    description:
      "Join a busy hotel team handling housekeeping, front-desk support, and guest services in a 4-star property.",
    employer: "Shamrock Hospitality Ltd",
    location: "Dublin",
    employment_type: "Full-time",
    requirements: "Basic English, flexible shift availability",
    salary: "€28,000 - €31,000 / year",
    application_url: "https://example.com/apply/hotel-worker",
    status: "active",
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "Warehouse Worker",
    country: "Poland",
    category: "Logistics",
    description:
      "Pick, pack, and sort inventory in a modern distribution centre. Forklift certification is a plus but not required.",
    employer: "LogiPol Distribution",
    location: "Warsaw",
    employment_type: "Full-time",
    requirements: "Ability to lift 20kg, willingness to work shifts",
    salary: "PLN 4,500 - 5,200 / month",
    application_url: "https://example.com/apply/warehouse-worker",
    status: "active",
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "Construction Worker",
    country: "Canada",
    category: "Construction",
    description:
      "General labour on residential building sites: framing support, site cleanup, and materials handling.",
    employer: "Northern Build Co.",
    location: "Toronto",
    employment_type: "Full-time",
    requirements: "Steel-toe boots, physically fit, safety-certified preferred",
    salary: "CAD 22 - 26 / hour",
    application_url: "https://example.com/apply/construction-worker",
    status: "active",
    created_at: "",
    updated_at: "",
  },
];

const COUNTRIES = ["United Kingdom", "Ireland", "Poland", "Canada"];
const CATEGORIES = ["Healthcare", "Hospitality", "Logistics", "Construction"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");

  const filteredJobs = useMemo(() => {
    return PLACEHOLDER_JOBS.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCountry = country ? job.country === country : true;
      const matchesCategory = category ? job.category === category : true;
      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [search, country, category]);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Find Your Next Job Overseas
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
              Browse verified international opportunities in healthcare,
              hospitality, logistics, and construction — across the UK,
              Ireland, Poland, and Canada.
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
              <SearchBar value={search} onChange={setSearch} />
              <Filters
                countries={COUNTRIES}
                categories={CATEGORIES}
                selectedCountry={country}
                selectedCategory={category}
                onCountryChange={setCountry}
                onCategoryChange={setCategory}
              />
            </div>
          </div>
        </section>

        {/* Job listings */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredJobs.length} job
              {filteredJobs.length === 1 ? "" : "s"} found
            </h2>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No jobs match your search. Try a different keyword or filter.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
    }
