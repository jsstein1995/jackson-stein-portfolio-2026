import Link from "next/link";

export function PageBottomNote() {
  return (
    <div className="px-6 pb-10 pt-12 text-center md:px-10">
      <p className="text-xs text-muted/70">
        Thanks for making it to the bottom of the page
      </p>
      <p className="emoji mt-2 text-base" aria-hidden>
        ✌🏻
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted">Feel free to reach out!</p>
          <a
            href="mailto:jsstein1995@gmail.com"
            className="mt-2 block cursor-pointer text-lg tracking-tight text-foreground transition-opacity hover:opacity-60"
          >
            jsstein1995@gmail.com
          </a>
        </div>

        <div className="flex gap-8 text-sm text-muted">
          <Link href="/" className="cursor-pointer transition-opacity hover:opacity-60">
            Work
          </Link>
          <Link href="/about" className="cursor-pointer transition-opacity hover:opacity-60">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
