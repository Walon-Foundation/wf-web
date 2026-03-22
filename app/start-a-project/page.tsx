import type { Metadata } from "next";
import Link from "next/link";
import { ProjectInquiryForm } from "../../components/project-inquiry-form";
import { Reveal } from "../../components/reveal";

const projectTypes = [
  "Landing page or marketing site",
  "Full-stack web application",
  "Internal dashboard or workflow tool",
  "Backend API or service layer",
  "AI feature or AI-assisted workflow",
  "SDK, package, or developer tooling",
];

const workingStyle = [
  "Clear project scoping before code",
  "Practical architecture over unnecessary complexity",
  "Fast iteration without losing maintainability",
  "Strong bias toward useful, defensible software",
];

const engagementModes = [
  "Small scoped build",
  "Product prototype or MVP",
  "Contract engineering support",
  "Technical architecture and advisory",
];

const pricingBands = [
  {
    title: "Small Scope",
    range: "From $1k",
    copy:
      "Best for focused landing pages, narrow features, small internal tools, or scoped technical cleanup.",
  },
  {
    title: "Product Build",
    range: "$3k - $15k+",
    copy:
      "Best for full product surfaces, platform work, dashboards, AI-assisted features, and more substantial engineering scope.",
  },
  {
    title: "Ongoing Support",
    range: "Custom",
    copy:
      "Best for contract engineering, architecture help, iterative delivery, and technical partnership over time.",
  },
];

export const metadata: Metadata = {
  title: "Start a Project | Walon-Foundation",
  description:
    "Start a software project with Walon-Foundation. Explore project types, engagement modes, and the intake path for contract work and product builds.",
};

export default function StartAProjectPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />
      <div className="hero-glow hero-glow-center" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-20 pt-6 sm:px-8 lg:px-10">
        <Reveal className="sticky top-4 z-20 mb-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[rgba(7,17,31,0.72)] px-4 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[var(--muted)]">
              Walon-Foundation
            </p>
            <p className="mt-2 text-sm text-[var(--soft)]">
              Start a project with software that needs to hold up.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="button-secondary">
              Back Home
            </Link>
            <a
              href="https://github.com/walonCode"
              className="button-primary"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <div className="grid flex-1 gap-12 py-14 lg:grid-cols-[1fr_0.95fr] lg:py-20">
          <div className="space-y-8">
            <Reveal delay={40}>
              <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--soft)]">
                Contract work · Product builds · Technical advisory
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance text-[var(--text)] sm:text-6xl lg:text-7xl">
                  Start the right project, not just a rushed one.
                </h1>

                <p className="max-w-2xl text-lg leading-8 text-[var(--soft)] sm:text-xl">
                  This page is the entry point for client work under
                  Walon-Foundation. If you need a platform, tool, backend
                  system, AI workflow, or product prototype, this is where the
                  conversation starts.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="mailto:hello@walon.foundation" className="button-primary">
                  Request a Quote
                </a>
                <Link href="/" className="button-secondary">
                  Review the Work
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="cta-panel">
            <div className="space-y-6">
              <div>
                <p className="section-label">What to send</p>
                <h2 className="section-title max-w-xl text-4xl sm:text-5xl">
                  The faster path to a serious conversation.
                </h2>
              </div>

              <div className="grid gap-4">
                <div className="glass-card">
                  <p className="eyebrow">Project</p>
                  <p className="card-copy">
                    What you want built and what problem it should solve.
                  </p>
                </div>
                <div className="glass-card">
                  <p className="eyebrow">Timeline</p>
                  <p className="card-copy">
                    When you want to start and any deadlines that actually matter.
                  </p>
                </div>
                <div className="glass-card">
                  <p className="eyebrow">Budget Range</p>
                  <p className="card-copy">
                    Enough context to scope the right approach, not guesswork.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="section-copy lg:mb-0">
            <p className="section-label">Pricing Direction</p>
            <h2 className="section-title">Not fixed pricing. Better scoping.</h2>
            <p className="section-text">
              The point of this page is to set expectations early. Pricing will
              depend on complexity, scope, delivery speed, and whether the work
              is a one-off build or ongoing engineering support.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {pricingBands.map((band, index) => (
              <Reveal key={band.title} delay={index * 90}>
                <article className="showcase-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">{band.title}</p>
                      <h3 className="card-title mt-3">{band.range}</h3>
                    </div>
                    <span className="project-mark" />
                  </div>
                  <p className="card-copy mt-5">{band.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell">
        <Reveal>
          <ProjectInquiryForm />
        </Reveal>
      </section>

      <div className="section-divider" />

      <section className="section-shell">
        <Reveal className="section-copy">
          <p className="section-label">Project Types</p>
          <h2 className="section-title">The kinds of software this page is for.</h2>
          <p className="section-text">
            The goal is not to fit every request into a template. It is to make
            sure the work matches the problem, the timeline, and the level of
            engineering it deserves.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((item, index) => (
            <Reveal key={item} delay={index * 80}>
              <article className="service-card">
                <span className="service-dot" />
                <p className="card-title">{item}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="showcase-card">
            <p className="section-label">How I Work</p>
            <h2 className="section-title text-4xl sm:text-5xl">
              Built with structure before noise.
            </h2>
            <div className="mt-8 grid gap-4">
              {workingStyle.map((item, index) => (
                <div key={item} className="standard-card">
                  <span className="standard-index">0{index + 1}</span>
                  <p className="standard-copy max-w-none">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="showcase-card">
            <p className="section-label">Engagement Modes</p>
            <h2 className="section-title text-4xl sm:text-5xl">
              Different scopes, same standard.
            </h2>
            <div className="mt-8 grid gap-4">
              {engagementModes.map((item) => (
                <div key={item} className="glass-card">
                  <p className="card-title">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell pb-24">
        <Reveal className="cta-panel">
          <div className="max-w-3xl">
            <p className="section-label">Next Step</p>
            <h2 className="section-title max-w-2xl">
              The intake flow can get more advanced later.
            </h2>
            <p className="section-text mt-5">
              This first version gives the site a real destination for project
              inquiries. The next step after this can be a proper intake form,
              pricing bands, or calendar booking once the workflow is defined.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="mailto:hello@walon.foundation" className="button-primary">
              Start by Email
            </a>
            <Link href="/" className="button-secondary">
              Back to Homepage
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
