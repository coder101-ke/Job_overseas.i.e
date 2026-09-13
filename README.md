# Jobs Overseas — Phase 1: Project Structure & Frontend Layout

This is a work-in-progress build following an 11-phase plan. **This
checkpoint only contains Phase 1** — project scaffolding and the
homepage layout, with placeholder data. There is no database, API, or
authentication yet; those come in later phases.

## What's here

```
app/
  layout.tsx        Root layout + metadata
  page.tsx           Homepage (hero, search, filters, job grid) — uses
                      hardcoded placeholder jobs for now
  globals.css         Tailwind entrypoint
components/
  layout/             Header, Footer
  jobs/               SearchBar, Filters, JobCard (presentational only)
  auth/, ui/           Empty — filled in during Phase 7
lib/
  config.ts           Env-variable access point (expanded in Phase 3)
  supabase/, validation/, utils/   Empty — filled in during later phases
server/
  db/, auth/, security/            Empty — filled in during later phases
types/
  job.ts              Shared Job type
supabase/
  migrations/         Empty — schema added in Phase 3
tests/                Empty — added in Phase 10
.env.example          Variable NAMES only, see below
```

## Running this checkpoint locally

You'll need Node.js 18.18+ installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — you should see the homepage with the
four placeholder jobs, working client-side search and filters.

## Environment variables (not needed yet)

`.env.example` lists the variables the app will need starting in Phase 3.
None are required to run Phase 1, since nothing here touches Supabase yet.

- **Server-only** (never bundled into browser JS): `SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`
- **Browser-safe** (prefixed `NEXT_PUBLIC_`, meant to be public):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The anon key is safe to expose publicly because Supabase Row Level
Security (added in Phase 3/11) — not secrecy of that key — is what
actually restricts what it can do.

## Verifying this checkpoint

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
```

Please run these and confirm they pass before we move to Phase 2
(running the app locally and reviewing the homepage together) — I
wasn't able to run `npm install` in the environment I built this in, so
this is the first real verification it will get.

## Full setup / deployment docs

A complete README (Supabase project creation, DB schema, auth config,
Vercel deployment, admin user creation, troubleshooting) will be added
once those pieces exist — following this same build-in-phases approach.
