import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { FadeIn } from "@/components/fade-in";
import { MoreWorkSection } from "@/components/more-work-section";
import { PageTransition } from "@/components/page-transition";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.title} — Your Name`,
    description: study.excerpt,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          <FadeIn delay={0.05}>
            <div className="mb-8 flex flex-wrap gap-3">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="max-w-4xl text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.04em]">
              {study.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-2xl text-xl text-muted md:text-2xl">
              {study.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-4 text-sm">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="mt-1 tracking-tight">{study.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Year</dt>
                <dd className="mt-1 tracking-tight">{study.year}</dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* Placeholder hero image */}
      <FadeIn>
        <div className="mx-auto aspect-[16/9] max-w-7xl bg-surface px-6 md:px-10">
          <div className="flex h-full items-center justify-center rounded-sm border border-border bg-gradient-to-br from-black/[0.03] to-transparent">
            <span className="text-sm tracking-widest text-muted uppercase">
              Hero image placeholder
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Content sections */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-sm tracking-widest text-muted uppercase">
              Overview
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
              {study.excerpt}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-24">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              The Challenge
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Placeholder content — this section will describe the problem
              space, constraints, and context. Replace with your case study
              narrative when ready.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-24">
            <div className="aspect-[4/3] rounded-sm border border-border bg-surface">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm tracking-widest text-muted uppercase">
                  Content block placeholder
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-24">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              Outcome
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Placeholder content — key results, metrics, and learnings will
              go here. Keep it concise and impactful.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Next project */}
      <MoreWorkSection currentId={slug} />
    </PageTransition>
  );
}
