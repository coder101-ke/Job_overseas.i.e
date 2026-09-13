"use client";

import { useState } from "react";
import type { Job } from "@/types/job";

interface ApplyModalProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}

export default function ApplyModal({ job, open, onClose }: ApplyModalProps) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: job.id, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Apply for this role</h2>
            <p className="text-sm text-slate-500">{job.title} · {job.employer}</p>
          </div>
          <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mb-3 text-4xl">✅</div>
            <h3 className="text-base font-semibold text-slate-900">Application submitted!</h3>
            <p className="mt-1 text-sm text-slate-500">
              We've received your application for <strong>{job.title}</strong>. We'll be in touch.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full name *</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone number</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+254 7XX XXX XXX"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Cover letter</label>
              <textarea
                name="cover_letter"
                value={form.cover_letter}
                onChange={handleChange}
                rows={4}
                placeholder="Tell the employer why you're a great fit..."
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>

            {status === "error" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{errorMsg}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {status === "loading" ? "Submitting…" : "Submit application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
    }
