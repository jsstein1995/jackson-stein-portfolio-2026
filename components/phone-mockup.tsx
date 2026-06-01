"use client";

import type { ReactNode } from "react";
import { motion, type MotionValue } from "framer-motion";

/** iPhone 15 Pro proportions at 1× */
export const PHONE_WIDTH = 280;
export const PHONE_HEIGHT = 574;
export const BEZEL = 11;
export const SCREEN_RADIUS = 40;
export const FRAME_RADIUS = 48;

export const SCREEN = {
  width: PHONE_WIDTH - BEZEL * 2,
  height: PHONE_HEIGHT - BEZEL * 2,
};

type PhoneMockupProps = {
  /** Content clipped inside the screen (splash image, video, etc.) */
  screen: ReactNode;
  /** Reveals frame hardware as scroll progresses (0 = splash only) */
  frameOpacity?: MotionValue<number>;
  className?: string;
};

export function PhoneMockup({
  screen,
  frameOpacity,
  className = "",
}: PhoneMockupProps) {
  return (
    <div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
    >
      {/* Screen — image clipped with rounded corners */}
      <div
        className="absolute z-10 overflow-hidden bg-black"
        style={{
          left: BEZEL,
          top: BEZEL,
          width: SCREEN.width,
          height: SCREEN.height,
          borderRadius: SCREEN_RADIUS,
        }}
      >
        <div className="relative h-full w-full">{screen}</div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>

      {/* Bezel ring — box-shadow spread, transparent center */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[48px]"
        style={{
          opacity: frameOpacity ?? 1,
          boxShadow: `
            0 0 0 ${BEZEL}px #2d2640,
            inset 0 1px 0 rgba(255,255,255,0.28),
            inset 0 -1px 0 rgba(0,0,0,0.45),
            0 28px 56px -14px rgba(0,0,0,0.35)
          `,
        }}
      />

      {/* Dynamic Island */}
      <motion.div
        className="pointer-events-none absolute left-1/2 z-20 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black"
        style={{
          top: BEZEL + 10,
          opacity: frameOpacity ?? 1,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08) inset, 0 2px 6px rgba(0,0,0,0.4)",
        }}
      />

      {/* Side buttons */}
      <motion.div
        className="pointer-events-none absolute -left-[2px] top-[108px] z-20 h-[28px] w-[3px] rounded-l-sm bg-[#3a3a3e]"
        style={{ opacity: frameOpacity ?? 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -left-[2px] top-[144px] z-20 h-[50px] w-[3px] rounded-l-sm bg-[#3a3a3e]"
        style={{ opacity: frameOpacity ?? 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -left-[2px] top-[202px] z-20 h-[50px] w-[3px] rounded-l-sm bg-[#3a3a3e]"
        style={{ opacity: frameOpacity ?? 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-[2px] top-[162px] z-20 h-[68px] w-[3px] rounded-r-sm bg-[#3a3a3e]"
        style={{ opacity: frameOpacity ?? 1 }}
      />
    </div>
  );
}
