"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { HOME_EASE, HOME_NAV_DELAY } from "@/lib/home-animation";
import { scrollToCaseStudies } from "@/lib/home-scroll";

const WORK_HREF = "/#case-studies";

const links = [
  { href: WORK_HREF, label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume.pdf", label: "Resume", external: true },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: isHome ? HOME_NAV_DELAY : 0,
        ease: HOME_EASE,
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="cursor-pointer text-sm font-medium tracking-tight text-white transition-opacity hover:opacity-60"
          onClick={(event) => {
            if (pathname !== "/") return;

            event.preventDefault();
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          Jackson Stein
        </Link>

        <ul className="flex items-center gap-8">
          {links.map(({ href, label, external }) => {
            const isActive =
              !external &&
              (href === WORK_HREF
                ? pathname === "/" || pathname.startsWith("/work")
                : pathname === href);

            const className = `cursor-pointer text-sm tracking-tight text-white transition-opacity hover:opacity-60 ${
              isActive ? "opacity-100" : "opacity-70"
            }`;

            const handleWorkClick = (event: MouseEvent<HTMLAnchorElement>) => {
              if (pathname !== "/") return;

              event.preventDefault();
              scrollToCaseStudies("smooth");
              window.history.pushState(null, "", WORK_HREF);
            };

            return (
              <li key={href}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className={className}
                    onClick={href === WORK_HREF ? handleWorkClick : undefined}
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
