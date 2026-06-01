const roleSummary = [
  "Senior Product Designer on product strategy and platform design",
  "Partnered with Product, Engineering, Design, and Electrical SMEs",
  "Led technical feasibility exploration, interaction design, and symbol framework",
  "Supported Aurora’s EU expansion with a configurable SLD editor",
];

type SldEditorProjectOverviewProps = {
  className?: string;
};

export function SldEditorProjectOverview({
  className = "",
}: SldEditorProjectOverviewProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="space-y-4">
        <h1 className="text-[clamp(2.6rem,5.2vw,4.225rem)] font-light leading-none tracking-tight text-foreground">
          Single-Line Diagram Editor
        </h1>
        <p className="text-sm leading-snug text-foreground md:text-base">
          Senior Product Designer · Product Strategy · Platform Design · EU
          Expansion
        </p>
        <p className="text-xs tracking-wide text-muted md:text-sm">
          6 months · Aurora Solar
        </p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
        <p>
          Aurora needed a more flexible way to support electrical design
          workflows as it expanded into Europe. I helped define and design a new
          Single-Line Diagram editor that could adapt to regional requirements,
          support complex solar system configurations, and strengthen Aurora’s
          foothold in a strategically important market.
        </p>
        <p>
          Building Aurora’s next-generation electrical design platform meant
          moving from a mostly fixed diagram output toward an editable canvas
          with configurable components, smarter wiring, and a symbol framework
          built for future markets.
        </p>
      </div>

      <div className="rounded-sm border border-border p-6 md:p-8">
        <h2 className="text-sm font-medium tracking-tight text-foreground">
          My Role
        </h2>
        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
          {roleSummary.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="text-muted/50">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
