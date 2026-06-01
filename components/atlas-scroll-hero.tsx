"use client";

import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import {
  AtlasSplashContent,
  IPhoneMockup,
  PHONE_HEIGHT,
  PHONE_WIDTH,
} from "@/components/iphone-mockup";

/** Smooth ease-out — no spring lag, feels natural on scroll */
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function calcFillScale() {
  if (typeof window === "undefined") return 3.5;
  const scaleX = window.innerWidth / PHONE_WIDTH;
  const scaleY = window.innerHeight / PHONE_HEIGHT;
  return Math.max(scaleX, scaleY) * 1.04;
}

function usePhoneTransforms(
  scrollYProgress: MotionValue<number>,
  fillScale: MotionValue<number>
) {
  const progress = useTransform(scrollYProgress, (p) => easeOutQuart(Math.min(p, 1)));

  const scale = useTransform([progress, fillScale], ([t, fs]) => {
    const start = fs as number;
    return start - (start - 1) * (t as number);
  });

  const rotateX = useTransform(progress, [0, 0.72, 1], [0, 0, 8]);
  const rotateY = useTransform(progress, [0, 0.72, 1], [0, 0, -18]);
  const rotateZ = useTransform(progress, [0, 1], [0, -0.8]);
  const y = useTransform(progress, [0, 1], [0, 0]);
  const shadowOpacity = useTransform(progress, [0.65, 0.92], [0, 0.65]);
  const shadowScale = useTransform(progress, [0.65, 1], [0.6, 1]);
  const shadowBlur = useTransform(progress, [0.65, 1], [8, 32]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -32]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const transform = useMotionTemplate`translate3d(0, ${y}px, 0) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  const shadowFilter = useMotionTemplate`blur(${shadowBlur}px)`;

  return {
    transform,
    shadowOpacity,
    shadowScale,
    shadowFilter,
    titleOpacity,
    titleY,
    hintOpacity,
  };
}

export function AtlasScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillScale = useMotionValue(calcFillScale());

  useLayoutEffect(() => {
    const update = () => fillScale.set(calcFillScale());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [fillScale]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const {
    transform,
    shadowOpacity,
    shadowScale,
    shadowFilter,
    titleOpacity,
    titleY,
    hintOpacity,
  } = usePhoneTransforms(scrollYProgress, fillScale);

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: 1600,
            perspectiveOrigin: "52% 42%",
          }}
        >
          {/* Contact + ambient shadow */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[calc(50%+190px)] -translate-x-1/2"
            style={{
              opacity: shadowOpacity,
              scale: shadowScale,
              filter: shadowFilter,
            }}
          >
            <div className="h-8 w-52 rounded-[100%] bg-black/30" />
            <div className="mx-auto mt-1 h-3 w-36 rounded-[100%] bg-black/15 blur-sm" />
          </motion.div>

          <motion.div
            className="relative will-change-transform [transform-style:preserve-3d]"
            style={{
              transform,
              backfaceVisibility: "hidden",
            }}
          >
            <IPhoneMockup>
              <AtlasSplashContent />
            </IPhoneMockup>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-16 md:px-10 md:pb-24"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm tracking-widest text-white/60 uppercase">
              Case Study
            </p>
            <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] text-white">
              Atlas
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/70">
              Spatial computing for everyday work
            </p>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
          style={{ opacity: hintOpacity }}
        >
          <div className="flex flex-col items-center gap-2 text-xs tracking-widest text-white/50 uppercase">
            <span>Scroll</span>
            <span className="animate-bounce">↓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
