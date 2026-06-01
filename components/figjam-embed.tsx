type FigJamEmbedProps = {
  embedSrc: string;
  boardHref: string;
  label: string;
  className?: string;
};

export function FigJamEmbed({
  embedSrc,
  boardHref,
  label,
  className = "",
}: FigJamEmbedProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-sm border border-border bg-surface">
        <div className="relative hidden aspect-video w-full md:block">
          <iframe
            src={embedSrc}
            title={label}
            className="absolute inset-0 h-full w-full"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 px-6 text-center md:hidden">
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            The FigJam board is best viewed in a new tab on smaller screens.
          </p>
          <a
            href={boardHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-sm border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/20"
          >
            Open FigJam board
          </a>
        </div>
      </div>

      <figcaption className="mt-3 text-sm leading-snug text-muted">
        {label}
      </figcaption>

      <a
        href={boardHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
      >
        Open FigJam board
      </a>
    </figure>
  );
}
