"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/fade-in";
import type { HomeProject } from "@/lib/home-projects";

type ProjectTileProps = {
  project: HomeProject;
  index: number;
  size?: "large" | "small";
};

export function ProjectTile({ project, index, size = "large" }: ProjectTileProps) {
  const isLarge = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link href={project.href} className="group block cursor-pointer">
        <div
          className={`relative overflow-hidden rounded-sm border border-border bg-surface ${
            isLarge ? "aspect-square" : "aspect-[4/1]"
          }`}
        >
          {project.imageSrc ? (
            isLarge ? (
              <Image
                src={project.imageSrc}
                alt={project.imageAlt ?? project.title}
                fill
                unoptimized
                className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <Image
                src={project.imageSrc}
                alt={project.imageAlt ?? project.title}
                width={1600}
                height={900}
                unoptimized
                className="pointer-events-none absolute top-1/2 left-0 h-auto w-full max-w-none -translate-y-1/2 transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )
          ) : (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/[0.03] to-transparent" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.02]" />
        </div>

        <div className={isLarge ? "mt-5" : "mt-3"}>
          <h3
            className={`font-light tracking-tight text-foreground transition-opacity group-hover:opacity-60 ${
              isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"
            }`}
          >
            {project.title}
          </h3>
          {project.year ? (
            <p
              className={`tracking-wide text-muted/45 ${
                isLarge ? "mt-2 text-xs" : "mt-1 text-[11px] md:text-xs"
              }`}
            >
              {project.year}
            </p>
          ) : null}
          {project.tags.length > 0 && (
            <p
              className={`leading-relaxed text-muted ${
                isLarge ? "mt-2 text-sm" : "mt-1 text-xs md:text-sm"
              }`}
            >
              {project.tags.join(" · ")}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-12 flex items-end justify-between border-b border-border pb-8 md:mb-16">
      <h2 className="text-sm tracking-widest text-muted uppercase">{title}</h2>
      <span className="text-sm text-muted">
        {String(count).padStart(2, "0")} Projects
      </span>
    </div>
  );
}

export function ProjectSection({
  id,
  title,
  projects,
  columns = 3,
  size = "large",
  paddingY = "py-24 md:py-32",
}: {
  id?: string;
  title: string;
  projects: HomeProject[];
  columns?: 2 | 3;
  size?: "large" | "small";
  /** Tailwind vertical padding classes (default: py-24 md:py-32). */
  paddingY?: string;
}) {
  return (
    <section
      id={id}
      className={`px-6 md:px-10 ${paddingY}${id ? " scroll-mt-24" : ""}`}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeader title={title} count={projects.length} />
        </FadeIn>
        <div
          className={
            columns === 3
              ? "grid gap-10 md:grid-cols-3 md:gap-10"
              : "grid gap-6 sm:grid-cols-2 md:gap-8"
          }
        >
          {projects.map((project, index) => (
            <ProjectTile
              key={project.title}
              project={project}
              index={index}
              size={size}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
