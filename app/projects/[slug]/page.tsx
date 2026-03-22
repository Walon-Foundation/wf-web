import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitHubRepoMeta } from "../../../components/github-repo-meta";
import { Reveal } from "../../../components/reveal";
import { caseStudyProjects, getProjectBySlug } from "../../../lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) {
    return {
      title: "Project | Walon-Foundation",
    };
  }

  return {
    title: `${project.name} | Walon-Foundation`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />
      <div className="hero-glow hero-glow-center" />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-6 sm:px-8 lg:px-10">
        <Reveal className="sticky top-4 z-20 mb-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-[rgba(7,17,31,0.72)] px-4 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[var(--muted)]">
              Case Study
            </p>
            <p className="mt-2 text-sm text-[var(--soft)]">
              {project.name} · {project.label}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="button-secondary">
              Back Home
            </Link>
            <a href={project.href} target="_blank" rel="noreferrer" className="button-primary">
              View Repository
            </a>
          </div>
        </Reveal>

        <div className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="space-y-8">
            <Reveal>
              <div className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--soft)]">
                {project.outcome}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance text-[var(--text)] sm:text-6xl">
                  {project.name}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[var(--soft)] sm:text-xl">
                  {project.caseStudy.overview}
                </p>
                <div className="project-tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="showcase-card">
            <div className="space-y-6">
              <div className="project-mark project-mark-badge w-fit">{project.mark}</div>
              <div>
                <p className="eyebrow">Live Repository</p>
                <h2 className="card-title mt-3">{project.owner}/{project.repo}</h2>
              </div>
              <p className="card-copy">{project.summary}</p>
              <GitHubRepoMeta owner={project.owner} repo={project.repo} />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal className="showcase-card">
            <p className="section-label">Challenge</p>
            <p className="case-study-copy mt-5">{project.caseStudy.challenge}</p>
          </Reveal>
          <Reveal delay={100} className="showcase-card">
            <p className="section-label">Solution</p>
            <p className="case-study-copy mt-5">{project.caseStudy.solution}</p>
          </Reveal>
          <Reveal delay={200} className="showcase-card">
            <p className="section-label">Why It Matters</p>
            <p className="case-study-copy mt-5">{project.caseStudy.whyItMatters}</p>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-shell pb-24">
        <Reveal className="section-copy">
          <p className="section-label">Highlights</p>
          <h2 className="section-title">What this project proves.</h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {project.caseStudy.highlights.map((highlight, index) => (
            <Reveal key={highlight} delay={index * 100}>
              <article className="standard-card">
                <span className="standard-index">0{index + 1}</span>
                <p className="standard-copy max-w-none">{highlight}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
