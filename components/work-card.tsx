"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/case-studies";

type WorkCardProps = {
  study: CaseStudy;
  index: number;
};

export function WorkCard({ study, index }: WorkCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link href={`/work/${study.slug}`} className="group block cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/[0.04] to-transparent" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-light tracking-tighter text-muted/20 md:text-8xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.02]" />
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-foreground md:text-3xl">
              {study.title}
            </h3>
            <p className="mt-1 text-muted">{study.subtitle}</p>
          </div>
          <span className="shrink-0 pt-1 text-sm text-muted">{study.year}</span>
        </div>
      </Link>
    </motion.article>
  );
}
