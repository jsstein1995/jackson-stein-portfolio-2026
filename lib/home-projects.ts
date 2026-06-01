import { homeImageSrc } from "./home-image-src";

export type HomeProject = {
  title: string;
  tags: string[];
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  year?: string;
};

/** Remove hrefs from this set to restore hidden projects on the homepage and route. */
export const hiddenProjectHrefs = new Set<string>([
  "/work/financing-comparisons",
]);

export function isProjectHidden(href: string) {
  return hiddenProjectHrefs.has(href);
}

function visibleProjects(projects: HomeProject[]) {
  return projects.filter((project) => !isProjectHidden(project.href));
}

export const fullCaseStudies: HomeProject[] = [
  {
    title: "Drone Mapping",
    tags: ["Strategy", "Research", "Ambiguity"],
    href: "/work/drone-mapping",
    imageSrc: homeImageSrc("/assets/images/Drone-mapping-display.png"),
    imageAlt: "Aurora Solar Drone Mapping workflow",
    year: "2025",
  },
  {
    title: "SLD Editor",
    tags: ["Systems", "Interaction Design", "Complexity"],
    href: "/work/sld-editor",
    imageSrc: homeImageSrc("/assets/images/SLD-display-img.png"),
    imageAlt: "Aurora Solar Single-Line Diagram editor",
    year: "2024",
  },
  {
    title: "Train Fitness",
    tags: ["0→1", "Startup", "AI/Mobile"],
    href: "/work/atlas",
    imageSrc: homeImageSrc("/assets/images/train-display-img.png"),
    imageAlt: "Train Fitness app on iPhone",
    year: "2020",
  },
];

const allSelectedWork: HomeProject[] = [
  {
    title: "Sales Mode Redesign",
    tags: [],
    href: "/work/sales-mode-redesign",
    imageSrc: homeImageSrc("/assets/images/salemode-display.png"),
    imageAlt: "Aurora Solar Sales Mode redesign",
    year: "2023",
  },
  {
    title: "NerdWallet Retirement Calculator",
    tags: [],
    href: "/work/nerdwallet-retirement-calculator",
    imageSrc: homeImageSrc("/assets/images/retirement-calc.png"),
    imageAlt: "NerdWallet retirement calculator",
    year: "2021",
  },
  {
    title: "Financing Comparisons",
    tags: ["Product Strategy", "Research", "Data Viz"],
    href: "/work/financing-comparisons",
    imageSrc: homeImageSrc("/assets/images/financing-aurora-display.png"),
    imageAlt: "Aurora Solar financing comparisons in Sales Mode",
  },
];

export const selectedWork = visibleProjects(allSelectedWork);
