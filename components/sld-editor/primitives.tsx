import type { ReactNode } from "react";

export function SldBlueprintSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative border-t border-border px-6 py-24 md:px-10 md:py-32 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] bg-size-[28px_28px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SldSectionHeader({ title }: { title: string }) {
  return (
    <div className="border-t border-border pt-8">
      <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-none tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}

export function SldBodyCopy({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
      {children}
    </div>
  );
}

export function SldCallout({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-3xl border-l-2 border-border py-1 pl-6 text-lg leading-relaxed text-foreground">
      {children}
    </blockquote>
  );
}

export function SldQuote({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl md:leading-snug">
      {children}
    </p>
  );
}

export function SldCenteredQuestion({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-foreground md:text-2xl md:leading-snug">
      {children}
    </p>
  );
}

export function SldSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm tracking-widest text-muted uppercase">{children}</h3>
  );
}

export function SldContextCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-surface/80 p-6 md:p-8">
      <h3 className="text-lg font-medium tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
    </div>
  );
}

export function SldPrincipleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] md:p-8">
      <h3 className="text-lg tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
    </div>
  );
}

export function SldBulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl list-disc space-y-3 pl-5 text-lg leading-relaxed text-muted marker:text-muted/40">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
