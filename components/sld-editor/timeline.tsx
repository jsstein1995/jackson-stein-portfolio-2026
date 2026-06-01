import { FadeIn } from "@/components/fade-in";

const phases = [
  {
    phase: "Phase 1",
    title: "Technical feasibility and user validation",
    description:
      "Can Aurora technically support a more flexible, editable SLD architecture?",
  },
  {
    phase: "Phase 2",
    title: "Product strategy",
    description:
      "How should SLD fit into the unique requirements of the European solar market?",
  },
  {
    phase: "Phase 3",
    title: "Platform design",
    description:
      "Designing the editor, interaction model, smart wiring, component system, and symbol framework.",
  },
  {
    phase: "Phase 4",
    title: "Launch and expansion",
    description:
      "Shipping the workflow, supporting key customers, and creating the foundation for EU growth.",
  },
] as const;

export function SldEditorTimeline() {
  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0">
        {phases.map((item, index) => (
          <FadeIn key={item.phase} delay={index * 0.05} className="relative px-4">
            {index < phases.length - 1 && (
              <span
                className="absolute top-5 right-0 left-[calc(50%+1.25rem)] h-px bg-border"
                aria-hidden
              />
            )}
            <div className="flex flex-col">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-xs font-medium text-foreground">
                {index + 1}
              </span>
              <p className="mt-4 text-xs tracking-widest text-muted uppercase">
                {item.phase}
              </p>
              <h3 className="mt-2 text-lg tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Mobile: vertical */}
      <ol className="space-y-0 lg:hidden">
        {phases.map((item, index) => (
          <li key={item.phase} className="relative flex gap-5 pb-10 last:pb-0">
            {index < phases.length - 1 && (
              <span
                className="absolute top-10 left-[1.2rem] h-[calc(100%-2.5rem)] w-px bg-border"
                aria-hidden
              />
            )}
            <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-medium text-foreground">
              {index + 1}
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-xs tracking-widest text-muted uppercase">
                {item.phase}
              </p>
              <h3 className="mt-1 text-lg tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
