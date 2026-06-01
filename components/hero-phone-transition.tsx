"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import {
  PhoneMockup,
  PHONE_WIDTH,
  SCREEN,
} from "@/components/phone-mockup";
import { SplashGifImage } from "@/components/splash-gif-image";

const WATCH_WIDTH = Math.round(PHONE_WIDTH * 0.78 * 1.25 * 1.3);
const WATCH_LEFT = Math.round(PHONE_WIDTH * 0.68);
const WATCH_BOTTOM = -16;

const MORPH_END = 0.62;
const LAYOUT_START = 0.62;

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function calcFillScale() {
  if (typeof window === "undefined") return 3.5;
  const scaleX = window.innerWidth / SCREEN.width;
  const scaleY = window.innerHeight / SCREEN.height;
  return Math.max(scaleX, scaleY) * 1.04;
}

function useScrollTransforms(
  scrollYProgress: MotionValue<number>,
  fillScale: MotionValue<number>
) {
  const morphProgress = useTransform(scrollYProgress, (p) => {
    const t = Math.min(p / MORPH_END, 1);
    return easeOutQuart(t);
  });

  const layoutProgress = useTransform(scrollYProgress, (p) => {
    if (p <= LAYOUT_START) return 0;
    return easeOutQuart((p - LAYOUT_START) / (1 - LAYOUT_START));
  });

  const layoutScale = useTransform(layoutProgress, [0, 1], [1, 0.9]);

  const scale = useTransform(
    [morphProgress, layoutProgress, fillScale, layoutScale],
    ([morph, , fs, layout]) => {
      const start = fs as number;
      const morphScale = start - (start - 1) * (morph as number);
      return morphScale * (layout as number);
    }
  );

  const rotateX = useTransform(
    [morphProgress, layoutProgress],
    ([morph, layout]) => {
      const tilt = (morph as number) < 0.68 ? 0 : ((morph as number) - 0.68) / 0.32 * 10;
      return tilt * (1 - (layout as number));
    }
  );

  const rotateY = useTransform(
    [morphProgress, layoutProgress],
    ([morph, layout]) => {
      const tilt = (morph as number) < 0.68 ? 0 : ((morph as number) - 0.68) / 0.32 * -14;
      return tilt * (1 - (layout as number));
    }
  );

  const phoneX = useTransform(layoutProgress, [0, 1], ["0vw", "-22vw"]);
  const phoneY = useTransform(layoutProgress, [0, 1], [0, 0]);

  const frameOpacity = useTransform(morphProgress, [0.1, 0.22], [0, 1]);
  const shadowOpacity = useTransform(morphProgress, [0.6, 0.9], [0, 0.5]);
  const splashOverlayOpacity = useTransform(morphProgress, [0, 1], [0.3, 0]);
  const splashTitleOpacity = useTransform(morphProgress, [0.08, 0.26], [1, 0]);
  const splashTitleScale = useTransform(morphProgress, [0.08, 0.26], [1, 0.97]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const introOpacity = useTransform(layoutProgress, [0.15, 0.55], [0, 1]);
  const introX = useTransform(layoutProgress, [0.15, 0.55], [48, 0]);

  const watchOpacity = useTransform(layoutProgress, [0.45, 0.82], [0, 1]);
  const watchScale = useTransform(layoutProgress, [0.45, 0.82], [0.86, 1]);
  const watchX = useTransform(layoutProgress, [0.45, 0.82], [28, 0]);
  const watchY = useTransform(layoutProgress, [0.45, 0.82], [36, 0]);

  const transform = useMotionTemplate`translate3d(${phoneX}, ${phoneY}px, 0) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const watchTransform = useMotionTemplate`translate3d(${watchX}px, ${watchY}px, 0) scale(${watchScale})`;

  return {
    transform,
    frameOpacity,
    shadowOpacity,
    splashOverlayOpacity,
    splashTitleOpacity,
    splashTitleScale,
    hintOpacity,
    introOpacity,
    introX,
    watchOpacity,
    watchTransform,
    layoutProgress,
  };
}

export type HeroPhoneTransitionProps = {
  splashSrc: string;
  splashAlt?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  scrollHeight?: number;
  /** Content revealed on the right at end of scroll */
  introPanel?: ReactNode;
  /** Shorter panel for mobile teaser; falls back to introPanel */
  introPanelMobile?: ReactNode;
  /** Apple Watch mockup overlapping the phone at end of scroll */
  watchSrc?: string;
  watchAlt?: string;
};

export function HeroPhoneTransition({
  splashSrc,
  splashAlt = "",
  label = "Case Study",
  title = "Train Fitness",
  subtitle = "Spatial computing for everyday work",
  scrollHeight = 280,
  introPanel,
  introPanelMobile,
  watchSrc,
  watchAlt = "Apple Watch workout screen",
}: HeroPhoneTransitionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillScale = useMotionValue(calcFillScale());

  useLayoutEffect(() => {
    const update = () => fillScale.set(calcFillScale());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [fillScale]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const {
    transform,
    frameOpacity,
    shadowOpacity,
    splashOverlayOpacity,
    splashTitleOpacity,
    splashTitleScale,
    hintOpacity,
    introOpacity,
    introX,
    watchOpacity,
    watchTransform,
  } = useScrollTransforms(scrollYProgress, fillScale);

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${scrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <div className="relative mx-auto h-full max-w-7xl px-6 md:px-10">
          {/* Stage — phone centered, then slides left for intro panel */}
          <div
            className="absolute inset-0 z-0 flex items-center justify-center"
            style={{ perspective: 1400, perspectiveOrigin: "50% 50%" }}
          >
            <motion.div
              className="pointer-events-none absolute top-[calc(50%+200px)] left-1/2 -translate-x-1/2"
              style={{ opacity: shadowOpacity }}
            >
              <div className="h-6 w-48 rounded-full bg-black/20 blur-xl" />
            </motion.div>

            <motion.div
              className="relative will-change-transform [transform-style:preserve-3d]"
              style={{ transform, backfaceVisibility: "hidden" }}
            >
              <PhoneMockup
                frameOpacity={frameOpacity}
                screen={
                  <>
                    <SplashGifImage
                      src={splashSrc}
                      alt={splashAlt}
                      sizes={`${PHONE_WIDTH}px`}
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-black"
                      style={{ opacity: splashOverlayOpacity }}
                    />
                  </>
                }
              />

              {watchSrc && (
                <motion.div
                  className="pointer-events-none absolute z-10 hidden md:block"
                  style={{
                    left: WATCH_LEFT,
                    bottom: WATCH_BOTTOM,
                    width: WATCH_WIDTH,
                    opacity: watchOpacity,
                    transform: watchTransform,
                  }}
                >
                  <Image
                    src={watchSrc}
                    alt={watchAlt}
                    width={400}
                    height={488}
                    className="h-auto w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                    sizes={`${WATCH_WIDTH}px`}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right intro panel — after phone in DOM so it stacks above */}
          {introPanel && (
            <motion.div
              className="absolute top-24 right-6 z-20 hidden max-h-[calc(100vh-7rem)] w-[44%] max-w-lg overflow-y-auto overscroll-contain py-2 md:block md:top-28 md:right-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ opacity: introOpacity, x: introX }}
            >
              {introPanel}
            </motion.div>
          )}

          {(introPanelMobile ?? introPanel) && (
            <motion.div
              className="absolute inset-x-6 bottom-10 z-20 md:hidden"
              style={{ opacity: introOpacity }}
            >
              <div className="rounded-sm border border-border bg-background/95 p-5 backdrop-blur-sm">
                {introPanelMobile ?? introPanel}
              </div>
            </motion.div>
          )}
        </div>

        {/* Splash title — centered, large, difference blend */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center mix-blend-difference"
          style={{ opacity: splashTitleOpacity, scale: splashTitleScale }}
        >
          <p className="mb-8 text-2xl tracking-[0.25em] text-white uppercase md:text-[1.6875rem] md:tracking-[0.3em]">
            {label}
          </p>
          <h2 className="max-w-[12ch] text-[clamp(6.75rem,24vw,16.5rem)] font-light leading-[0.88] tracking-[-0.04em] text-white">
            {title}
          </h2>
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

export { PHONE_WIDTH, SCREEN };
