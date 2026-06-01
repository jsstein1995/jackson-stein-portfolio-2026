"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOME_EASE, HOME_NAV_DELAY } from "@/lib/home-animation";
import { scrollToCaseStudies } from "@/lib/home-scroll";

const WORK_HREF = "/#case-studies";

const links = [
  { href: WORK_HREF, label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume.pdf", label: "Resume", external: true },
];

function NavLinks({
  pathname,
  linkClassName,
  onNavigate,
}: {
  pathname: string;
  linkClassName: (isActive: boolean) => string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {links.map(({ href, label, external }) => {
        const isActive =
          !external &&
          (href === WORK_HREF
            ? pathname === "/" || pathname.startsWith("/work")
            : pathname === href);

        const className = linkClassName(isActive);

        const handleWorkClick = (event: MouseEvent<HTMLAnchorElement>) => {
          if (pathname !== "/") {
            onNavigate?.();
            return;
          }

          event.preventDefault();
          scrollToCaseStudies("smooth");
          window.history.pushState(null, "", WORK_HREF);
          onNavigate?.();
        };

        const handleLinkClick = () => {
          onNavigate?.();
        };

        if (external) {
          return (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                onClick={handleLinkClick}
              >
                {label}
              </a>
            </li>
          );
        }

        return (
          <li key={href}>
            <Link
              href={href}
              className={className}
              onClick={
                href === WORK_HREF
                  ? handleWorkClick
                  : handleLinkClick
              }
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-out ${
          open ? "top-1/2 translate-y-0 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-out ${
          open ? "top-1/2 translate-y-0 -rotate-45" : "bottom-0"
        }`}
      />
    </span>
  );
}

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const desktopLinkClass = (isActive: boolean) =>
    `cursor-pointer text-sm tracking-tight text-white transition-opacity hover:opacity-60 ${
      isActive ? "opacity-100" : "opacity-70"
    }`;

  const mobileLinkClass = (isActive: boolean) =>
    `cursor-pointer text-2xl font-light tracking-tight text-foreground transition-opacity hover:opacity-60 ${
      isActive ? "opacity-100" : "opacity-70"
    }`;

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 ${
        menuOpen ? "mix-blend-normal" : "mix-blend-difference"
      }`}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: isHome ? HOME_NAV_DELAY : 0,
        ease: HOME_EASE,
      }}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className={`relative z-50 cursor-pointer text-sm font-medium tracking-tight transition-opacity hover:opacity-60 ${
            menuOpen ? "text-foreground" : "text-white"
          }`}
          onClick={(event) => {
            closeMenu();
            if (pathname !== "/") return;

            event.preventDefault();
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          Jackson Stein
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <NavLinks pathname={pathname} linkClassName={desktopLinkClass} />
        </ul>

        <button
          type="button"
          className={`relative z-50 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden ${
            menuOpen ? "text-foreground" : "text-white"
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="flex h-full flex-col justify-center gap-10 px-6 pb-24">
              <NavLinks
                pathname={pathname}
                linkClassName={mobileLinkClass}
                onNavigate={closeMenu}
              />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
