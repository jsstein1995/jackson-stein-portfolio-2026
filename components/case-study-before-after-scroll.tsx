"use client";

import { useRef } from "react";
import { CaseStudyResearchImage } from "@/components/case-study-labeled-media";
import { FadeIn } from "@/components/fade-in";
import { HomeScrollArrow } from "@/components/home-scroll-arrow";
import { HOME_ARROW_COLOR, HOME_ARROW_PATH } from "@/lib/home-arrow-path";
import type { RetirementCalculatorImage } from "@/lib/retirement-calculator-media";

type CaseStudyBeforeAfterScrollProps = {
  before: RetirementCalculatorImage;
  after: RetirementCalculatorImage;
};

export function CaseStudyBeforeAfterScroll({
  before,
  after,
}: CaseStudyBeforeAfterScrollProps) {
  const imagesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-12">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <FadeIn>
          <p className="mb-4 text-xs tracking-widest text-muted uppercase">
            Before
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <p className="mb-4 text-xs tracking-widest text-muted uppercase">
            After
          </p>
        </FadeIn>
      </div>

      <div ref={imagesRef} className="relative grid gap-6 lg:grid-cols-2 lg:gap-12">
        <FadeIn>
          <CaseStudyResearchImage
            src={before.src}
            alt={before.alt}
            label={before.label}
            width={before.width}
            height={before.height}
          />
        </FadeIn>
        <FadeIn delay={0.06}>
          <CaseStudyResearchImage
            src={after.src}
            alt={after.alt}
            label={after.label}
            width={after.width}
            height={after.height}
          />
        </FadeIn>

        <HomeScrollArrow
          containerRef={imagesRef}
          color={HOME_ARROW_COLOR}
          pathD={HOME_ARROW_PATH}
          scrollOffset={["start 1.1", "end 0.62"]}
          className="absolute top-1/4 left-1/2 z-10 h-[min(200px,28vh)] w-[min(108px,14vw)] -translate-x-1/2 -translate-y-1/2 -rotate-90 scale-[0.586]"
        />
      </div>
    </div>
  );
}
