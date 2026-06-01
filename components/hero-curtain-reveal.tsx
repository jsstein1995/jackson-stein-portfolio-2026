"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  HOME_CURTAIN_EASE,
  HOME_GRID_DURATION,
} from "@/lib/home-animation";

const curtainTransition = {
  duration: HOME_GRID_DURATION,
  ease: HOME_CURTAIN_EASE,
};

type HeroCurtainRevealProps = {
  children: ReactNode;
};

export function HeroCurtainReveal({ children }: HeroCurtainRevealProps) {
  const [curtainDone, setCurtainDone] = useState(false);

  return (
    <motion.div
      className={
        curtainDone
          ? "overflow-hidden"
          : "overflow-hidden will-change-[clip-path]"
      }
      initial={{ clipPath: "inset(0 50% 0 50%)" }}
      animate={{ clipPath: "inset(0 0% 0 0%)" }}
      transition={curtainTransition}
      onAnimationComplete={() => setCurtainDone(true)}
    >
      {children}
    </motion.div>
  );
}
