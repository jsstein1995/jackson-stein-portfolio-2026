import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { getOtherWorkProjects } from "@/lib/work-projects";

type MoreWorkSectionProps = {
  currentId: string;
};

export function MoreWorkSection({ currentId }: MoreWorkSectionProps) {
  const projects = getOtherWorkProjects(currentId);

  if (projects.length === 0) return null;

  return (
    <section className="border-t border-border px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-12 text-sm tracking-widest text-muted uppercase">
            More Work
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={project.href}
                className="group cursor-pointer rounded-sm border border-border p-8 transition-colors hover:border-foreground/20"
              >
                <span className="text-sm text-muted">{project.meta}</span>
                <h3 className="mt-2 text-2xl font-light tracking-tight transition-opacity group-hover:opacity-60">
                  {project.title}
                </h3>
                <p className="mt-1 text-muted">{project.subtitle}</p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
