export type WorkProject = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  meta: string;
};

export const completedWorkProjects: WorkProject[] = [
  {
    id: "drone-mapping",
    href: "/work/drone-mapping",
    title: "Drone Mapping",
    subtitle: "Turning raw drone imagery into usable solar design data",
    meta: "V0–V2",
  },
  {
    id: "sld-editor",
    href: "/work/sld-editor",
    title: "Single-Line Diagram Editor",
    subtitle:
      "Building Aurora's next-generation electrical design platform for Europe",
    meta: "6 months",
  },
  {
    id: "atlas",
    href: "/work/atlas",
    title: "Train Fitness",
    subtitle: "AI-powered workout tracking on iPhone and Apple Watch",
    meta: "2020",
  },
  {
    id: "nerdwallet-retirement-calculator",
    href: "/work/nerdwallet-retirement-calculator",
    title: "NerdWallet Retirement Calculator",
    subtitle: "Helping people visualize their path to retirement",
    meta: "2–3 months",
  },
  {
    id: "financing-comparisons",
    href: "/work/financing-comparisons",
    title: "Financing Comparisons",
    subtitle:
      "Helping solar sales reps compare financing options with confidence",
    meta: "Aurora Solar",
  },
];

export function getOtherWorkProjects(currentId: string) {
  return completedWorkProjects.filter((project) => project.id !== currentId);
}
