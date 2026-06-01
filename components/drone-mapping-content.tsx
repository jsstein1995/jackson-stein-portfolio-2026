import type { ReactNode } from "react";
import Image from "next/image";
import { CaseStudySectionHeader } from "@/components/case-study-section-header";
import {
  CaseStudyResearchImage,
  CaseStudyResearchVideo,
} from "@/components/case-study-labeled-media";
import {
  droneImpactMetrics,
  droneProjectMedia,
} from "@/lib/drone-project-media";
import { metricsSummaryFrameClassName } from "@/lib/metrics-carousel-styles";
import { MetricsCarousel } from "@/components/metrics-carousel";
import { FadeIn, Stagger, StaggerItem } from "@/components/fade-in";

function BodyCopy({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
      {children}
    </div>
  );
}

function SectionIntro({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`max-w-3xl text-lg leading-relaxed text-muted ${className}`}
    >
      {children}
    </p>
  );
}

function SubsectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm tracking-widest text-muted uppercase">{children}</h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl list-disc space-y-3 pl-5 text-lg leading-relaxed text-muted marker:text-muted/60">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function CoreChallenge({ children }: { children: ReactNode }) {
  return (
    <div>
      <p className="text-sm tracking-widest text-muted uppercase">
        Core challenge
      </p>
      <p className="mt-4 max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl">
        {children}
      </p>
    </div>
  );
}

const v0Learnings = [
  "Requiring third-party software made the workflow too heavy.",
  "Many users did not understand how drone imagery translated into a 3D model.",
  "Some users were not actually using drones for 3D modeling.",
  "Testers were reluctant to complete feedback loops after trying the workflow.",
];

const v1Improvements = [
  "Clearer education before upload",
  "Minimum image validation",
  "Geolocation feedback",
  "Better file requirement messaging",
  "Help center and video support",
  "More consistent language across Drone Mapping, LiDAR, and surface models",
];

const v1IterationItems = [
  "Minimum 5-image validation",
  "Higher reconstruction output limits",
  "Backend tuning for reconstruction quality",
  "Fixes for uploads stuck in progress",
  "Upload flow UX polish",
  "Clearer in-product messaging",
  "A language consistency audit",
  "Back-button fixes in the upload modal",
];

const betaSignals = [
  "Processing reliability was improving, but still needed more headroom.",
  "Acceptance on successful processes was strong.",
  "Repeat usage was low.",
  "Willingness to pay was mixed.",
  "Customers using paid alternatives suggested real market value.",
  "V1 lacked the roof model and accuracy confidence many users expected.",
];

const preSaleNeeds = [
  "Mobile upload",
  "Video input",
  "Better input validation",
  "Fast processing",
  "Clear enough output to support same-day design",
];

const postSaleNeeds = [
  "A bundled roof model",
  "Merge with existing design",
  "Stated accuracy benchmarks",
  "Better 3D mesh support",
  "Confidence to reposition panels based on drone output",
];

const v2Directions = [
  {
    title: "Input validation",
    description:
      "Improve success rates by checking image size, count, GPS data, and reconstruction readiness before processing.",
  },
  {
    title: "Video input",
    description:
      "Support MP4 uploads and extract frames for reconstruction, especially for lower-cost drones that produce video-first workflows.",
  },
  {
    title: "Mobile upload",
    description:
      "Enable field users to upload from the site instead of returning to a desktop workflow.",
  },
  {
    title: "3D textured mesh",
    description:
      "Expose the textured mesh already produced by the pipeline to create a stronger visual “wow” factor and support measurement or tree modeling use cases.",
  },
  {
    title: "Bundled roof model",
    description:
      "Connect drone ingestion to Aurora’s expert design services so users receive a more complete model instead of raw layers.",
  },
  {
    title: "Merge with existing design",
    description:
      "Support post-sale true-up by reconciling drone-derived data with an existing sold system.",
  },
];

