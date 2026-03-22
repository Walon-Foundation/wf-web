import { desc } from "drizzle-orm";
import Link from "next/link";
import { db } from "../../../lib/db";
import { projectQuotes } from "../../../lib/schema";
import { Reveal } from "../../../components/reveal";

function formatDate(value: Date | null) {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function QuotesAdminPage() {
  const quotes = await db
    .select()
    .from(projectQuotes)
    .orderBy(desc(projectQuotes.createdAt))
    .limit(200);

  return (
    <main className="relative overflow-hidden">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />
      <div className="hero-glow hero-glow-center" />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-6 sm:px-8 lg:px-10">
        <Reveal className="sticky top-4 z-20 mb-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[rgba(7,17,31,0.72)] px-4 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[var(--muted)]">
              Admin
            </p>
            <p className="mt-2 text-sm text-[var(--soft)]">
              Project quote submissions
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="button-secondary">
              Back Home
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>Submitted</span>
              <span>Client</span>
              <span>Tier</span>
              <span>Total</span>
              <span>Details</span>
            </div>

            {quotes.length === 0 ? (
              <div className="admin-empty">
                No quotes yet.
              </div>
            ) : (
              quotes.map((quote) => (
                <div key={quote.id} className="admin-row">
                  <span>{formatDate(quote.createdAt)}</span>
                  <span>
                    <strong>{quote.name}</strong>
                    <span className="admin-sub">{quote.email}</span>
                    {quote.company ? <span className="admin-sub">{quote.company}</span> : null}
                  </span>
                  <span>{quote.tierLabel}</span>
                  <span>${quote.total}</span>
                  <span className="admin-details">
                    <span>{quote.projectType}</span>
                    <span>{quote.timeline}</span>
                    <span>{quote.addons?.length ?? 0} addons</span>
                  </span>
                </div>
              ))
            )}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
