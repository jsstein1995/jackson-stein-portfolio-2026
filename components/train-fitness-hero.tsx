"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { PhoneMockup, PHONE_WIDTH } from "@/components/phone-mockup";
import { SplashGifImage } from "@/components/splash-gif-image";

const WATCH_WIDTH = Math.round(PHONE_WIDTH * 0.78 * 1.25 * 1.3);
const WATCH_LEFT = Math.round(PHONE_WIDTH * 0.68);
const WATCH_BOTTOM = -16;

type TrainFitnessHeroProps = {
  splashSrc: string;
  splashAlt?: string;
  introPanel?: ReactNode;
  watchSrc?: string;
  watchAlt?: string;
};

/** Static hero — phone, watch, and intro in the end-of-scroll layout (no scroll track). */
export function TrainFitnessHero({
  splashSrc,
  splashAlt = "Train Fitness app preview",
  introPanel,
  watchSrc,
  watchAlt = "Apple Watch workout screen",
}: TrainFitnessHeroProps) {
  return (
    <section className="overflow-x-clip border-b border-border bg-background pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="relative flex flex-col gap-12 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-start md:gap-12 lg:gap-16">
          <div
            className="relative mx-auto flex min-h-[480px] w-full max-w-[min(100%,500px)] items-center justify-center md:mx-0 md:min-h-0 md:max-w-none md:justify-start"
            style={{ perspective: 1400 }}
          >
            <div
              className="relative shrink-0 origin-center scale-[1.125] [transform-style:preserve-3d] md:origin-top-left"
            >
              <div className="pointer-events-none absolute top-[calc(50%+200px)] left-1/2 -translate-x-1/2 opacity-50">
                <div className="h-6 w-48 rounded-full bg-black/20 blur-xl" />
              </div>

              <PhoneMockup
                screen={
                  <SplashGifImage
                    src={splashSrc}
                    alt={splashAlt}
                    sizes={`${PHONE_WIDTH}px`}
                  />
                }
              />

              {watchSrc && (
                <div
                  className="pointer-events-none absolute z-10 hidden md:block"
                  style={{
                    left: WATCH_LEFT,
                    bottom: WATCH_BOTTOM,
                    width: WATCH_WIDTH,
                  }}
                >
                  <Image
                    src={watchSrc}
                    alt={watchAlt}
                    width={400}
                    height={488}
                    className="h-auto w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                    sizes={`${WATCH_WIDTH}px`}
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {introPanel && (
            <div className="hidden md:block md:pt-4">{introPanel}</div>
          )}
        </div>
      </div>
    </section>
  );
}
