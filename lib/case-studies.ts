export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  tags: string[];
  excerpt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sld-editor",
    title: "Single-Line Diagram Editor",
    subtitle:
      "Building Aurora’s next-generation electrical design platform for Europe",
    year: "6 months",
    role: "Senior Product Designer",
    tags: ["Product Strategy", "Platform Design", "EU Expansion"],
    excerpt:
      "Defining and designing a configurable SLD editor to support European electrical workflows, customer retention, and scalable platform growth during Aurora’s EU expansion.",
  },
  {
    slug: "drone-mapping",
    title: "Drone Mapping",
    subtitle: "Turning raw drone imagery into usable solar design data",
    year: "V0–V2",
    role: "Senior Product Designer",
    tags: ["Strategy", "Research", "Ambiguity"],
    excerpt:
      "A new workflow for uploading raw drone imagery and generating custom map and LiDAR surface data inside Aurora — from early-access V0 through beta and V2 strategy.",
  },
  {
    slug: "nova",
    title: "Nova",
    subtitle: "Redefining the enterprise dashboard",
    year: "2025",
    role: "Lead Product Designer",
    tags: ["Product Design", "Design Systems", "Enterprise"],
    excerpt:
      "A complete rethink of how teams navigate complex data — from information architecture to motion language.",
  },
  {
    slug: "train-fitness",
    title: "Train Fitness",
    subtitle: "AI-powered workout tracking on iPhone and Apple Watch",
    year: "2020",
    role: "Senior Product Designer",
    tags: ["0→1", "Startup", "AI/Mobile"],
    excerpt:
      "Train Fitness started as an ambitious idea: use AI to automatically track strength workouts with no manual logging.",
  },
  {
    slug: "prism",
    title: "Prism",
    subtitle: "A new visual identity for a fintech platform",
    year: "2024",
    role: "Design Lead",
    tags: ["Brand", "Visual Design", "Motion"],
    excerpt:
      "Translating trust and clarity into a visual system that scales across product, marketing, and mobile.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
