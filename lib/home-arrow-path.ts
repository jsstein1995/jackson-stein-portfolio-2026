/**
 * Geometry scaled to match assets/images/home-arrow-vector.png (162×262).
 * Path traced from the reference vector; arrowhead is an open V at the draw tip.
 */
export const HOME_ARROW_VIEWBOX = { width: 162, height: 262 } as const;

/** Main shaft + single loop (intro / pink arrow) */
export const HOME_ARROW_PATH =
  "M 37.8 6.3 C 70.2 2.1, 132.3 14.7, 140.4 44 C 148.5 62.9, 124.2 75.5, 105.3 71.3 C 86.4 67.1, 102.6 56.6, 121.5 60.8 C 140.4 65, 129.6 79.6, 113.4 81.7 C 97.2 83.8, 102.6 106.9, 105.3 144.6 C 108 184.4, 99.9 220.1, 102.6 249.4";

/** Mirrored + nudged for Selected Work (green arrow, left side) */
export const HOME_ARROW_PATH_FLIPPED =
  "M 122 8 C 90 3, 31 15, 23 45 C 15 63, 40 76, 58 72 C 76 68, 62 57, 42 61 C 24 64, 34 78, 50 80 C 66 82, 60 107, 57 145 C 55 185, 63 221, 55 248";

export const HOME_ARROW_COLOR = "#FF3790";

/** Vibrant green — Selected Work section arrow */
export const HOME_ARROW_COLOR_GREEN = "#12E676";

/** Open V arrowhead — two strokes from tip, matching reference */
export const HOME_ARROW_HEAD = {
  length: 12,
  spread: 7,
  strokeWidth: 2.75,
} as const;
