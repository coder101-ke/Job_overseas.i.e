import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

/**
 * `application_url` is validated server-side (HTTPS-only, no javascript:/
 * data:/file: schemes — see server/security/url.ts, added in Phase 9)
 * before it ever reaches this component, so it's safe to use directly
 * in an href here.
 */
export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900">
            {job.title}
          </h3>
          <span className="whitespace-nowrap rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
            {job.category}
          </span>
        </div>

        <p className="mb-3 flex items-center gap-1 text-sm text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {job.location}, {job.country}
        </p>

        <p className="mb-4 line-clamp-3 text-sm text-slate-600">
          {job.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">{job.employer}</span>
        <a
          href={job.application_url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Apply
        </a>
      </div>
    </article>
  );
        }
