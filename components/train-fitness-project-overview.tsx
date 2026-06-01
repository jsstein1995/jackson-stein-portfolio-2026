export const PROJECT_YEAR = "2020";

export const MOTRA_URL = "https://www.motra.com";

export const roleSummary = [
  "Founding Product Designer",
  "Designed the product from zero to launch",
  "Worked directly with founders and engineers",
  "Owned UX, UI, branding, launch assets, and early product direction",
];

type TrainFitnessProjectOverviewProps = {
  compact?: boolean;
  hero?: boolean;
  className?: string;
};

export function TrainFitnessProjectOverview({
  compact = false,
  hero = false,
  className = "",
}: TrainFitnessProjectOverviewProps) {
  const isCompact = compact || hero;

  return (
    <div
      className={`${hero ? "space-y-6" : isCompact ? "space-y-8" : "space-y-12"} ${className}`}
    >
      <div className="space-y-4">
        <h2
          className={
            hero
              ? "flex flex-wrap items-baseline gap-x-2 text-[1.95rem] font-light leading-tight tracking-tight text-foreground md:text-[2.4375rem]"
              : isCompact
                ? "flex flex-wrap items-baseline gap-x-3 text-[clamp(2.6rem,5.2vw,4.225rem)] font-light leading-none tracking-tight text-foreground"
                : "flex flex-wrap items-baseline gap-x-3 text-[clamp(2.925rem,6.5vw,5.2rem)] font-light leading-none tracking-tight text-foreground"
          }
        >
          Train Fitness
          <span
            className={`font-normal text-muted ${hero ? "text-xs md:text-sm" : isCompact ? "text-sm md:text-base" : "text-base md:text-lg"}`}
          >
            (Now{" "}
            <a
              href={MOTRA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
            >
              Motra.ai
            </a>
            )
          </span>
        </h2>
        <p
          className={`text-foreground ${hero ? "text-xs leading-snug md:text-sm" : isCompact ? "text-sm leading-snug md:text-base" : "text-lg"}`}
        >
          Founding Designer · iOS · Apple Watch · Brand · Launch
        </p>
        <p
          className={`tracking-wide text-muted ${hero ? "text-[11px] md:text-xs" : "text-xs md:text-sm"}`}
        >
          {PROJECT_YEAR} · 6 Month Engagement · Early Stage Startup
        </p>
      </div>

      <div
        className={`space-y-4 leading-relaxed text-muted ${hero ? "text-xs md:text-sm" : isCompact ? "text-sm md:text-[0.9375rem]" : "text-lg"}`}
      >
        <p>
          Train Fitness started as an ambitious idea: use AI to automatically
          track workouts without manual logging.
        </p>
        <p className={hero ? "line-clamp-4" : undefined}>
          As Founding Designer, I worked alongside the founders to transform the
          underlying technology into a complete consumer product, designing the
          iPhone app, Apple Watch experience, onboarding, branding, and launch
          assets from the ground up.
        </p>
        {!hero && (
          <p>
            Since launching on the App Store, the company secured Series A
            funding and has continued growing into a fully staffed
            venture-backed fitness business.
          </p>
        )}
      </div>

      {!hero && (
        <div
          className={`rounded-sm border border-border ${isCompact ? "p-6 md:p-8" : "p-8 md:p-10"}`}
        >
          <h3 className="text-sm font-medium tracking-tight text-foreground">
            My Role
          </h3>
          <ul
            className={`mt-5 space-y-2 leading-relaxed text-muted ${isCompact ? "text-sm" : "text-lg"}`}
          >
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
      )}
    </div>
  );
}
