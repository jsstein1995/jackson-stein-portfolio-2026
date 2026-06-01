import type { ReactNode } from "react";
import {
  CaseStudyImagePlaceholder,
  CaseStudyVideoPlaceholder,
} from "@/components/case-study-placeholders";
import { CaseStudySectionHeader } from "@/components/case-study-section-header";
import { FadeIn, Stagger, StaggerItem } from "@/components/fade-in";

function BodyCopy({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
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
      className={`border-t border-border px-6 py-20 md:px-10 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-[72rem]">{children}</div>
    </section>
  );
}

const keyFindings = [
  "~80% of projects involved switching financing options",
  "~70% of users opened multiple browser tabs to compare products",
  "Customer Success teams repeatedly requested comparison functionality",
  "Financing was one of the highest-friction moments in the sales workflow",
];

const challengePoints = [
  "Different financing products exposed different data",
  "Screen space was limited",
  "Financing details could be highly complex",
  "Sales reps needed to maintain momentum during conversations",
  "Homeowners needed clarity, not information overload",
];

const whatIDidColumns = [
  {
    title: "Research",
    items: [
      "Synthesized behavioral analytics",
      "Partnered with Customer Success",
      "Conducted user interviews",
      "Identified comparison workflows",
    ],
  },
  {
    title: "Exploration",
    items: [
      "Evaluated tables vs cards",
      "Explored multiple comparison paradigms",
      "Investigated progressive disclosure models",
      "Tested charting concepts",
    ],
  },
  {
    title: "Iteration",
    items: [
      "Multiple customer feedback rounds",
      "Refined proposal integration",
      'Clarified "selected" vs "compared" financing',
      "Simplified decision-making workflows",
    ],
  },
];

const designDecisions = [
  {
    title: "Cards over tables",
    description:
      "Although tables initially appeared attractive, card-based comparisons better supported different financing product types while preserving readability.",
  },
  {
    title: "Progressive disclosure",
    description:
      "Only the most important information appeared by default, while advanced details could be expanded when needed.",
  },
  {
    title: "Cashflow visualization",
    description:
      "Introduced financial visualizations that helped homeowners understand long-term outcomes rather than comparing raw numbers.",
  },
  {
    title: "Proposal integration",
    description:
      "Created a workflow that allowed reps to compare options while clearly controlling which financing products appeared in final proposals.",
  },
];

const processScreenshots = [
  "Early comparison concepts",
  "Card-based comparison layout",
  "Cashflow visualization exploration",
  "Final financing comparison UI",
];

const impactMetrics = [
  {
    value: "~80%",
    label: "Strong engagement",
    detail: "of Sales Mode users interacted with the feature.",
  },
  {
    value: "+20%",
    label: "Adoption growth",
    detail:
      "Sales Mode adoption increased within one quarter after launch.",
  },
  {
    label: "Customer feedback",
    detail:
      "Customers and stakeholders consistently highlighted financing comparisons as one of the most useful additions to the sales workflow.",
    isQuote: true,
  },
];

export function FinancingComparisonsHero() {
  return (
    <section className="relative px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-36">
      <div className="relative mx-auto max-w-[72rem]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <FadeIn delay={0.05}>
              <p className="text-sm tracking-widest text-muted uppercase">
                Selected work · Aurora Solar
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em] text-foreground">
                Helping solar sales reps compare financing options with
                confidence
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
                At Aurora Solar, financing was often the most important part of
                the sales conversation—but the product only allowed users to view
                one financing option at a time. I led design for a new comparison
                experience that helped sales reps evaluate multiple options
                side-by-side and present a clearer financial picture to
                homeowners.
              </p>
            </FadeIn>

            <FadeIn delay={0.16} className="mt-10">
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Role
                  </dt>
                  <dd className="mt-1 text-foreground">
                    Senior Product Designer
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Duration
                  </dt>
                  <dd className="mt-1 text-foreground">5 months</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Focus
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {[
                      "Research",
                      "Product Strategy",
                      "Information Architecture",
                      "Data Visualization",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Impact
                  </dt>
                  <dd className="mt-1 text-lg text-foreground">
                    +20% Sales Mode adoption after launch
                  </dd>
                </div>
              </dl>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <CaseStudyImagePlaceholder
              label="Final financing comparison UI"
              className="aspect-[4/3] w-full lg:aspect-[5/4]"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function FinancingComparisonsContent() {
  return (
    <>
      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Context" />
        </FadeIn>
        <FadeIn className="mt-12">
          <BodyCopy>
            <p>
              Aurora&apos;s Sales Mode helps solar sales representatives create
              proposals with homeowners in real time.
            </p>
            <p>
              Financing is often the deciding factor in whether a homeowner moves
              forward with solar, yet the existing experience forced reps to
              review financing products one at a time through large dropdown
              menus.
            </p>
            <p>
              Research revealed a significant mismatch between product behavior
              and customer needs.
            </p>
          </BodyCopy>
        </FadeIn>
        <FadeIn className="mt-10">
          <p className="text-sm tracking-widest text-muted uppercase">
            Key findings
          </p>
          <ul className="mt-4 max-w-3xl space-y-3 text-lg leading-relaxed text-muted">
            {keyFindings.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-foreground/30" aria-hidden>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn className="mt-12">
          <CaseStudyImagePlaceholder
            label="Original experience — single-option financing dropdown"
            className="aspect-[16/10] w-full max-w-4xl"
          />
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="The challenge" />
        </FadeIn>
        <FadeIn className="mt-12">
          <blockquote className="max-w-3xl border-l-2 border-foreground/20 py-1 pl-6 text-xl leading-relaxed text-foreground md:text-2xl md:leading-snug">
            How might we help sales reps compare financing options without
            disrupting the flow of a live homeowner conversation?
          </blockquote>
        </FadeIn>
        <FadeIn className="mt-10">
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
          <CaseStudySectionHeader title="What I did" />
        </FadeIn>
        <Stagger className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {whatIDidColumns.map((column) => (
            <StaggerItem key={column.title}>
              <h3 className="text-sm tracking-widest text-muted uppercase">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-2 text-base leading-snug text-foreground">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2">
          {processScreenshots.map((label) => (
            <StaggerItem key={label}>
              <CaseStudyImagePlaceholder label={label} className="aspect-[4/3]" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Key design decisions" />
        </FadeIn>
        <div className="mt-16 space-y-10">
          {designDecisions.map((decision, index) => (
            <FadeIn key={decision.title}>
              <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[3rem_1fr] md:gap-8">
                <span className="text-sm tracking-widest text-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg text-foreground">{decision.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted">
                    {decision.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <CaseStudySectionHeader title="Outcome" />
        </FadeIn>
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {impactMetrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="rounded-sm border border-border bg-surface/50 p-8 md:p-10">
                {"value" in metric && metric.value ? (
                  <p className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-none tracking-tight text-foreground">
                    {metric.value}
                  </p>
                ) : (
                  <p className="text-lg leading-relaxed text-foreground">
                    {metric.detail}
                  </p>
                )}
                <p className="mt-4 text-sm tracking-widest text-muted uppercase">
                  {metric.label}
                </p>
                {"value" in metric && metric.value && (
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {metric.detail}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <CaseStudyImagePlaceholder
              label="Final financing comparison — proposal view"
              className="aspect-[4/3] w-full"
            />
          </FadeIn>
          <FadeIn delay={0.06}>
            <CaseStudyVideoPlaceholder
              label="Prototype walkthrough — comparing options in Sales Mode"
              className="aspect-[4/3] w-full"
            />
          </FadeIn>
        </div>
      </Section>

      <Section className="pb-28">
        <FadeIn>
          <CaseStudySectionHeader title="Reflection" />
        </FadeIn>
        <FadeIn className="mt-12">
          <BodyCopy>
            <p>
              This project reinforced how often UX problems are actually
              information problems.
            </p>
            <p>
              The challenge wasn&apos;t creating another comparison screen—it was
              helping sales reps tell a clearer financial story while maintaining
              momentum during one of the most important moments in the solar
              sales process.
            </p>
          </BodyCopy>
        </FadeIn>
      </Section>
    </>
  );
}
