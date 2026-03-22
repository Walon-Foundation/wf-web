import Link from "next/link";
import { GitHubRepoMeta } from "../components/github-repo-meta";
import { HeroPanel } from "../components/hero-panel";
import { Reveal } from "../components/reveal";
import { SectionNav } from "../components/section-nav";
import { featuredProjects } from "../lib/site-data";

const standards = [
  "Useful before impressive",
  "Clear before clever",
  "Maintainable before rushed",
  "Reliable before noisy",
];

const services = [
  "Contract engineering",
  "Full-stack product development",
  "Backend and API systems",
  "AI integrations and workflow tooling",
  "Technical architecture",
  "Prototype and MVP builds",
];

const navItems = [
  { href: "#foundation", label: "Foundation" },
  { href: "#work", label: "Work" },
  { href: "#standards", label: "Standards" },
  { href: "#services", label: "Services" },
  { href: "/start-a-project", label: "Start" },
];

export default function Home() {
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
              Software with standards. Open by default.
            </p>
          </div>

          <SectionNav items={navItems} />
        </Reveal>

        <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div className="space-y-8">
            <Reveal delay={60}>
              <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--soft)]">
                Built by Mohamed Lamin Walon Jalloh · walonCode
              </div>
            </Reveal>

            <Reveal delay={130}>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance text-[var(--text)] sm:text-6xl lg:text-7xl">
                  Good software should be obvious.
                </h1>

                <p className="max-w-2xl text-lg leading-8 text-[var(--soft)] sm:text-xl">
                  Walon-Foundation is the umbrella for the software I build:
                  open-source tools, practical platforms, SDKs, and systems that
                  aim to make the gap between good software and bad software
                  visible.
                </p>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="/start-a-project" className="button-primary">
                  Start a Project
                </a>
                <a href="#work" className="button-secondary">
                  Explore Projects
                </a>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="grid gap-4 pt-4 text-sm text-[var(--soft)] sm:grid-cols-3">
                <div className="metric-card">
                  <span className="metric-value">10+</span>
                  <span className="metric-label">Projects across tools, SDKs, and products</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">Open</span>
                  <span className="metric-label">Public repos and practical software experiments</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">Client-ready</span>
                  <span className="metric-label">Available for contract work and technical builds</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <HeroPanel>
            <div className="hero-grid" />
            <div className="hero-scanline" />
            <div className="relative z-10 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  What Walon-Foundation is
                </p>
                <p className="mt-4 text-lg leading-8 text-[var(--soft)]">
                  A public home for useful open-source software, engineering
                  standards, and product work that is built to hold up beyond
                  the first impression.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card">
                  <p className="eyebrow">Focus</p>
                  <p className="card-copy">
                    Developer tools, AI systems, public platforms, and
                    infrastructure-grade software.
                  </p>
                </div>
                <div className="glass-card">
                  <p className="eyebrow">Intent</p>
                  <p className="card-copy">
                    Build software that is useful, understandable, maintainable,
                    and visibly well-considered.
                  </p>
                </div>
              </div>
            </div>
            </HeroPanel>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      <section id="foundation" className="section-shell">
        <Reveal className="section-copy">
          <p className="section-label">Foundation</p>
          <h2 className="section-title">
            Walon-Foundation is the umbrella for serious software work.
          </h2>
          <p className="section-text">
            It brings together public-interest products, developer tooling,
            experimental systems, SDK work, and client-facing engineering under
            one standard: software should be useful, durable, and clear in both
            behavior and construction.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal delay={0}>
            <article className="showcase-card">
              <p className="eyebrow">Developer Tools</p>
              <h3 className="card-title">Tools that improve how software gets built</h3>
              <p className="card-copy">
                CLI scaffolding, editor support, API documentation tooling, and
                systems that reduce setup friction without lowering standards.
              </p>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="showcase-card">
              <p className="eyebrow">Platforms</p>
              <h3 className="card-title">Products built for real contexts</h3>
              <p className="card-copy">
                Public-facing web platforms, education software, and applied
                tools built around practical constraints and actual user needs.
              </p>
            </article>
          </Reveal>
          <Reveal delay={220}>
            <article className="showcase-card">
              <p className="eyebrow">Infrastructure</p>
              <h3 className="card-title">SDKs and backend systems with leverage</h3>
              <p className="card-copy">
                APIs, typed packages, integration layers, and architecture work
                designed to be useful beyond a single project.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      <section id="work" className="section-shell section-shell-highlight">
        <Reveal className="section-copy">
          <p className="section-label">Showcase</p>
          <h2 className="section-title">Selected software from the foundation.</h2>
          <p className="section-text">
            This is not placeholder portfolio language. These are real systems
            across AI, health, developer tooling, public platforms, and SDK
            work.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 90}>
              <article className="project-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{project.label}</p>
                    <h3 className="card-title mt-3">{project.name}</h3>
                    <p className="project-outcome mt-3">{project.outcome}</p>
                  </div>
                  <span className="project-mark project-mark-badge">{project.mark}</span>
                </div>
                <p className="card-copy mt-5">{project.summary}</p>
                <div className="project-tag-row mt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <GitHubRepoMeta owner={project.owner} repo={project.repo} />
                <div className="project-link-row mt-6">
                  {"caseStudy" in project && project.caseStudy ? (
                    <Link href={`/projects/${project.slug}`} className="project-link inline-flex">
                      Read Case Study
                    </Link>
                  ) : null}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link inline-flex"
                  >
                    View Repository
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="standards" className="section-shell section-accent">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="section-copy">
            <p className="section-label">Standards</p>
            <h2 className="section-title">What good software means here.</h2>
            <p className="section-text">
              The goal is not to ship noise faster. The goal is to build
              software that can justify itself through usefulness, clarity, and
              engineering discipline.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {standards.map((item, index) => (
              <Reveal key={item} delay={index * 100}>
                <article className="standard-card">
                  <span className="standard-index">0{index + 1}</span>
                  <p className="standard-copy">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="services" className="section-shell section-shell-highlight">
        <Reveal className="section-copy">
          <p className="section-label">Services</p>
          <h2 className="section-title">Work with me on software that needs to hold up.</h2>
          <p className="section-text">
            I work with clients who need thoughtful execution across product,
            backend, AI workflows, and technical architecture. The emphasis is
            not just shipping fast. It is shipping something defensible.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service} delay={index * 85}>
              <div className="service-card">
                <span className="service-dot" />
                <p className="card-title">{service}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="start" className="section-shell pb-24">
        <Reveal>
          <div className="cta-panel">
            <div className="max-w-3xl">
              <p className="section-label">Start A Project</p>
              <h2 className="section-title max-w-2xl">
                Need software built well? Start here.
              </h2>
              <p className="section-text mt-5">
                Use the intake page to scope a build, review the case studies to
                see how the work thinks, or submit a project inquiry right away
                if you already know what needs to be built.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="/start-a-project" className="button-primary">
                Start a Project
              </a>
              <Link href="/projects/business-directory" className="button-secondary">
                Read Case Studies
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
