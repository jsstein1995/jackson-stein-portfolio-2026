/** Smooth ease-out for scroll-linked transforms */
export function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export const SCROLL_TRACK_VH = 280;
