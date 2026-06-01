import type { ReactNode } from "react";
import { CaseStudyBeforeAfterScroll } from "@/components/case-study-before-after-scroll";
import { CaseStudyResearchImage } from "@/components/case-study-labeled-media";
import { CaseStudySectionHeader } from "@/components/case-study-section-header";
import { FadeIn, Stagger, StaggerItem } from "@/components/fade-in";
import {
  designHighlightImages,
  retirementCalculatorMedia,
  type RetirementCalculatorImage,
} from "@/lib/retirement-calculator-media";

function ResearchImage({ image }: { image: RetirementCalculatorImage }) {
  return (
    <CaseStudyResearchImage
      src={image.src}
      alt={image.alt}
      label={image.label}
      width={image.width}
      height={image.height}
    />
  );
}

function BodyCopy({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
      {children}
    </div>
  );
}

function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`border-t border-border px-6 py-16 md:px-10 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-[72rem]">{children}</div>
    </section>
  );
}

type ImpactMetric =
  | {
      label: string;
      detail: string;
      value: string;
    }
  | {
      label: string;
      detail: string;
      from: string;
      to: string;
    };

function ImpactMetricValue({
  metric,
}: {
  metric: Extract<ImpactMetric, { value: string } | { from: string }>;
}) {
  if ("from" in metric) {
    return (
      <p className="whitespace-nowrap text-[clamp(1.75rem,3.8vw,3.25rem)] font-light leading-none tracking-tight text-foreground">
        <span className="text-foreground/50">{metric.from}</span>
        <span className="mx-[0.25em]" aria-hidden>
          →
        </span>
        <span>{metric.to}</span>
      </p>
    );
  }

  return (
    <p className="whitespace-nowrap text-[clamp(1.75rem,3.8vw,3.25rem)] font-light leading-none tracking-tight text-foreground">
      {metric.value}
    </p>
  );
}

const tags = [
  "Consumer Finance",
  "Data Visualization",
  "UX Design",
  "Mobile Responsive",
  "Financial Planning",
];

const impactMetrics: ImpactMetric[] = [
  {
    from: "40%",
    to: "80%",
    label: "Increased user satisfaction",
    detail: "Measured before and after the redesign.",
  },
  {
    value: "+15%",
    label: "CTA click-through rate",
    detail: "Increase to related products from the calculator experience.",
  },
  {
    from: "3rd",
    to: "1st",
    label: "Calculator SEO ranking",
    detail: "The redesigned calculator moved to the top search position, up from third.",
  },
];

const challengePoints = [
  "Results lacked actionable recommendations",
  "Visualizations were difficult to interpret",
  "Experience was not optimized for mobile",
  "Educational guidance was limited",
  "Business goals required preserving SEO performance",
];

const designHighlights = [
  {
    title: "Actionable planning",
    description:
      "Shifted the experience from simply reporting retirement gaps to helping users explore ways to improve their outcomes.",
  },
  {
    title: "Interactive modeling",
    description:
      "Introduced controls that allowed users to explore retirement age, contributions, and spending scenarios in real time.",
  },
  {
    title: "Visual clarity",
    description:
      "Redesigned charts to communicate long-term retirement trajectories and the impact of small financial changes over time.",
  },
];

const processSteps = [
  "Audit",
  "Competitive analysis",
  "Rapid concept testing",
  "Usability validation",
];

export function NerdwalletRetirementCalculatorHero() {
  return (
    <section className="relative px-6 pb-8 pt-32 md:px-10 md:pb-12 md:pt-36">
      <div className="relative mx-auto max-w-[72rem]">
        <FadeIn delay={0.05}>
          <p className="text-sm tracking-widest text-muted uppercase">
            Selected work · NerdWallet
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.06] tracking-[-0.03em] text-foreground">
            NerdWallet Retirement Calculator
          </h1>
        </FadeIn>

        <FadeIn delay={0.09}>
          <p className="mt-4 text-xs tracking-wide text-muted md:text-sm">
            2021 · NerdWallet
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div>
            <FadeIn delay={0.12}>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-snug tracking-tight text-foreground">
                Helping people visualize their path to retirement.
              </h2>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                NerdWallet&apos;s retirement calculator was one of its most
                visited financial planning tools, but users struggled to
                understand their results and identify actionable next steps. I
                led a redesign focused on clarity, education, and mobile
                responsiveness.
              </p>
            </FadeIn>

            <FadeIn delay={0.18} className="mt-10">
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Company
                  </dt>
                  <dd className="mt-1 text-foreground">NerdWallet</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Role
                  </dt>
                  <dd className="mt-1 text-foreground">Product Designer</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Duration
                  </dt>
                  <dd className="mt-1 text-foreground">2–3 months</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Team
                  </dt>
                  <dd className="mt-1 text-foreground">
                    Product Manager, SME, Engineering
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Focus
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <ResearchImage image={retirementCalculatorMedia.heroMockups} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function NerdwalletRetirementCalculatorContent() {
  return (
    <>
      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Impact" />
        </FadeIn>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {impactMetrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="flex h-full flex-col rounded-sm border border-border bg-surface/50 p-8 md:p-10">
                <ImpactMetricValue metric={metric} />
                <p className="mt-4 text-sm tracking-widest text-muted uppercase">
                  {metric.label}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {metric.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Design process" />
        </FadeIn>
        <FadeIn className="mt-10">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm tracking-wide text-foreground md:text-base">
            {processSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <span>{step}</span>
                {index < processSteps.length - 1 && (
                  <span className="text-muted" aria-hidden>
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </FadeIn>
        <Stagger className="mt-12 flex flex-col gap-4">
          <StaggerItem>
            <ResearchImage image={retirementCalculatorMedia.audit} />
          </StaggerItem>
          <StaggerItem className="grid gap-4 sm:grid-cols-2">
            <ResearchImage image={retirementCalculatorMedia.earlySketches} />
            <ResearchImage image={retirementCalculatorMedia.wireframes} />
          </StaggerItem>
        </Stagger>
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Making retirement planning easier to understand" />
        </FadeIn>
        <FadeIn className="mt-10">
          <BodyCopy>
            <p>
              The existing experience focused heavily on calculations but
              provided limited guidance. Users often understood their retirement
              gap but struggled to determine how to improve their outcomes.
            </p>
          </BodyCopy>
        </FadeIn>
        <FadeIn className="mt-8">
          <ul className="max-w-3xl space-y-3 text-lg leading-relaxed text-muted">
            {challengePoints.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-foreground/30" aria-hidden>
                  ·
                </span>
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="From static results to interactive planning" />
        </FadeIn>
        <FadeIn className="mt-10">
          <BodyCopy>
            <p>
              The redesign transformed the calculator from a reporting tool into a
              planning tool.
            </p>
          </BodyCopy>
        </FadeIn>
        <CaseStudyBeforeAfterScroll
          before={retirementCalculatorMedia.beforeCalculator}
          after={retirementCalculatorMedia.afterCalculator}
        />
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Key design improvements" />
        </FadeIn>
        <Stagger className="mt-12 grid gap-8 md:grid-cols-3">
          {designHighlights.map((card, index) => (
            <StaggerItem key={card.title}>
              <div className="flex h-full flex-col">
                <ResearchImage image={designHighlightImages[index]} />
                <h3 className="mt-5 text-lg text-foreground">{card.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="pb-28">
        <FadeIn>
          <CaseStudySectionHeader title="Outcome" />
        </FadeIn>
        <FadeIn className="mt-10">
          <BodyCopy>
            <p>
              The redesign introduced a more educational and action-oriented
              retirement planning experience. By combining clearer
              visualizations, interactive planning tools, and responsive
              layouts, the experience better supported users in understanding
              both where they stood and what steps they could take next.
            </p>
            <p>
              Unmoderated testing with ten participants validated the direction
              before launch. Users completed core planning tasks at an 80–100%
              success rate, with the retirement age slider and real-time savings
              updates performing especially well.
            </p>
          </BodyCopy>
        </FadeIn>
        <FadeIn className="mt-8">
          <ul className="max-w-3xl space-y-3 text-lg leading-relaxed text-muted">
            <li className="flex gap-3">
              <span className="text-foreground/30" aria-hidden>
                ·
              </span>
              80% of participants felt confident navigating the redesigned
              calculator.
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30" aria-hidden>
                ·
              </span>
              90% understood their results, signaling that clearer
              visualizations and interactive modeling improved comprehension.
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30" aria-hidden>
                ·
              </span>
              Sliders and live feedback made it easy to explore how savings
              behavior and retirement age affected long-term outcomes.
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30" aria-hidden>
                ·
              </span>
              Remaining opportunities centered on clarifying expected income,
              improving tax and fee transparency, and adding more guidance
              around advanced assumptions.
            </li>
          </ul>
        </FadeIn>
      </Section>
    </>
  );
}
