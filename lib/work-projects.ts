import { fullCaseStudies, selectedWork } from "@/lib/home-projects";

export type WorkProject = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  meta: string;
};

const projectDetails: Record<
  string,
  Pick<WorkProject, "subtitle" | "meta"> & { title?: string }
> = {
  "drone-mapping": {
    subtitle: "Turning raw drone imagery into usable solar design data",
    meta: "V0–V2",
  },
  "sld-editor": {
    subtitle:
      "Building Aurora's next-generation electrical design platform for Europe",
    meta: "6 months",
  },
  "train-fitness": {
    subtitle: "AI-powered workout tracking on iPhone and Apple Watch",
    meta: "2020",
  },
  "nerdwallet-retirement-calculator": {
    subtitle: "Helping people visualize their path to retirement",
    meta: "2–3 months",
  },
  "sales-mode-redesign": {
    subtitle: "Redesigning Aurora's sales workflow for solar reps",
    meta: "2023",
  },
};

function hrefToId(href: string) {
  return href.replace(/^\/work\//, "");
}

/** Work projects that appear on the homepage (full + selected case studies). */
export function getHomepageWorkProjects(): WorkProject[] {
  return [...fullCaseStudies, ...selectedWork].map((home) => {
    const id = hrefToId(home.href);
    const details = projectDetails[id];

    return {
      id,
      href: home.href,
      title: details?.title ?? home.title,
      subtitle: details?.subtitle ?? "",
      meta: details?.meta ?? home.year ?? "",
    };
  });
}

export function getOtherWorkProjects(currentId: string) {
  return getHomepageWorkProjects().filter((project) => project.id !== currentId);
}
