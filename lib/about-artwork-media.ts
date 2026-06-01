const base = "/assets/images/Selected fine art";

function assetPath(filename: string) {
  return `${base}/${encodeURIComponent(filename)}`;
}

export type AboutArtworkImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sensitive?: boolean;
};

export const aboutArtworkImages: AboutArtworkImage[] = [
  {
    id: "final",
    src: assetPath("Final.jpeg"),
    alt: "Charcoal figure study",
    width: 2747,
    height: 3339,
  },
  {
    id: "study-1",
    src: assetPath("Screenshot 2026-05-31 at 7.27.39\u202fPM.png"),
    alt: "Figure drawing study",
    width: 1012,
    height: 1714,
  },
  {
    id: "study-2",
    src: assetPath("Screenshot 2026-05-31 at 7.28.00\u202fPM.png"),
    alt: "Portrait drawing study",
    width: 1356,
    height: 1638,
  },
  {
    id: "study-3",
    src: assetPath("Screenshot 2026-05-31 at 7.28.31\u202fPM.png"),
    alt: "Figure drawing from life",
    width: 1334,
    height: 1530,
  },
  {
    id: "study-4",
    src: assetPath("Screenshot 2026-05-31 at 7.29.06\u202fPM.png"),
    alt: "Anatomy study drawing",
    width: 1252,
    height: 1780,
    sensitive: true,
  },
  {
    id: "study-5",
    src: assetPath("Screenshot 2026-05-31 at 7.29.27\u202fPM.png"),
    alt: "Life drawing study",
    width: 1290,
    height: 1810,
    sensitive: true,
  },
];
