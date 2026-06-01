type PlaceholderProps = {
  label: string;
  className?: string;
};

export function CaseStudyImagePlaceholder({
  label,
  className = "aspect-[16/10]",
}: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-sm border border-border bg-surface px-6 text-center ${className}`}
    >
      <span className="text-xs tracking-widest text-muted uppercase">
        Image placeholder
      </span>
      <span className="max-w-md text-sm leading-snug text-muted">{label}</span>
    </div>
  );
}

export function CaseStudyPrototypeEmbed({
  label,
  className = "aspect-[16/10]",
}: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-surface/60 px-6 text-center ${className}`}
    >
      <span className="text-xs tracking-widest text-muted uppercase">
        Prototype embed
      </span>
      <span className="max-w-md text-sm leading-snug text-muted">{label}</span>
    </div>
  );
}

export function CaseStudyVideoPlaceholder({
  label,
  className = "aspect-video",
}: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-teal-600/25 bg-gradient-to-br from-slate-50 to-teal-50/40 px-6 text-center ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-600/20 bg-white/80 text-teal-800">
        <span className="ml-0.5 text-lg" aria-hidden>
          ▶
        </span>
      </span>
      <span className="text-xs tracking-widest text-teal-700/80 uppercase">
        Video placeholder
      </span>
      <span className="max-w-md text-sm leading-snug text-muted">{label}</span>
    </div>
  );
}

export function CaseStudyMetricPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-sm border border-dashed border-border p-6 md:p-8">
      <p className="text-3xl font-light tracking-tight text-muted/50">—</p>
      <p className="mt-2 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}
