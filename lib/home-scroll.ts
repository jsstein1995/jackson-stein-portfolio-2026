export const CASE_STUDIES_SECTION_ID = "case-studies";

const BASE_MS_PER_PIXEL = 0.65;
const DURATION_SCALE = 1.2;
const MIN_DURATION_MS = 720;
const MAX_DURATION_MS = 1500;

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

function getScrollDuration(distance: number) {
  const scaled = Math.abs(distance) * BASE_MS_PER_PIXEL * DURATION_SCALE;
  return Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, scaled));
}

function animateScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function scrollToCaseStudies(behavior: ScrollBehavior = "smooth") {
  const section = document.getElementById(CASE_STUDIES_SECTION_ID);
  if (!section) return false;

  const targetY = section.getBoundingClientRect().top + window.scrollY;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (behavior === "auto" || prefersReducedMotion) {
    section.scrollIntoView({ behavior: "auto", block: "start" });
    return true;
  }

  animateScrollTo(targetY, getScrollDuration(targetY - window.scrollY));
  return true;
}
