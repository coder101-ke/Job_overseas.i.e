"use client";

import { useState } from "react";

/**
 * Site header. Login/Register buttons are static placeholders in Phase 1 —
 * they'll open the auth modal (components/auth/AuthModal.tsx) once
 * Supabase Auth is wired in during Phase 7.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-brand-700">
            Jobs<span className="text-slate-900">Overseas</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="/" className="hover:text-brand-700">
            Browse Jobs
          </a>
          <a href="/#countries" className="hover:text-brand-700">
            Countries
          </a>
          <a href="/#categories" className="hover:text-brand-700">
            Categories
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Log In
          </button>
          <button
            type="button"
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Register
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-700 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <a href="/">Browse Jobs</a>
            <a href="/#countries">Countries</a>
            <a href="/#categories">Categories</a>
            <div className="mt-2 flex gap-2">
              <button className="flex-1 rounded-md border border-slate-300 px-4 py-2 font-semibold">
                Log In
              </button>
              <button className="flex-1 rounded-md bg-brand-600 px-4 py-2 font-semibold text-white">
                Register
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