const designDecisions = [
  {
    title: "Separate user expectations by workflow",
    description:
      "Instead of designing one generic upload path, we clarified the difference between fast pre-sale usage and accurate post-sale verification. This made tradeoffs easier to discuss with product and engineering.",
  },
  {
    title: "Treat education as part of the product",
    description:
      "Drone processing depends heavily on input quality. The interface needed to teach users what mattered: number of images, geodata, image quality, and expected output.",
  },
  {
    title: "Optimize beta for learning",
    description:
      "The V1 beta was intentionally free and broadly available so the team could observe real behavior, not just stated interest.",
  },
  {
    title: "Use data to avoid overbuilding",
    description:
      "Strong acceptance showed promise, but low retention showed that V1 was not enough. That helped us focus V2 around the missing workflow value rather than simply polishing the existing utility.",
  },
];

const impactSignals = [
  "EU market adoption steadily ramping for pre-sale workflows",
  "Customers successfully accepting drone-generated outputs",
  "Clear evidence of existing external spend on drone workflows",
  "Reduced reliance on disconnected third-party processing",
  "Stronger internal understanding of pre-sale vs post-sale drone needs",
  "Increased confidence in V2 post-sale opportunities",
];

function ResearchPhase({
  eyebrow,
  title,
  children,
  media,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  media?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs tracking-widest text-muted uppercase">{eyebrow}</p>
      <h3 className="mt-2 text-lg font-light tracking-tight text-foreground md:text-xl">
        {title}
      </h3>
      <div className="mt-5 flex-1 space-y-4 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
        {children}
      </div>
      {media ? <div className="mt-8">{media}</div> : null}
    </div>
  );
}

function ResearchBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="text-muted/50">
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DroneMappingContent() {
  return (
    <>
      {/* Core challenge */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mt-4">
            <CoreChallenge>
              How might we turn drone-captured site data into a reliable,
              easy-to-use design input without forcing customers into a separate
              processing workflow?
            </CoreChallenge>
          </FadeIn>
        </div>
      </section>

      {/* The opportunity */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="The opportunity" />
          </FadeIn>
          <FadeIn className="mt-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <BodyCopy>
                <p>
                  Drone workflows were becoming increasingly important for solar
                  companies. Customers were already flying sites, competitors were
                  offering drone-based workflows, and Aurora had a strategic
                  opportunity to reduce external tool dependency by bringing
                  drone ingestion into the design platform.
                </p>
                <p>The initial hypothesis was simple:</p>
                <p>
                  If Aurora could ingest drone imagery and convert it into usable
                  design data, customers could reduce manual work, improve site
                  accuracy, and keep more of their design workflow inside Aurora.
                </p>
                <p>
                  But the hard part was not just supporting drone files. It was
                  understanding which customer jobs were actually valuable enough
                  to support, how much automation users expected, and where the
                  product needed to be reliable before it could become
                  monetizable.
                </p>
              </BodyCopy>
              <CaseStudyResearchImage
                src={droneProjectMedia.iterationStrategy.src}
                alt={droneProjectMedia.iterationStrategy.alt}
                label={droneProjectMedia.iterationStrategy.label}
                width={droneProjectMedia.iterationStrategy.width}
                height={droneProjectMedia.iterationStrategy.height}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Research and discovery */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Research and discovery" />
          </FadeIn>
          <FadeIn className="mt-12">
            <SectionIntro>
              Research ran in three phases — a broad discovery survey, V0
              early-access tester feedback, and V1 beta validation through
              customer interviews and exit surveys.
            </SectionIntro>
          </FadeIn>

          <div className="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-10">
            <FadeIn>
              <ResearchPhase
                eyebrow="Early discovery"
                title="Swarm — Pendo survey"
                media={
                  <CaseStudyResearchImage
                    src={droneProjectMedia.research.earlyDiscovery.src}
                    alt={droneProjectMedia.research.earlyDiscovery.alt}
                    label={droneProjectMedia.research.earlyDiscovery.label}
                  />
                }
              >
                <ResearchBulletList
                  items={[
                    "1,838 unique responses",
                    "63% use drones regularly or occasionally",
                    "58% said uploading drone imagery is very valuable",
                    "Drone usage appeared across the entire design workflow",
                  ]}
                />
              </ResearchPhase>
            </FadeIn>

            <FadeIn delay={0.06}>
              <ResearchPhase
                eyebrow="V0 early access"
                title="Tester feedback"
                media={
                  <CaseStudyResearchImage
                    src={droneProjectMedia.research.v0Tester.src}
                    alt={droneProjectMedia.research.v0Tester.alt}
                    label={droneProjectMedia.research.v0Tester.label}
                    width={droneProjectMedia.research.v0Tester.width}
                    height={droneProjectMedia.research.v0Tester.height}
                  />
                }
              >
                <ResearchBulletList
                  items={[
                    "13 / 41 users activated",
                    "Low usage overall",
                    "Testers reluctant to debrief",
                  ]}
                />
                <div>
                  <p className="text-xs tracking-widest text-muted uppercase">
                    Learnings
                  </p>
                  <ResearchBulletList
                    items={[
                      "Friction too high when third-party software was required",
                      "Holiday timing was not ideal for sustained testing",
                      "Many users were not using drones for 3D modeling",
                    ]}
                  />
                </div>
              </ResearchPhase>
            </FadeIn>

            <FadeIn delay={0.12}>
              <ResearchPhase
                eyebrow="V1 beta"
                title="Interviews & exit survey"
                media={
                  <CaseStudyResearchImage
                    src={droneProjectMedia.research.v1ExitSurvey.src}
                    alt="V1 beta Pendo exit survey"
                    label={droneProjectMedia.research.v1ExitSurvey.label}
                  />
                }
              >
                <ResearchBulletList
                  items={[
                    "12 responses (9% engagement rate)",
                    "2/3 responded must-have / nice-to-have",
                    "4/7 would use another tool if unavailable in Aurora",
                    "~15–30 minutes time saved",
                  ]}
                />
                <div>
                  <p className="text-xs tracking-widest text-muted uppercase">
                    Interpretation
                  </p>
                  <p className="mt-3">
                    Value is real but not yet universally compelling. There is
                    real fragmentation and external spend — and time savings are
                    modest but tangible.
                  </p>
                </div>
              </ResearchPhase>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* V0 */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="V0: learning fast with a thin slice" />
          </FadeIn>
          <FadeIn className="mt-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <BodyCopy>
                <p>For V0, we prioritized speed over completeness.</p>
                <p>
                  The early workflow allowed a small tester group to upload
                  processed drone outputs into Aurora as custom surface data. It
                  was behind a feature flag, white-glove, and required
                  third-party processing software.
                </p>
                <p>
                  This was not the ideal end-state, but it helped us answer an
                  important question quickly: would customers use drone-derived
                  data inside Aurora if we gave them a path?
                </p>
              </BodyCopy>

              <div className="relative min-h-[280px] pb-16 lg:min-h-[340px] lg:pb-20">
                <figure className="relative z-10 w-[62.5%]">
                  <Image
                    src={droneProjectMedia.v0.screens[0].src}
                    alt={droneProjectMedia.v0.screens[0].alt}
                    width={droneProjectMedia.v0.screens[0].width}
                    height={droneProjectMedia.v0.screens[0].height}
                    unoptimized
                    className="h-auto w-full shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                    sizes="(max-width: 1024px) 62vw, 30vw"
                  />
                  <figcaption className="mt-3 text-sm leading-snug text-muted">
                    {droneProjectMedia.v0.screens[0].label}
                  </figcaption>
                </figure>
                <figure className="absolute top-[30%] right-0 z-20 w-1/2">
                  <Image
                    src={droneProjectMedia.v0.screens[1].src}
                    alt={droneProjectMedia.v0.screens[1].alt}
                    width={droneProjectMedia.v0.screens[1].width}
                    height={droneProjectMedia.v0.screens[1].height}
                    unoptimized
                    className="h-auto w-full shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                    sizes="(max-width: 1024px) 50vw, 24vw"
                  />
                  <figcaption className="mt-3 text-sm leading-snug text-muted">
                    {droneProjectMedia.v0.screens[1].label}
                  </figcaption>
                </figure>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <SubsectionTitle>What we learned</SubsectionTitle>
                <div className="mt-6">
                  <BulletList items={v0Learnings} />
                </div>
                <p className="mt-8 text-lg leading-relaxed text-muted">
                  The biggest insight was that a partially connected workflow was
                  not enough. To create scalable value, Aurora needed to process raw
                  drone imagery directly.
                </p>
              </div>

              <div className="relative min-h-0 lg:h-0 lg:min-h-full">
                <figure className="flex max-h-[min(70vh,32rem)] flex-col lg:absolute lg:inset-0 lg:max-h-none">
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-sm border border-border bg-surface">
                    <Image
                      src={droneProjectMedia.v0.instruction.src}
                      alt={droneProjectMedia.v0.instruction.alt}
                      width={droneProjectMedia.v0.instruction.width}
                      height={droneProjectMedia.v0.instruction.height}
                      unoptimized
                      className="block h-auto w-full"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <figcaption className="mt-3 shrink-0 text-sm leading-snug text-muted">
                    {droneProjectMedia.v0.instruction.label}
                  </figcaption>
                </figure>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* V1 beta */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="V1 beta: moving from feasibility to real usage" />
          </FadeIn>
          <FadeIn className="mt-12">
            <Image
              src={droneProjectMedia.v1.card.src}
              alt={droneProjectMedia.v1.card.alt}
              width={droneProjectMedia.v1.card.width}
              height={droneProjectMedia.v1.card.height}
              unoptimized
              className="h-auto w-full"
              sizes="100vw"
            />
          </FadeIn>
          <FadeIn className="mt-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <BodyCopy>
                <p>
                  V1 moved the workflow into the product — and for the first
                  time, image processing happened directly inside Aurora, not
                  through third-party tools.
                </p>
                <p>
                  Users could upload raw drone-captured images, and Aurora would
                  process them into a custom LiDAR model and custom map image.
                  We opened the beta as a wide release to all customers for a
                  three-month window, free of charge and instrumented to measure
                  adoption, acceptance, processing reliability, repeat usage,
                  downstream engagement, and willingness to pay.
                </p>
                <p>
                  This shift changed the product from a white-glove experiment into
                  a real customer-facing beta at scale.
                </p>
              </BodyCopy>
              <CaseStudyResearchVideo
                src={droneProjectMedia.v1.uploadDroneImages.src}
                label={droneProjectMedia.v1.uploadDroneImages.label}
                type={droneProjectMedia.v1.uploadDroneImages.type}
              />
            </div>
          </FadeIn>

          <FadeIn className="mt-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <div>
                <SubsectionTitle>Designing for expectations</SubsectionTitle>
                <SectionIntro className="mt-6">
                  A key design challenge was helping users understand what they
                  would get back.
                </SectionIntro>
                <div className="mt-6 space-y-6">
                  <BodyCopy>
                    <p>
                      Drone mapping sits between multiple mental models: imagery,
                      LiDAR, surface models, roof models, and design inputs. In
                      early usage, customers often uploaded too few images or
                      misunderstood the requirements for a successful
                      reconstruction.
                    </p>
                  </BodyCopy>
                  <BulletList items={v1Improvements} />
                  <p className="text-lg leading-relaxed text-muted">
                    The goal was not only to make the upload flow easier. It was
                    to help users form the right mental model before they
                    committed time to processing.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <CaseStudyResearchVideo
                  src={droneProjectMedia.v1.mapOutput.src}
                  label={droneProjectMedia.v1.mapOutput.label}
                  type={droneProjectMedia.v1.mapOutput.type}
                />
                <CaseStudyResearchVideo
                  src={droneProjectMedia.v1.lidarOutput.src}
                  label={droneProjectMedia.v1.lidarOutput.label}
                  type={droneProjectMedia.v1.lidarOutput.type}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Iterating */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Iterating based on real usage" />
          </FadeIn>
          <FadeIn className="mt-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <div className="space-y-12">
                <BodyCopy>
                  <p>The beta surfaced several concrete issues.</p>
                  <p>
                    Users uploaded too few images. Some files had missing geodata.
                    Processing quality varied depending on image set quality. Some
                    customers accepted the output, but many did not return to use
                    the workflow again.
                  </p>
                  <p>
                    In response, we worked with engineering and product to improve
                    both reliability and comprehension.
                  </p>
                </BodyCopy>
                <div>
                  <SubsectionTitle>Key V1 improvements</SubsectionTitle>
                  <div className="mt-6">
                    <BulletList items={v1IterationItems} />
                  </div>
                  <p className="mt-8 text-lg leading-relaxed text-muted">
                    These were small changes individually, but together they helped
                    close the loop between customer behavior, system constraints, and
                    UX clarity.
                  </p>
                </div>
              </div>

              <div>
                <MetricsCarousel slides={[...droneProjectMedia.metrics.carousel]} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What the beta taught us */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="What the beta taught us" />
          </FadeIn>
          <FadeIn className="mt-12">
            <BodyCopy>
              <p>
                V1 proved that the pipeline worked, but it also showed that the
                product was still more of a utility than a durable workflow.
              </p>
              <p>
                The strongest signal was acceptance. When processing succeeded,
                users often accepted the output. That suggested the generated
                data had real value.
              </p>
              <p>
                But repeat usage and willingness to pay were weaker. Users tried
                the feature, accepted the output, and often did not come back.
                Survey responses suggested that many customers expected more than
                a LiDAR layer and map image. For post-sale users especially, the
                expectation was closer to a fully measurable roof model that
                could be trusted for verification.
              </p>
              <p>
                The product was useful, but not yet complete enough for the
                highest-value workflows.
              </p>
            </BodyCopy>
          </FadeIn>
          <FadeIn className="mt-12">
            <SubsectionTitle>Key beta signals</SubsectionTitle>
            <div className="mt-6">
              <BulletList items={betaSignals} />
            </div>
            <figure className="mt-10">
              <div className={metricsSummaryFrameClassName}>
                <Image
                  src={droneProjectMedia.metrics.summary.src}
                  alt={droneProjectMedia.metrics.summary.alt}
                  width={droneProjectMedia.metrics.summary.width}
                  height={droneProjectMedia.metrics.summary.height}
                  unoptimized
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 56vw"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-snug text-muted">
                {droneProjectMedia.metrics.summary.label}
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* Reframing for V2 */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="V2 — confidence in further investment" />
          </FadeIn>
          <FadeIn className="mt-12">
            <SectionIntro>
              V1 validated value in pre-sale workflow, allowing us to continue
              iterating for the more common and more complex post-sale workflow.
            </SectionIntro>
          </FadeIn>

          <div className="mt-16 grid gap-16 md:grid-cols-2">
            <FadeIn>
              <SubsectionTitle>Pre-sale workflow</SubsectionTitle>
              <div className="mt-6 space-y-6">
                <BodyCopy>
                  <p>
                    Pre-sale users want speed. They may fly a site before or
                    during an appointment and need to generate something useful
                    quickly enough to support a sales conversation.
                  </p>
                </BodyCopy>
                <div>
                  <p className="text-sm tracking-widest text-muted uppercase">
                    Their biggest needs
                  </p>
                  <ul className="mt-4 space-y-2 text-lg text-foreground">
                    {preSaleNeeds.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <SubsectionTitle>Post-sale workflow</SubsectionTitle>
              <div className="mt-6 space-y-6">
                <BodyCopy>
                  <p>
                    Post-sale users want trust. They fly after a sale to verify
                    that the sold system fits the real roof, including
                    obstructions and accurate measurements.
                  </p>
                </BodyCopy>
                <div>
                  <p className="text-sm tracking-widest text-muted uppercase">
                    Their biggest needs
                  </p>
                  <ul className="mt-4 space-y-2 text-lg text-foreground">
                    {postSaleNeeds.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-12">
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              This reframing helped us avoid treating “drone mapping” as one
              generic feature. The right V2 depended on which job we were
              solving.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* V2 product direction */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="V2 product direction" />
          </FadeIn>
          <FadeIn className="mt-12">
            <SectionIntro>
              For V2, we explored features that could move Drone Mapping from a
              useful beta into a stronger workflow.
            </SectionIntro>
          </FadeIn>

          <Stagger className="mt-16 space-y-10">
            {v2Directions.map((direction) => (
              <StaggerItem key={direction.title}>
                <div className="border-t border-border pt-8">
                  <h3 className="text-xl font-light tracking-tight text-foreground md:text-2xl">
                    {direction.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">
                    {direction.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="mt-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <CaseStudyResearchVideo
                src={droneProjectMedia.v2.texturedMeshVideo.src}
                label={droneProjectMedia.v2.texturedMeshVideo.label}
                type={droneProjectMedia.v2.texturedMeshVideo.type}
              />
              <CaseStudyResearchImage
                src={droneProjectMedia.v2.mergeDesign.src}
                alt={droneProjectMedia.v2.mergeDesign.alt}
                label={droneProjectMedia.v2.mergeDesign.label}
                width={droneProjectMedia.v2.mergeDesign.width}
                height={droneProjectMedia.v2.mergeDesign.height}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Design decisions */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Design decisions" />
          </FadeIn>
          <Stagger className="mt-16 space-y-8">
            {designDecisions.map((decision, index) => (
              <StaggerItem key={decision.title}>
                <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[4rem_1fr] md:gap-8">
                  <span className="text-sm tracking-widest text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug text-foreground">
                      {decision.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-muted">
                      {decision.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Impact */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Impact" />
          </FadeIn>
          <FadeIn className="mt-12">
            <p className="text-sm tracking-widest text-muted uppercase">
              Early impact signals
            </p>
            <div className="mt-6">
              <BulletList items={impactSignals} />
            </div>
          </FadeIn>
          <FadeIn className="mt-12">
            <BodyCopy>
              <p>
                V1 helped validate that Aurora could process drone imagery into
                usable design data. More importantly, it showed where the
                product needed to go next: toward a workflow customers could
                trust repeatedly, not just a one-time processing utility.
              </p>
            </BodyCopy>
          </FadeIn>

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {droneImpactMetrics.map((metric) => (
              <StaggerItem key={metric.label}>
                <div className="flex h-full flex-col rounded-sm border border-border bg-surface/50 p-8 md:p-10">
                  <p className="text-[clamp(2rem,5vw,3.25rem)] font-light leading-none tracking-tight text-foreground">
                    {metric.value}
                  </p>
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
        </div>
      </section>

      {/* Reflection */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Reflection" />
          </FadeIn>
          <FadeIn className="mt-12">
            <BodyCopy>
              <p>
                This project was a strong example of iterative product
                development under uncertainty.
              </p>
              <p>
                We did not start with a fully defined end-state. We started with
                a market signal, moved quickly into a thin-slice release, learned
                from real usage, and used those signals to shape a more focused
                product strategy.
              </p>
              <p>
                The most important design work was not only the upload flow
                itself. It was helping the team understand what customers
                actually expected from drone data, where the workflow broke down,
                and which use cases were strong enough to justify deeper
                investment.
              </p>
              <p>
                Drone Mapping is still evolving, but the project created a clear
                foundation: prove the pipeline, learn from usage, clarify the
                customer jobs, and focus V2 on the workflows where drone data
                can create durable value.
              </p>
            </BodyCopy>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
