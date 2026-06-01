"use client";

import { useMotionValueEvent, useScroll, type UseScrollOptions } from "framer-motion";
import {
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  HOME_ARROW_HEAD,
  HOME_ARROW_PATH,
  HOME_ARROW_PATH_FLIPPED,
  HOME_ARROW_VIEWBOX,
} from "@/lib/home-arrow-path";

type TipState = {
  x: number;
  y: number;
  angle: number;
};

function getTipAtProgress(
  path: SVGPathElement,
  totalLength: number,
  progress: number
): TipState | null {
  if (totalLength <= 0 || progress <= 0) return null;

  const at = Math.min(totalLength * progress, totalLength);
  const tip = path.getPointAtLength(at);
  const behind = path.getPointAtLength(Math.max(0, at - 4));
  const angle =
    (Math.atan2(tip.y - behind.y, tip.x - behind.x) * 180) / Math.PI;

  return { x: tip.x, y: tip.y, angle };
}

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

export type HomeScrollArrowProps = {
  containerRef: RefObject<HTMLElement | null>;
  color: string;
  className?: string;
  scrollVariant?: "intro" | "selectedWork";
  pathD?: string;
  viewBox?: { width: number; height: number };
  scrollOffset?: UseScrollOptions["offset"];
};

const SCROLL_OFFSETS: Record<
  "intro" | "selectedWork",
  NonNullable<UseScrollOptions["offset"]>
> = {
  intro: ["start 0.8", "end 0.15"],
  selectedWork: ["start 0.85", "end 0.15"],
};

export function HomeScrollArrow({
  containerRef,
  color,
  className = "",
  scrollVariant = "intro",
  pathD: pathDProp,
  viewBox: viewBoxProp,
  scrollOffset,
}: HomeScrollArrowProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [drawProgress, setDrawProgress] = useState(0);
  const [tip, setTip] = useState<TipState | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const pathD =
    pathDProp ??
    (scrollVariant === "selectedWork"
      ? HOME_ARROW_PATH_FLIPPED
      : HOME_ARROW_PATH);

  const viewBox = viewBoxProp ?? HOME_ARROW_VIEWBOX;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset ?? SCROLL_OFFSETS[scrollVariant],
  });

  useLayoutEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    setPathLength(path.getTotalLength());
  }, [pathD]);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || pathLength <= 0) return;

    const progress = prefersReducedMotion
      ? 1
      : clampProgress(scrollYProgress.get());

    setDrawProgress(progress);
    setTip(getTipAtProgress(path, pathLength, progress));
  }, [pathLength, pathD, prefersReducedMotion]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (prefersReducedMotion) return;
    setDrawProgress(clampProgress(value));
  });

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || pathLength <= 0) return;
    setTip(
      getTipAtProgress(
        path,
        pathLength,
        prefersReducedMotion ? 1 : drawProgress
      )
    );
  }, [drawProgress, pathLength, prefersReducedMotion]);

  const dashOffset = pathLength * (1 - drawProgress);
  const { length: headLen, spread: headSpread, strokeWidth } = HOME_ARROW_HEAD;

  return (
    <div
      className={`pointer-events-none hidden md:block ${className}`}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        fill="none"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength || 1}
          style={{ strokeDashoffset: dashOffset }}
        />
        {tip && drawProgress > 0 && (
          <g
            transform={`translate(${tip.x} ${tip.y}) rotate(${tip.angle})`}
          >
            <line
              x1={0}
              y1={0}
              x2={-headLen}
              y2={-headSpread / 2}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={0}
              x2={-headLen}
              y2={headSpread / 2}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
