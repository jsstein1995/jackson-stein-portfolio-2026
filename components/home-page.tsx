"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { EmojiGlyphHero } from "@/components/emoji-glyph-hero";
import { HeroCurtainReveal } from "@/components/hero-curtain-reveal";
import { HomeIntroScrollArrow } from "@/components/home-intro-scroll-arrow";
import { HomeScrollArrow } from "@/components/home-scroll-arrow";
import { HOME_ARROW_COLOR_GREEN } from "@/lib/home-arrow-path";
import { ProjectSection } from "@/components/project-tile";
import { fullCaseStudies, selectedWork } from "@/lib/home-projects";
import {
  HOME_CONTENT_DELAY,
  HOME_EASE,
} from "@/lib/home-animation";
import {
  CASE_STUDIES_SECTION_ID,
  scrollToCaseStudies,
} from "@/lib/home-scroll";

export function HomePage() {
  const introRef = useRef<HTMLElement>(null);
  const selectedWorkLeadRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash !== `#${CASE_STUDIES_SECTION_ID}`) return;

    scrollToCaseStudies("smooth");
    const retry = window.setTimeout(() => scrollToCaseStudies("smooth"), 150);

    return () => window.clearTimeout(retry);
  }, []);

  return (
    <>
      <section className="px-6 pt-32 md:px-10 md:pt-36 [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
        <HeroCurtainReveal>
          <EmojiGlyphHero />
        </HeroCurtainReveal>
      </section>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.75,
          delay: HOME_CONTENT_DELAY,
          ease: HOME_EASE,
        }}
      >
        <section
          ref={introRef}
          className="relative min-h-[72vh] px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20 lg:min-h-[78vh]"
        >
          <HomeIntroScrollArrow containerRef={introRef} />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="mb-6 space-y-1">
              <p className="text-sm tracking-widest text-muted uppercase">
                Senior Product Designer
              </p>
              <p className="text-sm text-muted">
                Enterprise Software • AI • Platform Design
              </p>
            </div>

            <h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.04em] text-foreground">
              Making complex products feel simple.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              I specialize in enterprise workflows, platform design, and
              emerging technologies
            </p>
          </div>
        </section>

        <ProjectSection
          id={CASE_STUDIES_SECTION_ID}
          title="Full Case Studies"
          projects={fullCaseStudies}
          columns={3}
        />

        <section
          ref={selectedWorkLeadRef}
          className="relative min-h-[32vh] md:min-h-[36vh]"
        >
          <HomeScrollArrow
            containerRef={selectedWorkLeadRef}
            color={HOME_ARROW_COLOR_GREEN}
            className="absolute bottom-[-40px] left-[6%] z-10 h-[240px] w-[min(19%,130px)] origin-bottom md:bottom-[-48px] md:left-[10%] lg:left-[14%] lg:w-[140px]"
            scrollVariant="selectedWork"
          />
        </section>

        <ProjectSection
          title="Selected Work"
          projects={selectedWork}
          columns={2}
          size="small"
        />
      </motion.div>
    </>
  );
}
