export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 sm:px-6">
        <p>© {new Date().getFullYear()} Jobs Overseas. All rights reserved.</p>
      </div>
    </footer>
  );
}
