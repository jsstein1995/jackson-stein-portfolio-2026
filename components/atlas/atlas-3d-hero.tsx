"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { iphoneScreenshots } from "@/lib/iphone-screenshots";
import { SCROLL_TRACK_VH } from "@/lib/atlas-scroll";

const IPhoneCanvas = dynamic(
  () =>
    import("./iphone-canvas").then((mod) => mod.IPhoneCanvas),
  { ssr: false, loading: () => <HeroFallback /> }
);

function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0a1628]" />
  );
}

export function Atlas3DHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const screenshots = iphoneScreenshots.map((s) => s.src);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgressRef.current = v;
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -32]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const labelColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(255,255,255,0.6)", "rgb(115,115,115)"]
  );
  const headingColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgb(255,255,255)", "rgb(10,10,10)"]
  );
  const subtitleColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(255,255,255,0.7)", "rgb(115,115,115)"]
  );

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${SCROLL_TRACK_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={canvasContainerRef} className="absolute inset-0">
          <IPhoneCanvas
            screenshots={screenshots}
            containerRef={canvasContainerRef}
            scrollProgressRef={scrollProgressRef}
          />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-16 md:px-10 md:pb-24"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="mx-auto max-w-7xl">
            <motion.p
              className="mb-4 text-sm tracking-widest uppercase"
              style={{ color: labelColor }}
            >
              Case Study
            </motion.p>
            <motion.h1
              className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.04em]"
              style={{ color: headingColor }}
            >
              Atlas
            </motion.h1>
            <motion.p
              className="mt-4 max-w-lg text-lg"
              style={{ color: subtitleColor }}
            >
              Spatial computing for everyday work
            </motion.p>
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
