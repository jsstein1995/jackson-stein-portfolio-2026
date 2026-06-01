import Image from "next/image";
import type { ReactNode } from "react";
import { CaseStudySectionHeader } from "@/components/case-study-section-header";
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery";
import { FadeIn, Stagger, StaggerItem } from "@/components/fade-in";
import {
  brandingImages,
  iosScreens,
  watchScreens,
} from "@/lib/train-images";

const whatIDesigned = [
  {
    title: "iPhone App",
    items: [
      "Onboarding",
      "Home experience",
      "Workout history",
      "Exercise details",
      "Profiles",
      "Progress tracking",
      "Social features",
      "Friend discovery",
    ],
  },
  {
    title: "Apple Watch",
    items: [
      "Workout initiation",
      "Live workout state",
      "Pause and resume flows",
      "Rep feedback",
      "Set tracking",
      "Low-attention interactions",
    ],
  },
  {
    title: "Brand & Launch",
    items: [
      "Logo exploration",
      "Brand identity",
      "App icon",
      "App Store assets",
      "Marketing visuals",
      "Website design",
      "Packaging concepts",
    ],
  },
];

const designDecisions = [
  "Made workout data feel trustworthy through structured set, rep, and weight visualizations.",
  "Used Apple Watch for real-time workout interactions while reserving deeper analysis and history for iPhone.",
  "Prioritized large, high-contrast controls optimized for in-workout usage.",
  "Designed App Store marketing around the promise of automatic, hands-free workout tracking.",
  "Balanced fitness energy with a clean, modern consumer product aesthetic.",
];

const BETAKIT_FUNDING_URL =
  "https://betakit.com/train-fitness-closes-2-5-million-usd-to-expand-automatic-workout-tracking-app-for-strength-training/";

const launchMetrics = [
  { label: "Downloads 1 year after launch", value: "+40,000" },
  { label: "Workouts logged after 1 year", value: "+100,000" },
  { label: "Active users after 1 year", value: "+8,000" },
  { label: "App Store rating", value: "4.8" },
  {
    label: "Total funding secured",
    value: "$3.5 million",
    href: BETAKIT_FUNDING_URL,
  },
];

function SectionIntro({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`max-w-3xl text-lg leading-relaxed ${
        dark ? "text-[#c9c9c9]" : "text-muted"
      } ${className}`}
    >
      {children}
    </p>
  );
}

function BodyCopy({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
      {children}
    </div>
  );
}

export function TrainFitnessContent() {
  return (
    <>
      {/* The Challenge */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="The Challenge" />
          </FadeIn>
          <FadeIn className="mt-12">
            <BodyCopy>
              <p>
                The founding team had developed novel exercise-tracking
                technology but needed a complete product experience around it.
              </p>
              <p>
                Users needed a way to discover workouts, understand exercise
                data, trust automated tracking, review progress, and stay
                engaged over time.
              </p>
            </BodyCopy>
          </FadeIn>
          <FadeIn className="mt-12">
            <p className="text-sm tracking-widest text-muted uppercase">
              Core Design Question
            </p>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl">
              How do you make automatic workout tracking feel trustworthy,
              useful, and effortless while someone is actively exercising?
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What I Designed */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="What I Designed" />
          </FadeIn>
          <Stagger className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {whatIDesigned.map((group) => (
              <StaggerItem key={group.title}>
                <h3 className="text-sm tracking-widest text-muted uppercase">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-2 text-lg leading-snug text-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Apple Watch Live Workout */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Apple Watch Live Workout" />
            <SectionIntro className="mt-8">
              The watch experience needed to work during active exercise.
              Interactions were intentionally simple, glanceable, and readable
              while lifting, allowing users to stay focused on training rather
              than navigating interfaces.
            </SectionIntro>
          </FadeIn>
          <div className="mt-16">
            <HorizontalScrollGallery
              images={watchScreens}
              gap="md"
              imageClassName="h-auto w-auto max-h-[350px] max-w-none shrink-0"
            />
          </div>
        </div>
      </section>

      {/* Key screens (iOS) */}
      <section className="bg-[#0e0e0e] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <FadeIn>
            <CaseStudySectionHeader
              title="Key screens (iOS)"
              dark
              className="border-white/10"
            />
            <SectionIntro dark className="mt-8">
              Designed the core iOS experience around automatic workout
              detection. The app helped users review workouts, understand
              performance trends, explore exercise data, and connect with other
              athletes.
            </SectionIntro>
          </FadeIn>
          <div className="mt-16">
            <HorizontalScrollGallery images={iosScreens} dark gap="lg" />
          </div>
        </div>
      </section>

      {/* Branding and logo design */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Branding and logo design" />
            <SectionIntro className="mt-8">
              Beyond product design, I developed early brand explorations, App
              Store assets, launch visuals, and supporting marketing materials to
              help establish credibility for a new fitness product entering a
              competitive market.
            </SectionIntro>
          </FadeIn>

          <FadeIn className="mt-16">
            <div className="relative aspect-[2050/1700] w-full overflow-hidden rounded-sm">
              <Image
                src={brandingImages.appStoreListing}
                alt="Train Fitness App Store listing"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </FadeIn>

          <FadeIn className="mt-12 md:mt-20">
            <div className="relative aspect-[1386/1390] w-full overflow-hidden rounded-sm md:max-w-[calc(50%-0.5rem)]">
              <Image
                src={brandingImages.packaging}
                alt="Train Fitness protein powder packaging and shaker bottle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key Design Decisions */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Key Design Decisions" />
          </FadeIn>
          <Stagger className="mt-16 space-y-8">
            {designDecisions.map((decision, index) => (
              <StaggerItem key={decision}>
                <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[4rem_1fr] md:gap-8">
                  <span className="text-sm tracking-widest text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg leading-relaxed text-foreground">
                    {decision}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Launch Impact */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="Launch Impact" />
          </FadeIn>
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {launchMetrics.map((metric) => (
              <StaggerItem key={metric.label}>
                <div className="rounded-sm border border-border p-6 md:p-8">
                  {metric.href ? (
                    <a
                      href={metric.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xl font-light tracking-tight text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
                    >
                      {metric.value}
                    </a>
                  ) : (
                    <p className="text-3xl font-light tracking-tight text-foreground">
                      {metric.value}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-snug text-muted">
                    {metric.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-12">
            <blockquote className="max-w-3xl border-l-2 border-border pl-6 text-lg leading-relaxed text-muted italic">
              The product continues to grow years after launch, demonstrating
              the long-term value of the early product foundation. 🚀
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* What This Project Demonstrates */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <CaseStudySectionHeader title="What This Project Demonstrates" />
          </FadeIn>
          <FadeIn className="mt-12">
            <BodyCopy>
              <p>
                This project demonstrates my ability to take emerging
                technology from concept to market.
              </p>
              <p>
                Working directly with founders in a highly ambiguous environment,
                I translated novel AI capabilities into a product experience
                people could understand, trust, and use. The work spanned
                product strategy, UX, visual design, branding, launch, and
                go-to-market execution, ultimately helping establish the
                foundation for a company that continues to operate and grow
                years later.
              </p>
            </BodyCopy>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
