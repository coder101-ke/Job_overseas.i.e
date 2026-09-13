create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  cover_letter text,
  created_at timestamptz not null default now()
);

alter table applications enable row level security;

create policy "Anyone can submit an application"
  on applications for insert
  with check (true);
